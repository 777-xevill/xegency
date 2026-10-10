"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { createStage, whenNear, type Stage } from "./stage";
import { buildMark, loadMarkDeps, poseMark, studioLighting } from "./mark";

/* ============================================================================
   FOOTER SCENE
   ----------------------------------------------------------------------------
   The same 3D mark as the hero, back for the finale. It is not on a timer:
   the four pieces are scattered when the footer first appears and slide
   together as you scroll down to it, locking into place at the bottom. After
   that it idles and leans toward the cursor.

   Created only when the footer is about to be seen, paused off-screen.
   ========================================================================== */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

export function FooterScene({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let cancelled = false;
    let stage: Stage | null = null;
    let removePointer: (() => void) | undefined;

    const cancelWait = whenNear(el, async () => {
      try {
        const reduced = prefersReducedMotion();
        const fine = hasFinePointer();

        const [made, deps] = await Promise.all([
          createStage(el, { animate: !reduced }),
          loadMarkDeps(),
        ]);
        if (!made) return; // decorative: nothing to fall back to
        stage = made;
        if (cancelled) {
          made.dispose();
          return;
        }

        const { THREE, camera, canvas, scene } = made;
        studioLighting(made, deps);

        const glow = new THREE.PointLight(0xffd6a8, 0, 18, 2);
        glow.position.set(0, 0, 4);
        scene.add(glow);

        const rig = new THREE.Group();
        scene.add(rig);
        const { mark, pieces } = buildMark(made, deps, reduced);
        rig.add(mark);

        const halfTan = Math.tan((camera.fov * Math.PI) / 360);
        const base = { x: 0, y: 0, scale: 1, visW: 1, visH: 1 };
        made.onResize((w, h) => {
          const aspect = w / h;
          const wide = aspect > 1.15;
          const extent = 3.5;
          // Fit the diamond inside whichever dimension is tighter.
          const fillH = wide ? 0.5 : 0.36;
          const fillW = wide ? 0.34 : 0.5;
          const dH = extent / fillH / (2 * halfTan);
          const dW = extent / fillW / (aspect * 2 * halfTan);
          camera.position.set(0, 0, Math.max(dH, dW));
          base.visH = 2 * camera.position.z * halfTan;
          base.visW = base.visH * aspect;
          // Landscape: right side, above the buttons. Portrait: top-right.
          base.x = wide ? base.visW * 0.27 : base.visW * 0.24;
          base.y = wide ? base.visH * 0.1 : base.visH * 0.26;
        });

        const input = { px: 0, py: 0, seen: false };
        const smooth = { px: 0, py: 0, progress: 0 };
        const onPointer = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          input.seen = true;
          input.px = (e.clientX / window.innerWidth - 0.5) * 2;
          input.py = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        if (fine && !reduced) {
          window.addEventListener("pointermove", onPointer, { passive: true });
          removePointer = () =>
            window.removeEventListener("pointermove", onPointer);
        }

        let shown = -1;
        made.onFrame((t, dt) => {
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;
          // 0 as the footer's top edge enters, 1 once it is mostly in view.
          const target = reduced ? 1 : clamp01((vh - rect.top) / (vh * 0.95));
          const k = 1 - Math.exp(-dt * 5);
          smooth.px += (input.px - smooth.px) * k;
          smooth.py += (input.py - smooth.py) * k;
          smooth.progress += (target - smooth.progress) * (reduced ? 1 : k * 0.9);
          const p = smooth.progress;

          pieces.forEach((piece, i) => {
            piece.intro = easeOut(clamp01(p * 1.4 - i * 0.14));
          });
          poseMark(pieces, t, 0);

          if (!fine) {
            input.px = Math.sin(t * 0.4) * 0.6;
            input.py = Math.cos(t * 0.31) * 0.3;
          }
          rig.rotation.x = smooth.py * 0.3 + Math.sin(t * 0.35) * 0.05;
          // A slow half-turn as it assembles, then it settles and sways.
          rig.rotation.y =
            smooth.px * 0.45 + (1 - p) * Math.PI * 0.7 + Math.sin(t * 0.25) * 0.14;
          rig.position.set(base.x, base.y, 0);
          rig.scale.setScalar(base.scale);

          glow.position.set(
            smooth.px * base.visW * 0.5,
            -smooth.py * base.visH * 0.5,
            3.6,
          );
          const glowTarget = fine && input.seen ? 24 : 0;
          glow.intensity += (glowTarget - glow.intensity) * k;

          const next = clamp01(p * 3);
          if (Math.abs(next - shown) > 0.01) {
            shown = next;
            canvas.style.opacity = String(next);
          }
        });

        if (reduced) made.renderOnce();
      } catch {
        /* decorative scene — the footer works without it */
      }
    });

    return () => {
      cancelled = true;
      cancelWait();
      removePointer?.();
      stage?.dispose();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
