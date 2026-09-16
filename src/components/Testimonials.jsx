"use client";

import { portfolioData } from "@/data/portfolioData";

export default function Testimonials() {
  const { testimonials } = portfolioData;

  return (
    <section id="testimonials">
      <div className="section-label reveal visible">[ SYSTEM // CLIENT_DATA ]</div>
      <h2 className="section-headline reveal visible">
        What partners<br />say about the work.
      </h2>
      <div className="testimonials-marquee">
        <div className="testimonials-track">
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-quote-mark">&ldquo;</div>
              <div className="testimonial-quote">{t.quote}</div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-name">{t.author}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
