import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { PROFILE } from "../../data/portfolio";
import { Reveal } from "./primitives";
import { Mail, Linkedin, Download, ArrowUpRight, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, subject: form.subject.trim() || "New message from portfolio" };
      await axios.post(`${API}/contact`, payload);
      toast.success("Message sent — I'll get back to you soon!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 md:py-36 blue-paper">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="font-body text-sm uppercase tracking-[0.3em] text-brand-ink/60">Contact — 06</p>
          <div className="relative mt-2">
            <h2 className="font-display uppercase leading-[0.82] tracking-tighter text-brand-red text-6xl sm:text-7xl md:text-[9rem]">
              TOGETHER
            </h2>
            <span className="pointer-events-none absolute -top-6 left-1 md:-top-4 md:left-2 font-accent text-4xl md:text-6xl text-brand-ink -rotate-6">
              Let&apos;s work
            </span>
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: details */}
          <div>
            <Reveal>
              <a
                data-testid="contact-email"
                href={`mailto:${PROFILE.email}`}
                className="group flex items-center justify-between gap-4 border-b-2 border-brand-ink py-5"
              >
                <span className="flex items-center gap-4">
                  <Mail className="text-brand-red" size={22} />
                  <span className="font-body text-lg md:text-xl text-brand-ink break-all">{PROFILE.email}</span>
                </span>
                <ArrowUpRight className="shrink-0 text-brand-ink group-hover:text-brand-red transition-colors" />
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                data-testid="contact-linkedin"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-b-2 border-brand-ink py-5"
              >
                <span className="flex items-center gap-4">
                  <Linkedin className="text-brand-red" size={22} />
                  <span className="font-body text-lg md:text-xl text-brand-ink">{PROFILE.linkedinLabel}</span>
                </span>
                <ArrowUpRight className="shrink-0 text-brand-ink group-hover:text-brand-red transition-colors" />
              </a>
            </Reveal>

            <Reveal delay={0.2}>
              <a
                data-testid="contact-resume"
                href={PROFILE.resume}
                download
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-brand-ink px-7 py-4 font-bold uppercase tracking-widest text-sm text-brand-cream hover:bg-brand-red transition-colors"
              >
                <Download size={18} /> Download Resume
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.15}>
            <form data-testid="contact-form" onSubmit={submit} className="bg-brand-paper border-2 border-brand-ink rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" testid="contact-input-name" value={form.name} onChange={update("name")} />
                <Field label="Email" type="email" testid="contact-input-email" value={form.email} onChange={update("email")} />
              </div>
              <div className="mt-5">
                <Field label="Subject" testid="contact-input-subject" value={form.subject} onChange={update("subject")} />
              </div>
              <div className="mt-5">
                <label className="block font-body text-xs uppercase tracking-widest text-brand-ink/50 mb-2">Message</label>
                <textarea
                  data-testid="contact-input-message"
                  value={form.message}
                  onChange={update("message")}
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-brand-ink/30 focus:border-brand-red outline-none py-2 font-body text-brand-ink resize-none transition-colors"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                data-testid="contact-submit"
                type="submit"
                disabled={loading}
                className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-brand-ink px-7 py-3.5 font-bold uppercase tracking-widest text-sm text-brand-ink hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"} <Send size={16} />
              </button>
            </form>
          </Reveal>
        </div>

        <footer className="mt-24 border-t border-brand-ink/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display uppercase text-brand-ink">SRIBAN<span className="text-brand-red">.</span></span>
          <span className="font-body text-xs uppercase tracking-widest text-brand-ink/50">
            © {new Date().getFullYear()} — Graphic Design / UI/UX / Video Editing
          </span>
        </footer>
      </div>
    </section>
  );
};

const Field = ({ label, testid, type = "text", value, onChange }) => (
  <div>
    <label className="block font-body text-xs uppercase tracking-widest text-brand-ink/50 mb-2">{label}</label>
    <input
      data-testid={testid}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-b-2 border-brand-ink/30 focus:border-brand-red outline-none py-2 font-body text-brand-ink transition-colors"
    />
  </div>
);
