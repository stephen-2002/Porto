"""Backend tests for SRIBAN portfolio API - Contact endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fallback: read from frontend/.env
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except Exception:
        pass

API = f"{BASE_URL}/api"


@pytest.fixture
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestContactAPI:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        assert "message" in r.json()

    def test_create_contact_success(self, session):
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "subject": "TEST_Subject",
            "message": "TEST_message_content_unique_1234",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "success"
        assert "id" in data and isinstance(data["id"], str)
        assert "emailed" in data
        # verify persistence via GET
        r2 = session.get(f"{API}/contact")
        assert r2.status_code == 200
        docs = r2.json()
        assert any(d["id"] == data["id"] for d in docs)
        assert all("_id" not in d for d in docs)

    def test_create_contact_invalid_email(self, session):
        payload = {
            "name": "TEST_User",
            "email": "not-an-email",
            "subject": "Sub",
            "message": "msg",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_email(self, session):
        payload = {"name": "TEST_User", "subject": "Sub", "message": "msg"}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_name(self, session):
        payload = {"email": "a@b.com", "message": "msg"}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_empty_message(self, session):
        payload = {"name": "TEST_User", "email": "a@b.com", "message": ""}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_list_contacts_sorted_newest_first(self, session):
        # create two entries
        ids = []
        for i in range(2):
            r = session.post(f"{API}/contact", json={
                "name": f"TEST_Sort_{i}",
                "email": f"sort{i}@example.com",
                "subject": f"S{i}",
                "message": f"msg{i}",
            })
            assert r.status_code == 200
            ids.append(r.json()["id"])
        r = session.get(f"{API}/contact")
        assert r.status_code == 200
        docs = r.json()
        # find positions of our ids
        created_ats = [d["created_at"] for d in docs]
        # ensure sorted descending
        assert created_ats == sorted(created_ats, reverse=True)
        # no _id field
        assert all("_id" not in d for d in docs)
