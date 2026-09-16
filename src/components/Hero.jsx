"use client";

import { portfolioData } from "@/data/portfolioData";

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section id="hero">
      <div className="hero-meta">
        <span className="live-dot" />
        {personal.availability.toUpperCase()} — {personal.location.toUpperCase()}
      </div>

      <h1 className="hero-title">
        <div className="word-mask">
          <span className="word-inner">{personal.heroHeadline.line1}</span>
        </div>
        <br />
        <div className="word-mask">
          <span className="word-inner gradient-text font-light italic">
            {personal.heroHeadline.accent}
          </span>
        </div>
        <br />
        <div className="word-mask">
          <span className="word-inner">{personal.heroHeadline.line2}</span>
        </div>
      </h1>

      <p className="hero-subtitle">
        {personal.heroSubtitle}
      </p>

      <div className="hero-actions">
        <a href="#projects" className="btn-primary" data-hover>
          <span>VIEW SELECTED WORK</span> <i className="fas fa-arrow-right" />
        </a>
        <a href="#contact" className="btn-secondary" data-hover>
          INITIATE CONTACT <i className="fas fa-plus" />
        </a>
      </div>

      <div className="hero-scroll-hint">
        <span>SCROLL TO EXPLORE</span>
        <div className="line" />
      </div>
    </section>
  );
}
