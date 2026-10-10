"use client";

import { useEffect, useRef, useState } from "react";
import type { BufferGeometry, Group, Material, Mesh, Object3D } from "three";
import { gsap } from "gsap";
import { LogoMark } from "@/components/logo";
import {
  hasFinePointer,
  onIntroDone,
  prefersReducedMotion,
} from "@/lib/motion";

/* ============================================================================
   HERO SCENE
   ----------------------------------------------------------------------------
   The logo mark rebuilt in 3D: three porcelain slabs and one hollow metal
   frame on a 45° grid (see src/lib/logo-geometry.ts for the 2D original).

   - three.js is imported inside the effect, so it never touches the initial
     bundle; the canvas fades in after the first frame.
   - Intro: the pieces fly in from scattered positions once the preloader
     lifts. Idle: gentle float. Pointer: the rig leans toward the cursor.
     Scroll: the mark explodes along its diagonals as the hero leaves.
   - Paused while off-screen or in a hidden tab. Fully disposed on unmount.
   - Reduced motion renders the assembled mark once. No WebGL falls back to
     the flat SVG mark.
   ========================================================================== */

// Distance from the grid centre to each square's centre, in square sides.
const O = 28.5 / 43;

type PieceDef = {
  key: "a" | "b" | "c" | "frame";
  x: number;
  y: number;
  /** Scattered start rotation (rad). */
  spin: [number, number, number];
};

