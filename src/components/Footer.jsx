"use client";

import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer>
      <div className="footer-grid">
        <div className="mono" style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.15em" }}>
          © {new Date().getFullYear()} {personal.name.toUpperCase()} — CRAFTED WITH OBSESSION IN {personal.location.toUpperCase()}
        </div>

        <div className="footer-social">
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noreferrer"
            data-hover
            aria-label="GitHub"
            title="GitHub Profile"
          >
            <i className="fab fa-github" />
          </a>

          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            data-hover
            aria-label="LinkedIn"
            title="LinkedIn Profile"
          >
            <i className="fab fa-linkedin-in" />
          </a>

          <a
            href={personal.socials.instagram}
            target="_blank"
            rel="noreferrer"
            data-hover
            aria-label="Instagram"
            title="Instagram Profile"
          >
            <i className="fab fa-instagram" />
          </a>

          <a
            href={personal.socials.threads}
            target="_blank"
            rel="noreferrer"
            data-hover
            aria-label="Threads"
            title="Threads Profile"
          >
            <i className="fab fa-threads" />
          </a>
        </div>

        <div className="mono" style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.15em" }}>
          BUILT WITH MERN + NEXT.JS + THREE.JS
        </div>
      </div>
    </footer>
  );
}
