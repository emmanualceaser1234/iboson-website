"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Full-screen WebGL canvas behind the page. Mount once per page that has `<ParticleSlot>`s.
 * Three.js is loaded lazily so it never blocks first paint; until it is ready, each slot
 * shows its static Figma illustration.
 */
export function ParticleScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let started = false;
    let destroy: (() => void) | undefined;
    const root = document.documentElement;
    // No particles (no WebGL, or the engine failed): show the static images instead.
    const fallBack = () => {
      if (!cancelled) root.dataset.particles = "off";
    };

    import("./engine/createParticleScene")
      .then(({ createParticleScene }) =>
        createParticleScene({
          canvas: canvasRef.current!,
          onReady: () => {
            started = true;
            if (cancelled) return;
            setReady(true);
            root.dataset.particles = "on";
          },
        }),
      )
      .then((cleanup) => {
        if (cancelled) cleanup();
        else destroy = cleanup;
        // The first frame renders before createParticleScene resolves, so if onReady
        // hasn't fired by now the scene bailed out (e.g. WebGL unavailable).
        if (!started) fallBack();
      })
      .catch((err) => {
        console.error("Particle scene failed to start", err);
        fallBack();
      });

    return () => {
      cancelled = true;
      destroy?.();
      delete root.dataset.particles;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 block h-full w-full transition-opacity duration-1000",
        ready ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