// Assembly order: the three solids first, the frame lands last.
const PIECES: PieceDef[] = [
  { key: "a", x: O, y: O, spin: [0.9, -1.1, 1.4] },
  { key: "b", x: O, y: -O, spin: [-1.2, 0.8, -1.0] },
  { key: "c", x: -O, y: -O, spin: [1.1, 1.3, 0.7] },
  { key: "frame", x: -O, y: O, spin: [-0.8, -1.2, 2.2] },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function HeroScene({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const [THREE, { RoomEnvironment }, { RoundedBoxGeometry }] =
          await Promise.all([
            import("three"),
            import("three/addons/environments/RoomEnvironment.js"),
            import("three/addons/geometries/RoundedBoxGeometry.js"),
          ]);
        if (cancelled) return;

        const reduced = prefersReducedMotion();
        const fine = hasFinePointer();

        /* ------------------------------------------------ renderer */
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        const small = window.innerWidth < 768;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.NeutralToneMapping;
        renderer.toneMappingExposure = 1;
        const canvas = renderer.domElement;
        canvas.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.4s cubic-bezier(0.16,1,0.3,1)";
        el.appendChild(canvas);

        /* --------------------------------------------------- scene */
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);

        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        const envTarget = pmrem.fromScene(room, 0.04);
        scene.environment = envTarget.texture;
        scene.environmentIntensity = 0.6;

        const key = new THREE.DirectionalLight(0xffe9cf, 1.7);
        key.position.set(3.5, 4.5, 6);
        const rim = new THREE.DirectionalLight(0xa59b8f, 3.2);
        rim.position.set(-5, 2, -4);
        scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.15));

        /* ------------------------------------------------ materials */
        const porcelain = new THREE.MeshPhysicalMaterial({
          color: 0xe4dfd7,
          roughness: 0.36,
          metalness: 0,
          clearcoat: 0.6,
          clearcoatRoughness: 0.22,
        });
        const metal = new THREE.MeshPhysicalMaterial({
          color: 0xa59b8f,
          metalness: 1,
          roughness: 0.2,
          emissive: 0x2a2118,
          emissiveIntensity: 0.5,
        });

        /* ------------------------------------------------ geometry */
        const slabDepth = 0.24;
        const slab = new RoundedBoxGeometry(1, 1, slabDepth, 5, 0.06);

        // Hollow frame: outer 1 × 1, bar thickness 9/43 like the 2D mark.
        const bevel = 0.02;
        const outerHalf = 0.5 - bevel;
        const holeHalf = 0.29 + bevel;
        const frameShape = new THREE.Shape();
        frameShape.moveTo(-outerHalf, -outerHalf);
        frameShape.lineTo(outerHalf, -outerHalf);
        frameShape.lineTo(outerHalf, outerHalf);
        frameShape.lineTo(-outerHalf, outerHalf);
        frameShape.closePath();
        const hole = new THREE.Path();
        hole.moveTo(-holeHalf, -holeHalf);
        hole.lineTo(-holeHalf, holeHalf);
        hole.lineTo(holeHalf, holeHalf);
        hole.lineTo(holeHalf, -holeHalf);
        hole.closePath();
        frameShape.holes.push(hole);
        const frameGeo = new THREE.ExtrudeGeometry(frameShape, {
          depth: slabDepth - bevel * 2,
          bevelEnabled: true,
          bevelThickness: bevel,
          bevelSize: bevel,
          bevelSegments: 4,
          curveSegments: 4,
        });
        frameGeo.translate(0, 0, -(slabDepth - bevel * 2) / 2);

        /* --------------------------------------------------- rig */
        const rig = new THREE.Group();
        const mark = new THREE.Group();
        // Same quarter-turn as the 2D mark: the hollow piece ends up on top.
        mark.rotation.z = -Math.PI / 4;
        rig.add(mark);
        scene.add(rig);

        type Piece = {
          def: PieceDef;
          mesh: Mesh;
          dirX: number;
          dirY: number;
          intro: number;
          phase: number;
        };
        const pieces: Piece[] = PIECES.map((def, i) => {
          const mesh = new THREE.Mesh(
            def.key === "frame" ? frameGeo : slab,
            def.key === "frame" ? metal : porcelain,
          );
          mark.add(mesh);
          const len = Math.hypot(def.x, def.y);
          return {
            def,
            mesh,
            dirX: def.x / len,
            dirY: def.y / len,
            intro: reduced ? 1 : 0,
            phase: i * 1.7,
          };
        });

        /* ------------------------------------------------- dust */
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
        const dustMat = new THREE.PointsMaterial({
          color: 0xa59b8f,
          size: 0.022,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.55,
          depthWrite: false,
        });
        const dust = new THREE.Points(dustGeo, dustMat);
        scene.add(dust);

        /* ------------------------------------------------ layout */
        const halfTan = Math.tan((camera.fov * Math.PI) / 360);
        const base = { x: 0, y: 0 };
        const layout = () => {
          const w = Math.max(1, el.clientWidth);
          const h = Math.max(1, el.clientHeight);
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          const wide = camera.aspect > 1.15;
          const extent = 3.5; // diamond width/height incl. margin
          const dH = extent / (wide ? 0.56 : 0.3) / (2 * halfTan);
          const dW = extent / (wide ? 0.42 : 0.44) / (camera.aspect * 2 * halfTan);
          camera.position.set(0, 0, Math.max(dH, dW));
          camera.updateProjectionMatrix();
          const visH = 2 * camera.position.z * halfTan;
          const visW = visH * camera.aspect;
          // Landscape: right of the copy. Portrait: tucked into the empty
          // top-right corner beside the headline.
          base.x = wide ? visW * 0.15 : visW * 0.27;
          base.y = wide ? 0 : visH * 0.2;
        };
        layout();
        const ro = new ResizeObserver(layout);
        ro.observe(el);

        /* ---------------------------------------------- inputs */
        const heroEl = el.closest("section") ?? el.parentElement ?? el;
        const input = { px: 0, py: 0, scroll: 0 };
        const smooth = { px: 0, py: 0, scroll: 0 };
        const onPointer = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          input.px = (e.clientX / window.innerWidth - 0.5) * 2;
          input.py = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        if (fine && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

        /* ----------------------------------------------- render */
        let visible = true;
        let raf = 0;
        let last = 0;
        let started = false;
        let shown = 0;

        const draw = (now: number) => {
          raf = requestAnimationFrame(draw);
          if (!visible || document.hidden) {
            last = now;
            return;
          }
          const dt = Math.min((now - (last || now)) / 1000, 0.05);
          last = now;
          const t = now / 1000;

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
          rig.rotation.y = smooth.px * 0.38 + s * Math.PI * 0.6 + Math.sin(t * 0.22) * 0.1;
          rig.position.set(base.x, base.y - s * 0.9, -s * 1.4);
          const scale = 1 - s * 0.12;
          rig.scale.setScalar(scale);

          for (const p of pieces) {
            const away = (1 - p.intro) * 2.8 + s * 1.15;
            const wobble = Math.sin(t * 0.9 + p.phase) * 0.045 * p.intro;
            p.mesh.position.set(
              p.def.x + p.dirX * away,
              p.def.y + p.dirY * away,
              (1 - p.intro) * 2.2 + s * 0.95 + wobble,
            );
            const unrest = 1 - p.intro;
            p.mesh.rotation.set(
              p.def.spin[0] * unrest + (p.def.key === "frame" ? 0 : s * 0.5),
              p.def.spin[1] * unrest,
              p.def.spin[2] * unrest + (p.def.key === "frame" ? s * Math.PI : 0),
            );
          }

          dust.rotation.y = t * 0.02 + smooth.px * 0.05;
          dust.position.y = Math.sin(t * 0.1) * 0.15 - s * 0.6;

          renderer.render(scene, camera);

          // Dissolve with the scroll; touch the DOM only when it changes.
          const nextOpacity = started ? Math.max(0, 1 - s * s * 0.95) : 0;
          if (Math.abs(nextOpacity - shown) > 0.01) {
            shown = nextOpacity;
            canvas.style.opacity = String(nextOpacity);
          }
        };

        // One static frame (assembled) for reduced motion.
        if (reduced) {
          started = true;
          for (const p of pieces) p.intro = 1;
          draw(performance.now());
          cancelAnimationFrame(raf);
          canvas.style.opacity = "1";
        } else {
          raf = requestAnimationFrame(draw);
        }

        const io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
          },
          { threshold: 0 },
        );
        io.observe(el);

        /* ---------------------------------------------- intro */
        let introTween: gsap.core.Tween | undefined;
        const unsubscribe = reduced
          ? () => {}
          : onIntroDone(() => {
              started = true;
              introTween = gsap.to(pieces, {
                intro: 1,
                duration: 2.2,
                ease: "expo.out",
                stagger: 0.16,
                delay: 0.15,
              });
            });

        /* -------------------------------------------- teardown */
        cleanup = () => {
          unsubscribe();
          introTween?.kill();
          cancelAnimationFrame(raf);
          io.disconnect();
          ro.disconnect();
          window.removeEventListener("pointermove", onPointer);

          const disposed = new Set<unknown>();
          const free = (o: Object3D) => {
            const m = o as Mesh;
            const g = m.geometry as BufferGeometry | undefined;
            if (g && !disposed.has(g)) {
              disposed.add(g);
              g.dispose();
            }
            const mat = m.material as Material | Material[] | undefined;
            for (const x of Array.isArray(mat) ? mat : mat ? [mat] : []) {
              if (!disposed.has(x)) {
                disposed.add(x);
                x.dispose();
              }
            }
          };
          scene.traverse(free);
          (rig as Group).clear();
          envTarget.dispose();
          pmrem.dispose();
          room.dispose();
          renderer.dispose();
          renderer.forceContextLoss();
          canvas.remove();
        };

        if (cancelled) cleanup();
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
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
