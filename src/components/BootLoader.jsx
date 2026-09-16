"use client";

import { useEffect, useState } from "react";

export default function BootLoader() {
  const [counter, setCounter] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        const next = prev + Math.floor(Math.random() * 9 + 3);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 350);
          return 100;
        }
        return next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="loader" className={done ? "done" : ""}>
      <div className="loader-text">&gt; INITIALIZING MERN_NEXT.SYS</div>
      <div className="loader-counter">
        <span>{String(counter).padStart(3, "0")}</span>
        <span className="pct">%</span>
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" style={{ width: `${counter}%` }} />
      </div>
      <div className="loader-meta">
        M SAMEER · FULL-STACK ARCHITECT · v2080.1
      </div>
    </div>
  );
}
