"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollWidth, setScrollWidth] = useState("0%");

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollWidth(`${progress}%`);
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" style={{ width: scrollWidth }} />
      <nav className={`main-nav ${scrolled ? "scrolled" : ""}`} id="mainNav">
        <a href="#hero" className="nav-logo">
          <span className="dot" />
          <span>{portfolioData.personal.navLogo}</span>
        </a>
        <div className="nav-links">
          <a href="#about" data-hover>ABOUT</a>
          <a href="#skills" data-hover>SKILLS</a>
          <a href="#projects" data-hover>WORK</a>
          <a href="#ai-agent" data-hover>AI AGENT</a>
          <a href="#journey" data-hover>JOURNEY</a>
          <a href="#contact" data-hover>CONTACT</a>
        </div>
        <a href="#contact" className="nav-cta" data-hover>
          <span>LET&apos;S TALK</span>
        </a>
      </nav>
    </>
  );
}
