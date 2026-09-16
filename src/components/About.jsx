"use client";

import { useEffect, useState, useRef } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function About() {
  const { about } = portfolioData;
  const [counts, setCounts] = useState(about.stats.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          about.stats.forEach((stat, idx) => {
            const target = stat.value;
            const duration = 1800;
            const start = performance.now();
            const step = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCounts((prev) => {
                const next = [...prev];
                next[idx] = Math.floor(eased * target);
                return next;
              });
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
        }
      },
      { threshold: 0.15 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [about.stats]);

  return (
    <section id="about" ref={sectionRef}>
      <span className="section-num">01 / 06</span>
      <div className="section-label">[ SYSTEM // ABOUT ]</div>

      <h2 className="section-title">
        <span className="word-mask">
          <span className="word-inner gradient-text">Architecting with Precision</span>
        </span>
      </h2>

      <div className="about-grid">
        <div className="about-text">
          I&apos;m <span className="highlight">M Sameer</span> — a full-stack engineer obsessed with the intersection of <span className="highlight-2">performance, scale, and modern architecture</span>. For 2+ years, I&apos;ve dedicated myself to shipping robust web applications with production-grade reliability.
          <br /><br />
          My work bridges reactive Next.js frontends with scalable Node.js microservices and resilient MongoDB data pipelines.
        </div>
        <div className="stats-grid">
          {about.stats.map((stat, i) => (
            <div key={i} className="stat-card glass-card">
              <div className="stat-value">
                {counts[i]}<span className="plus">{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
