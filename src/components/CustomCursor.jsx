"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run on desktop/devices with fine pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Aggressively force cursor: none on document
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let hasMoved = false;

    // Initially hide until first movement
    dot.style.opacity = "0";
    ring.style.opacity = "0";

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = "1";
        ring.style.opacity = "0.6";
      }

      // Exact Sample 2 dot translation: mouseX - 4, mouseY - 4 (since dot is 8px)
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    };

    let animId;
    const animateRing = () => {
      // Exact Sample 2 lerp: 0.15
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      // When hovering ring expands to 60px (radius 30), otherwise 40px (radius 20)
      const radius = isHovering ? 30 : 20;
      ring.style.transform = `translate3d(${ringX - radius}px, ${ringY - radius}px, 0)`;

      animId = requestAnimationFrame(animateRing);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".hoverable") ||
        target.closest("[data-hover]") ||
        target.closest(".project-card") ||
        target.closest(".skill-card") ||
        target.closest(".stat-card") ||
        target.closest(".timeline-content")
      ) {
        isHovering = true;
        ring.classList.add("hovering");
      } else {
        isHovering = false;
        ring.classList.remove("hovering");
      }
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        dot.style.opacity = "1";
        ring.style.opacity = "0.6";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    animId = requestAnimationFrame(animateRing);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
