"use client";

import { portfolioData } from "@/data/portfolioData";

export default function Skills() {
  const { skills } = portfolioData;

  const icons = [
    "fa-code",
    "fa-server",
    "fa-database",
    "fa-layer-group",
    "fa-cloud",
    "fa-bolt",
  ];

  return (
    <section id="skills">
      <span className="section-num">02 / 06</span>
      <div className="section-label">[ SYSTEM // CAPABILITIES ]</div>
      
      <h2 className="section-title">
        <span className="word-mask">
          <span className="word-inner gradient-text">Core Technical Arsenal</span>
        </span>
      </h2>

      <div className="skills-grid">
        {skills.map((skill, idx) => (
          <div key={idx} className="skill-card glass-card" data-hover>
            <div className="skill-icon">
              <i className={`fas ${icons[idx] || "fa-code"}`} />
            </div>
            <div className="skill-title">{skill.category}</div>
            <div className="skill-desc">{skill.desc}</div>
            <div className="skill-tags">
              {skill.tags.map((tag, tIdx) => (
                <span key={tIdx} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
