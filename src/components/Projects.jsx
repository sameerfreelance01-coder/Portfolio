"use client";

import { portfolioData } from "@/data/portfolioData";

export default function Projects() {
  const { projects } = portfolioData;

  const fallbackImages = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <section id="projects">
      <span className="section-num">03 / 06</span>
      <div className="section-label">[ SYSTEM // SELECTED_WORK ]</div>

      <h2 className="section-title">
        <span className="word-mask">
          <span className="word-inner gradient-text">Featured Deployments</span>
        </span>
      </h2>

      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <article key={proj.id || idx} className="project-card glass-card" data-hover>
            <div className="project-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={proj.image || fallbackImages[idx % fallbackImages.length]}
                alt={proj.title}
                onError={(e) => {
                  // If local image is not yet dropped in public folder, smoothly fallback
                  e.currentTarget.src = fallbackImages[idx % fallbackImages.length];
                }}
              />

            </div>

            <div className="project-content">
              <div className="project-meta">
                <span>{proj.category} / {proj.year}</span>
                <span><i className="fas fa-arrow-up-right-from-square" /></span>
              </div>
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>

              {proj.metrics && (
                <div className="project-metrics">
                  <i className="fas fa-chart-line" /> {proj.metrics}
                </div>
              )}

              <div className="skill-tags">
                {proj.tags && proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
