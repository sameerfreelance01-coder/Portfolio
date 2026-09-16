"use client";

import { portfolioData } from "@/data/portfolioData";

export default function Timeline() {
  const { journey } = portfolioData;

  return (
    <section id="journey">
      <span className="section-num">05 / 06</span>
      <div className="section-label">[ SYSTEM // TIMELINE ]</div>
      
      <h2 className="section-title">
        <span className="word-mask">
          <span className="word-inner gradient-text">The Journey</span>
        </span>
      </h2>

      <div className="timeline">
        {journey.map((item, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content glass-card hoverable" data-hover>
              <div className="timeline-badge">{item.period}</div>
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-company">{item.company}</div>
              <p className="timeline-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
