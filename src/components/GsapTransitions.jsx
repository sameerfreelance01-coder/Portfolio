"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapTransitions() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Entrance Timeline (Matches Sample 2)
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(".hero-meta", { opacity: 1, duration: 0.8, delay: 0.2 })
      .to("#hero .word-inner", { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }, "-=0.4")
      .to(".hero-subtitle", { opacity: 1, duration: 1, y: 0 }, "-=0.6")
      .to(".hero-actions", { opacity: 1, duration: 1, y: 0 }, "-=0.6")
      .to(".hero-scroll-hint", { opacity: 1, duration: 1 }, "-=0.6");

    // 2. Dynamic Word-Mask Text Reveals for Section Titles (Sample 2 style)
    document.querySelectorAll(".section-title .word-inner").forEach((el) => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    // 3. Section Labels & Numbers Fade In
    document.querySelectorAll(".section-label, .section-num").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    // 4. About Section Stats Cards
    gsap.utils.toArray(".stat-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
            once: true,
          },
        }
      );
    });

    // 5. Skill Cards Stagger (Sample 2 style)
    gsap.utils.toArray(".skill-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: (i % 3) * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // 6. Project Cards Entrance - Individual fluid reveal
    gsap.utils.toArray(".project-card").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // 7. Journey Timeline Items - Fluid alternating reveal (Sample 2 style)
    gsap.utils.toArray(".timeline-item").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        }
      );
    });

    // 8. AI Agent Section
    const agentEl = document.querySelector(".agent-container");
    if (agentEl) {
      gsap.fromTo(
        agentEl,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#ai-agent",
            start: "top 75%",
            once: true,
          },
        }
      );
    }

    // 9. Contact Grid & Form
    const contactGrid = document.querySelector(".contact-grid");
    if (contactGrid) {
      gsap.fromTo(
        contactGrid,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contact",
            start: "top 75%",
            once: true,
          },
        }
      );
    }

    // Refresh ScrollTrigger once DOM layout finishes settling
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
