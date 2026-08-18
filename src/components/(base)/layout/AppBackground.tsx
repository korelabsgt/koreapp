"use client";

import { useEffect, useState } from "react";

import { Particles } from "@/components/ui/particles";

export function AppBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-black"
      aria-hidden
    >
      {mounted ? (
        <Particles
          className="absolute inset-0"
          quantity={120}
          ease={80}
          color="#ffffff"
          refresh
        />
      ) : null}
    </div>
  );
}
