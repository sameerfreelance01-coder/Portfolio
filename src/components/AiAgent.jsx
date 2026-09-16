"use client";

import { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function AiAgent() {
  const { personal, projects, skills } = portfolioData;

  const [messages, setMessages] = useState([
    {
      sender: "agent",
      text: "Connection established. I am SYS.AURA, M Sameer's autonomous AI representative. Ask me anything about his availability, location, tech stack, experience, or latest projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages or thinking state updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const quickPrompts = [
    "Are you available for hire?",
    "Where are you located?",
    "Tell me about your projects",
    "What is your tech stack?",
    "How can I contact Sameer?",
  ];

  const generateResponse = (query) => {
    const q = query.toLowerCase().trim();

    // 1. Availability / Hiring / Work
    if (
      q.includes("avail") ||
      q.includes("hire") ||
      q.includes("freelance") ||
      q.includes("contract") ||
      q.includes("open to work") ||
      q.includes("start") ||
      q.includes("job") ||
      q.includes("collaborat") ||
      q.includes("schedule") ||
      q.includes("status") ||
      q.includes("busy")
    ) {
      return `M Sameer is currently **${personal.availability.toUpperCase()}**! He is actively taking on freelance projects, contract engagements, and full-stack development roles. He collaborates seamlessly across US, UK, and European timezones. You can transmit a message via the form below, email sameer.freelance01@gmail.com, or WhatsApp +92 3071853989.`;
    }

    // 2. Location / Timezone / Remote
    if (
      q.includes("location") ||
      q.includes("where") ||
      q.includes("lahore") ||
      q.includes("pakistan") ||
      q.includes("timezone") ||
      q.includes("gmt") ||
      q.includes("pkt") ||
      q.includes("city") ||
      q.includes("country") ||
      q.includes("based") ||
      q.includes("live") ||
      q.includes("place")
    ) {
      return `M Sameer is based in **${personal.location}** (${personal.timezone}). He works 100% remotely with fast, asynchronous and real-time communication, overlapping comfortably with clients across North America, Europe, the Middle East, and Asia.`;
    }

    // 3. Contact Details / Phone / Email
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("phone") ||
      q.includes("whatsapp") ||
      q.includes("call") ||
      q.includes("reach") ||
      q.includes("touch") ||
      q.includes("number")
    ) {
      return `You can reach M Sameer directly through:\n• Email: ${personal.email}\n• Phone / WhatsApp: ${personal.phone}\n• Contact Form: Scroll to the Establish Contact section below to transmit your project details!`;
    }

    // 4. Experience / Years / Background / Ideoversity
    if (
      q.includes("experience") ||
      q.includes("years") ||
      q.includes("background") ||
      q.includes("journey") ||
      q.includes("history") ||
      q.includes("timeline") ||
      q.includes("ideoversity") ||
      q.includes("education")
    ) {
      return `M Sameer has 2+ years of professional engineering experience with 8+ built projects and 12+ core technologies. His background includes frontend engineering at Ideoversity (2024–2025), full-stack REST API and database system development (2024–2025), and independent architecture for modern Next.js and MERN SaaS platforms (2025–Present).`;
    }

    // 5. Specific Projects or General Work
    if (
      q.includes("project") ||
      q.includes("work") ||
      q.includes("portfolio") ||
      q.includes("riwayat") ||
      q.includes("coherence") ||
      q.includes("samstays") ||
      q.includes("lumistream") ||
      q.includes("ecommerce") ||
      q.includes("streaming") ||
      q.includes("rental")
    ) {
      return `Sameer has engineered 4 featured deployments:\n1. **Riwayat Commerce** (2026): Luxury headless e-commerce built with Next.js App Router, Stripe checkout, and real-time order processing.\n2. **Coherence AI** (2026): Real-time AI writing assistant with live transcription and content synthesis.\n3. **SamStays** (2026): Short-term rental marketplace with Firebase auth, Next.js, and Stripe payments.\n4. **LumiStream** (2026): High-performance video streaming platform utilizing HLS and adaptive bitrate streaming.`;
    }

    // 6. Tech Stack / Skills / MERN / Next.js / Databases
    if (
      q.includes("stack") ||
      q.includes("tech") ||
      q.includes("mern") ||
      q.includes("next") ||
      q.includes("react") ||
      q.includes("node") ||
      q.includes("express") ||
      q.includes("mongo") ||
      q.includes("postgres") ||
      q.includes("supabase") ||
      q.includes("firebase") ||
      q.includes("tailwind") ||
      q.includes("database") ||
      q.includes("skill")
    ) {
      return `Sameer's technical arsenal includes:\n• Frontend: Next.js (App Router, Server Actions, SSR/SSG), React.js, Tailwind CSS, Three.js, GSAP.\n• Backend: Node.js, Express.js, RESTful APIs, WebSockets, JWT Authentication.\n• Databases: MongoDB (Mongoose), PostgreSQL, Supabase, Firebase.\n• Focus: Sub-second page loads, Lighthouse 95+, resilient data architecture.`;
    }

    // 7. Pricing / Rates / Budget
    if (
      q.includes("price") ||
      q.includes("cost") ||
      q.includes("rate") ||
      q.includes("budget") ||
      q.includes("quote") ||
      q.includes("fee") ||
      q.includes("charge")
    ) {
      return `Project pricing depends on complexity, scope, and deliverables. Typical budgets range from rapid MVP builds (< $1,000) to standard web apps ($1,000–$3,000) and custom SaaS architectures ($3,000–$5,000+). Select your budget tier in the contact form below or reach out directly for an accurate estimate!`;
    }

    // 8. Identity / Who are you / About
    if (
      q.includes("who are you") ||
      q.includes("who is sameer") ||
      q.includes("about") ||
      q.includes("name") ||
      q.includes("intro")
    ) {
      return `I am SYS.AURA, the autonomous agent for M Sameer. Sameer is a Full-Stack MERN & Next.js Architect based in Lahore, Pakistan, specialized in engineering high-speed, modern, and scalable web solutions.`;
    }

    // Default Fallback
    return `I can provide full details on M Sameer's:\n• Current Availability & Hiring Status\n• Location (Lahore, Pakistan) & Remote Timezones\n• Featured Projects (Riwayat Commerce, Coherence AI, SamStays, LumiStream)\n• MERN & Next.js Stack\n• Direct Contact & Phone/WhatsApp info\n\nWhat would you like to explore?`;
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    if (!textToSend) setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const reply = generateResponse(query);
      setMessages((prev) => [...prev, { sender: "agent", text: reply }]);
      setIsThinking(false);
    }, 650);
  };

  return (
    <section id="ai-agent">
      <span className="section-num">04 / 06</span>
      <div className="section-label">[ SYSTEM // AI_INTERFACE ]</div>
      
      <h2 className="section-title">
        <span className="word-mask">
          <span className="word-inner gradient-text">Don&apos;t Read. Ask.</span>
        </span>
      </h2>

      <p style={{ color: "var(--text-dim)", textAlign: "center", marginTop: "-2rem", marginBottom: "2rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px" }}>
        Interact directly with my autonomous AI representative.
      </p>

      <div className="agent-container glass-card">
        <div className="agent-header">
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--neon-blue)", boxShadow: "0 0 10px var(--neon-blue)" }} />
          <span>AGENT ONLINE // SYS.AURA</span>
        </div>

        {/* Chat window with automatic smooth scroll to bottom */}
        <div className="agent-chat" ref={chatContainerRef} style={{ scrollBehavior: "smooth" }}>
          {messages.map((m, idx) => (
            <div key={idx} className={m.sender === "user" ? "user-message" : "agent-message"} style={{ whiteSpace: "pre-line" }}>
              {m.text}
            </div>
          ))}
          {isThinking && (
            <div className="agent-message" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--neon-blue)" }}>
              <i className="fas fa-spinner fa-spin" /> Querying MERN architecture database...
            </div>
          )}
          <div ref={chatEndRef} style={{ height: "1px" }} />
        </div>

        {/* Quick prompt chips */}
        <div style={{ padding: "12px 20px", display: "flex", gap: "8px", overflowX: "auto", background: "rgba(0,0,0,0.35)", borderTop: "1px solid var(--glass-border)" }}>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(p)}
              style={{
                padding: "6px 14px",
                background: "rgba(0, 240, 255, 0.06)",
                border: "1px solid rgba(0, 240, 255, 0.2)",
                borderRadius: "20px",
                color: "var(--neon-blue)",
                fontSize: "11px",
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "none",
                whiteSpace: "nowrap",
                transition: "all 0.25s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 240, 255, 0.18)";
                e.currentTarget.style.borderColor = "var(--neon-blue)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 240, 255, 0.06)";
                e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.2)";
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <form
          className="agent-input-area"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className="agent-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about availability, location, tech stack, or projects..."
          />
          <button type="submit" className="agent-send hoverable" data-hover>SEND</button>
        </form>
      </div>
    </section>
  );
}
