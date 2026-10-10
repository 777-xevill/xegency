"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LogoMark } from "@/components/logo";
import {
  hasFinePointer,
  onIntroDone,
  prefersReducedMotion,
} from "@/lib/motion";
import { createStage, type Stage } from "./stage";
import { buildMark, loadMarkDeps, poseMark, studioLighting } from "./mark";

/* ============================================================================
   HERO SCENE
   ----------------------------------------------------------------------------
   The logo mark in 3D (see ./mark.ts), reacting to the visitor:

   - Intro: the pieces fly in from scattered positions once the preloader
     lifts; the hollow frame lands last.
   - Idle: gentle float and sway.
   - Pointer: the whole mark leans toward the cursor, and a warm light follows
     it across the surfaces so the porcelain and metal catch it.
   - Scroll: the mark explodes along its diagonals as the hero leaves.

   Paused off-screen, fully disposed on unmount. Reduced motion renders the
   assembled mark once; no WebGL falls back to the flat SVG mark.
   ========================================================================== */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function HeroScene({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let cancelled = false;
    let stage: Stage | null = null;
    let teardown: (() => void) | undefined;

    (async () => {
      try {
        const reduced = prefersReducedMotion();
        const fine = hasFinePointer();

        const [made, deps] = await Promise.all([
          createStage(el, { animate: !reduced }),
          loadMarkDeps(),
        ]);
        if (!made) {
          if (!cancelled) setFailed(true);
          return;
        }
        stage = made;
        if (cancelled) {
          made.dispose();
          return;
        }

        const { THREE, scene, camera, canvas } = made;
        studioLighting(made, deps);

        // A warm light that chases the cursor over the surfaces.
        const glow = new THREE.PointLight(0xffd6a8, 0, 18, 2);
        glow.position.set(0, 0, 4);
        scene.add(glow);

        const rig = new THREE.Group();
        scene.add(rig);
        const { mark, pieces } = buildMark(made, deps, reduced);
        rig.add(mark);

        /* ------------------------------------------------- dust */
        const small = window.innerWidth < 768;
        const COUNT = small ? 260 : 520;
        const positions = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
          const r = 3 + Math.random() * 7;
          const a = Math.random() * Math.PI * 2;
          positions[i * 3] = Math.cos(a) * r * 1.3;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
          positions[i * 3 + 2] = Math.sin(a) * r * 0.6 - 2;
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const dust = new THREE.Points(
          dustGeo,
          new THREE.PointsMaterial({
            color: 0xa59b8f,
            size: 0.022,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.55,
            depthWrite: false,
          }),
        );
        scene.add(dust);

        /* ------------------------------------------------ layout */
        const halfTan = Math.tan((camera.fov * Math.PI) / 360);
        const base = { x: 0, y: 0, visW: 1, visH: 1 };
        made.onResize((w, h) => {
          const aspect = w / h;
          const wide = aspect > 1.15;
          const extent = 3.5; // diamond width/height incl. margin
          const dH = extent / (wide ? 0.56 : 0.3) / (2 * halfTan);
          const dW = extent / (wide ? 0.42 : 0.44) / (aspect * 2 * halfTan);
          camera.position.set(0, 0, Math.max(dH, dW));
          base.visH = 2 * camera.position.z * halfTan;
          base.visW = base.visH * aspect;
          // Landscape: right of the copy. Portrait: tucked into the empty
          // top-right corner beside the headline.
          base.x = wide ? base.visW * 0.15 : base.visW * 0.27;
          base.y = wide ? 0 : base.visH * 0.2;
        });

        /* ---------------------------------------------- inputs */
        const heroEl = el.closest("section") ?? el.parentElement ?? el;
        const input = { px: 0, py: 0, scroll: 0, seen: false };
        const smooth = { px: 0, py: 0, scroll: 0 };
        const onPointer = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          input.seen = true;
          input.px = (e.clientX / window.innerWidth - 0.5) * 2;
          input.py = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        if (fine && !reduced) {
          window.addEventListener("pointermove", onPointer, { passive: true });
        }

        let started = reduced;
        let shown = -1;

        made.onFrame((t, dt) => {
          const h = heroEl.getBoundingClientRect().height || window.innerHeight;
          input.scroll = clamp01(window.scrollY / (h * 0.9));
          if (!fine) {
            input.px = Math.sin(t * 0.4) * 0.6;
            input.py = Math.cos(t * 0.31) * 0.3;
          }
          const k = 1 - Math.exp(-dt * 5);
          smooth.px += (input.px - smooth.px) * k;
          smooth.py += (input.py - smooth.py) * k;
          smooth.scroll += (input.scroll - smooth.scroll) * k;
          const s = smooth.scroll;

          rig.rotation.x = smooth.py * 0.28 + s * 0.35 + Math.sin(t * 0.3) * 0.04;
          rig.rotation.y =
            smooth.px * 0.38 + s * Math.PI * 0.6 + Math.sin(t * 0.22) * 0.1;
          rig.position.set(base.x, base.y - s * 0.9, -s * 1.4);
          rig.scale.setScalar(1 - s * 0.12);

          poseMark(pieces, t, s);

          // Cursor light: follows the pointer, fades out when it is idle.
          glow.position.set(
            smooth.px * base.visW * 0.5,
            -smooth.py * base.visH * 0.5,
            3.6,
          );
          const glowTarget = fine && input.seen && started ? 26 : 0;
          glow.intensity += (glowTarget - glow.intensity) * k;

          dust.rotation.y = t * 0.02 + smooth.px * 0.05;
          dust.position.y = Math.sin(t * 0.1) * 0.15 - s * 0.6;

          // Dissolve with the scroll; touch the DOM only when it changes.
          const next = started ? Math.max(0, 1 - s * s * 0.95) : 0;
          if (Math.abs(next - shown) > 0.01) {
            shown = next;
            canvas.style.opacity = String(next);
          }
        });

        /* ---------------------------------------------- intro */
        let introTween: gsap.core.Tween | undefined;
        let unsubscribe: (() => void) | undefined;
        if (reduced) {
          made.renderOnce();
        } else {
          unsubscribe = onIntroDone(() => {
            started = true;
            introTween = gsap.to(pieces, {
              intro: 1,
              duration: 2.2,
              ease: "expo.out",
              stagger: 0.16,
              delay: 0.15,
            });
          });
        }

        teardown = () => {
          unsubscribe?.();
          introTween?.kill();
          window.removeEventListener("pointermove", onPointer);
        };
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      teardown?.();
      stage?.dispose();
    };
  }, []);

  return (
    <div
      ref={host}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[12%]">
          <LogoMark className="h-[min(60vw,22rem)] w-[min(60vw,22rem)] animate-[float_9s_ease-in-out_infinite] text-bone/25" />
        </div>
      )}
    </div>
  );
}
