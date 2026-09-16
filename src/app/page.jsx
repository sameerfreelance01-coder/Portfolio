"use client";

import BootLoader from "@/components/BootLoader";
import Background3D from "@/components/Background3D";
import CustomCursor from "@/components/CustomCursor";
import GsapTransitions from "@/components/GsapTransitions";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import AiAgent from "@/components/AiAgent";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 1. Sleek Circular Blue Cursor from Sample 2 */}
      <CustomCursor />

      {/* 2. GSAP & ScrollTrigger Animations & Transitions */}
      <GsapTransitions />

      {/* 3. Three.js Cosmic Blue 3D Background from Sample 2 */}
      <Background3D />

      {/* 4. Futuristic HUD Overlays */}
      <div className="hud-corners">
        <div className="hud-corner hud-tl" />
        <div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" />
        <div className="hud-corner hud-br" />
      </div>
      <div className="scanlines" />

      {/* 5. System Boot Loader */}
      <BootLoader />

      {/* 6. Navigation Bar */}
      <Navbar />

      {/* 7. Main Portfolio Sections */}
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <AiAgent />
        <Timeline />
        <Contact />
      </main>

      {/* 8. Footer */}
      <Footer />
    </>
  );
}
