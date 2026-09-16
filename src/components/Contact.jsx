"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function Contact() {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    project: "",
    message: "",
  });

  const [btnText, setBtnText] = useState("TRANSMIT SIGNAL");
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setBtnText("TRANSMITTING...");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setBtnText("SIGNAL RECEIVED");
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          budget: "",
          project: "",
          message: "",
        });

        setTimeout(() => {
          setBtnText("TRANSMIT SIGNAL");
        }, 3000);

        setTimeout(() => {
          setSubmitted(false);
        }, 6000);
      } else {
        throw new Error(data.error || "Failed to forward signal");
      }
    } catch (err) {
      console.error(err);
      setBtnText("TRANSMISSION ERROR");
      setErrorMsg(err.message || "Failed to transmit. Please email directly.");
      setTimeout(() => {
        setBtnText("TRANSMIT SIGNAL");
      }, 3500);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact">
      <span className="section-num">06 / 06</span>
      <div className="section-label">[ SYSTEM // ESTABLISH_LINK ]</div>

      <h2 className="section-title">
        <span className="word-mask">
          <span className="word-inner gradient-text">Establish Contact</span>
        </span>
      </h2>

      <div className="contact-grid">
        {/* Left Column: Equal Width & Height Card */}
        <div className="contact-info glass-card">
          <div className="contact-info-header">
            <h3>
              Let&apos;s build<br />something<br />
              <span className="accent" style={{ color: "var(--neon-blue)" }}>
                unforgettable.
              </span>
            </h3>
            <p className="contact-lead-text">
              Have a project in mind, need a high-performance Next.js application, or looking to architect scalable MERN backends? Transmit your signal or reach out directly.
            </p>
          </div>

          <div className="contact-details-list">
            <div className="contact-detail">
              <div className="icon"><i className="fas fa-envelope" /></div>
              <div>
                <div className="label">EMAIL</div>
                <div className="value">
                  <a href={`mailto:${personal.email}`} className="contact-link">
                    {personal.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-detail">
              <div className="icon"><i className="fas fa-phone" /></div>
              <div>
                <div className="label">PHONE / WHATSAPP</div>
                <div className="value">
                  <a href={`tel:${personal.phone}`} className="contact-link">
                    {personal.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-detail">
              <div className="icon"><i className="fas fa-location-dot" /></div>
              <div>
                <div className="label">LOCATION</div>
                <div className="value">{personal.location} · {personal.timezone}</div>
              </div>
            </div>

            <div className="contact-detail">
              <div className="icon"><i className="fas fa-clock" /></div>
              <div>
                <div className="label">AVAILABILITY</div>
                <div className="value">{personal.availability}</div>
              </div>
            </div>
          </div>

          <div className="contact-info-footer">
            <div className="availability-badge">
              <span className="live-dot" />
              <span>DIRECT LINE ACTIVE // FAST RESPONSE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Equal Width & Height Form Card */}
        <form className="contact-form glass-card" id="contactForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>YOUR NAME</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Connor"
              required
            />
          </div>

          <div className="form-group">
            <label>YOUR EMAIL</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. sarah@cyberdyne.io"
              required
            />
          </div>

          <div className="form-group">
            <label>EXPECTED BUDGET</label>
            <select
              name="budget"
              className="form-input form-select"
              value={formData.budget}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select budget tier...
              </option>
              <option value="< $1,000 (MVP / Rapid Build)">
                &lt; $1,000 (MVP / Rapid Build)
              </option>
              <option value="$1,000 — $3,000 (Standard Full-Stack Web App)">
                $1,000 — $3,000 (Standard Full-Stack Web App)
              </option>
              <option value="$3,000 — $5,000 (Complex SaaS / Real-time System)">
                $3,000 — $5,000 (Complex SaaS / Real-time System)
              </option>
              <option value="$5,000+ (Scale / Custom Architecture)">
                $5,000+ (Scale / Custom Architecture)
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>PROJECT ARCHITECTURE / SCOPE</label>
            <input
              type="text"
              name="project"
              className="form-input"
              value={formData.project}
              onChange={handleChange}
              placeholder="e.g. Next.js SaaS Platform, Full-Stack MERN System"
              required
            />
          </div>

          <div className="form-group">
            <label>YOUR MESSAGE</label>
            <textarea
              name="message"
              className="form-input"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about the vision, timeline, deliverables, or challenges..."
              required
            />
          </div>

          {errorMsg && (
            <div style={{ color: "#ff4466", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
              <i className="fas fa-exclamation-circle" /> {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="submit-btn hoverable"
            data-hover
            disabled={isSending}
            style={isSending ? { background: "var(--neon-blue)", color: "#000" } : {}}
          >
            <span>{btnText}</span>
            <i className={isSending ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"} />
          </button>
        </form>
      </div>

      {/* Toast alert */}
      {submitted && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            padding: "16px 26px",
            background: "rgba(10, 10, 26, 0.95)",
            border: "1px solid var(--neon-blue)",
            color: "#ffffff",
            borderRadius: "12px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            zIndex: 99999,
            boxShadow: "0 0 30px rgba(0, 240, 255, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <i className="fas fa-check-circle" style={{ color: "var(--neon-blue)", fontSize: "18px" }} />
          <span>Transmission received! Message forwarded to M Sameer ({personal.email}).</span>
        </div>
      )}
    </section>
  );
}
