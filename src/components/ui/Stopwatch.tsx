"use client";

import { useEffect, useState } from "react";

export default function Stopwatch({ className = "" }: { className?: string }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s + 1) % 60);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`font-ticket tabular-nums text-ink ${className}`}>
      00:{String(seconds).padStart(2, "0")}
    </span>
  );
}
