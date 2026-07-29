from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Emergent managed Resend proxy)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "SRIBAN Portfolio")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "ste282002@gmail.com")

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Models ----------
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default="New message from portfolio", max_length=160)
    message: str = Field(..., min_length=1, max_length=4000)


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def build_email_html(m: ContactMessage) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F1EA;padding:24px;font-family:Arial,sans-serif;">
      <tr><td>
        <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#FFFDFC;border:2px solid #1A1A1A;">
          <tr><td style="background:#E53935;padding:18px 24px;">
            <span style="color:#FFFFFF;font-size:20px;font-weight:bold;letter-spacing:1px;">NEW PORTFOLIO MESSAGE</span>
          </td></tr>
          <tr><td style="padding:24px;color:#1A1A1A;">
            <p style="margin:0 0 6px;"><strong>Name:</strong> {m.name}</p>
            <p style="margin:0 0 6px;"><strong>Email:</strong> {m.email}</p>
            <p style="margin:0 0 6px;"><strong>Subject:</strong> {m.subject}</p>
            <hr style="border:none;border-top:1px solid #EAE4D3;margin:16px 0;" />
            <p style="margin:0;white-space:pre-wrap;line-height:1.6;">{m.message}</p>
          </td></tr>
          <tr><td style="background:#A9C1D9;padding:12px 24px;color:#1A1A1A;font-size:12px;">
            Sent {m.created_at}
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_owner_email(m: ContactMessage) -> bool:
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing; skipping email send")
        return False
    payload = {
        "to": [OWNER_EMAIL],
        "subject": f"Portfolio: {m.subject} — {m.name}",
        "html": build_email_html(m),
        "from_name": EMAIL_FROM_NAME,
        "contact_email": m.email,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Email send error: {e}")
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "SRIBAN portfolio API"}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())
    emailed = await send_owner_email(msg)
    return {"status": "success", "emailed": emailed, "id": msg.id}


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
