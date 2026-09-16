"use client";

export default function Marquee() {
  const items = [
    "NEXT.JS",
    "REACT",
    "NODE.JS",
    "EXPRESS.JS",
    "MONGODB",
    "JAVASCRIPT (ES6+)",
    "TAILWIND CSS",
    "REST APIS",
    "WEBSOCKETS",
    "DOCKER",
    "POSTGRESQL",
  ];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="marquee-item">
            {item} <span className="star">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
