"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { createStage, whenNear, type Stage } from "./stage";

/* ============================================================================
   CORE SCENE  —  "the engine room"
   ----------------------------------------------------------------------------
   A few thousand points on a sphere, wrapped by three tilted orbit rings with
   a bright satellite riding each. As the section scrolls past, the sphere
   flattens, along the line from its centre, into the faceted diamond (an
   octahedron) — the brand's square-on-a-point shape in three dimensions. The
   cursor pushes the points aside as it passes.

   Pure points and lines (no lighting), so it stays cheap. Created only when
   the section is about to be seen, paused off-screen.
   ========================================================================== */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uReveal;
  uniform float uWorldSize;
  uniform float uPxPerUnit;
  uniform float uCamZ;
  uniform vec3 uPointer;
  uniform float uPointerOn;
  attribute vec3 aTarget;
  attribute float aSeed;
  varying float vAlpha;
  varying float vMix;

  void main() {
    // Each point leaves a touch later than its neighbour, so the sphere
    // peels into the diamond instead of snapping.
    float m = smoothstep(0.0, 1.0, clamp(uMorph * 1.25 - aSeed * 0.25, 0.0, 1.0));
    vec3 p = mix(position, aTarget, m);
    p += normalize(p) * sin(uTime * 0.6 + aSeed * 6.2831) * 0.018;

    vec4 world = modelMatrix * vec4(p, 1.0);

    vec2 away = world.xy - uPointer.xy;
    float push = (1.0 - smoothstep(0.0, 1.5, length(away))) * uPointerOn;
    world.xy += normalize(away + vec2(0.0001)) * push * 0.5;
    world.z += push * 0.7;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    float grow = clamp(uReveal * 1.5 - aSeed * 0.5, 0.0, 1.0);
    // World-sized points: they scale with the object, not with the screen.
    gl_PointSize = uWorldSize * uPxPerUnit * grow * (1.0 + push * 0.9) * (uCamZ / -mv.z);
    vAlpha = (0.3 + 0.7 * aSeed) * grow;
    vMix = aSeed;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;
  varying float vMix;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = 1.0 - smoothstep(0.0, 0.5, d);
    a *= a;
    gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a * vAlpha);
    #include <colorspace_fragment>
  }
`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function CoreScene({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let cancelled = false;
    let stage: Stage | null = null;
    let reveal: gsap.core.Tween | undefined;
    let removePointer: (() => void) | undefined;

    const cancelWait = whenNear(el, async () => {
      try {
        const reduced = prefersReducedMotion();
        const fine = hasFinePointer();

        const made = await createStage(el, { animate: !reduced, maxPixelRatio: 1.6 });
        if (!made) return; // decorative: nothing to fall back to
        stage = made;
        if (cancelled) {
          made.dispose();
          return;
        }

        const { THREE, scene, camera, canvas, renderer } = made;
        const small = window.innerWidth < 768;

        /* --------------------------------------------- points */
        const COUNT = small ? 1800 : 4200;
        const R = 1.7; // sphere radius
        const OCTA = 2.3; // octahedron: |x| + |y| + |z| = OCTA
        const positions = new Float32Array(COUNT * 3);
        const targets = new Float32Array(COUNT * 3);
        const seeds = new Float32Array(COUNT);
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < COUNT; i++) {
          const y = 1 - (i / (COUNT - 1)) * 2;
          const ring = Math.sqrt(1 - y * y);
          const theta = golden * i;
          const dx = Math.cos(theta) * ring;
          const dy = y;
          const dz = Math.sin(theta) * ring;
          const jitter = 1 + (Math.random() - 0.5) * 0.05;
          positions[i * 3] = dx * R * jitter;
          positions[i * 3 + 1] = dy * R * jitter;
          positions[i * 3 + 2] = dz * R * jitter;
          // Same direction, but out on the octahedron's surface.
          const reach = OCTA / (Math.abs(dx) + Math.abs(dy) + Math.abs(dz));
          targets[i * 3] = dx * reach;
          targets[i * 3 + 1] = dy * reach;
          targets[i * 3 + 2] = dz * reach;
          seeds[i] = Math.random();
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

        const uniforms = {
          uTime: { value: 0 },
          uMorph: { value: 0 },
          uReveal: { value: reduced ? 1 : 0 },
          uWorldSize: { value: small ? 0.046 : 0.036 },
          uPxPerUnit: { value: 80 },
          uCamZ: { value: 14 },
          uPointer: { value: new THREE.Vector3(99, 99, 0) },
          uPointerOn: { value: 0 },
          uColorA: { value: new THREE.Color(0xa59b8f) },
          uColorB: { value: new THREE.Color(0xe4dfd7) },
        };
        const points = new THREE.Points(
          geometry,
          new THREE.ShaderMaterial({
            vertexShader: VERTEX,
            fragmentShader: FRAGMENT,
            uniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        );
        points.frustumCulled = false;

        /* ---------------------------------------------- rings */
        const ringLine = new THREE.LineBasicMaterial({
          color: 0xa59b8f,
          transparent: true,
          opacity: 0.26,
        });
        const satellite = new THREE.MeshBasicMaterial({ color: 0xe4dfd7 });
        const dot = new THREE.SphereGeometry(0.045, 14, 14);
        const SEGMENTS = 160;
        const ringSpecs = [
          { radius: 2.55, tilt: [1.15, 0.25, 0], speed: 0.16 },
          { radius: 2.9, tilt: [0.35, 0.95, 0.3], speed: -0.11 },
          { radius: 3.25, tilt: [-0.65, 0.3, 1.1], speed: 0.07 },
        ];
        const rings = ringSpecs.map((spec) => {
          const arc = new Float32Array(SEGMENTS * 3);
          for (let i = 0; i < SEGMENTS; i++) {
            const a = (i / SEGMENTS) * Math.PI * 2;
            arc[i * 3] = Math.cos(a) * spec.radius;
            arc[i * 3 + 1] = Math.sin(a) * spec.radius;
          }
          const lineGeometry = new THREE.BufferGeometry();
          lineGeometry.setAttribute("position", new THREE.BufferAttribute(arc, 3));
          const orbit = new THREE.Group(); // spins about its own axis
          orbit.add(new THREE.LineLoop(lineGeometry, ringLine));
          const sat = new THREE.Mesh(dot, satellite);
          sat.position.set(spec.radius, 0, 0);
          orbit.add(sat);
          const tilt = new THREE.Group(); // fixed tilt of the whole ring
          tilt.rotation.set(spec.tilt[0], spec.tilt[1], spec.tilt[2]);
          tilt.add(orbit);
          return { orbit, speed: spec.speed, tilt };
        });

        const core = new THREE.Group();
        core.add(points);
        rings.forEach((r) => core.add(r.tilt));
        scene.add(core);

        /* ------------------------------------------- layout */
        const halfTan = Math.tan((camera.fov * Math.PI) / 360);
        const base = { x: 0, y: 0, visW: 1, visH: 1 };
        made.onResize((w, h) => {
          const aspect = w / h;
          const extent = 6.6; // ring-to-ring diameter
          // Fill the block, with a little air for the tilted rings.
          const dH = extent / 0.92 / (2 * halfTan);
          const dW = extent / 0.92 / (aspect * 2 * halfTan);
          camera.position.set(0, 0, Math.max(dH, dW));
          base.visH = 2 * camera.position.z * halfTan;
          base.visW = base.visH * aspect;
          uniforms.uCamZ.value = camera.position.z;
          uniforms.uPxPerUnit.value = (h * renderer.getPixelRatio()) / base.visH;
          base.x = 0;
          base.y = 0;
        });

        /* ------------------------------------------ pointer */
        const pointer = { x: 0, y: 0, seen: false };
        const onPointer = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          pointer.seen = true;
          pointer.x = e.clientX;
          pointer.y = e.clientY;
        };
        if (fine && !reduced) {
          window.addEventListener("pointermove", onPointer, { passive: true });
          removePointer = () =>
            window.removeEventListener("pointermove", onPointer);
        }

        /* --------------------------------------------- frame */
        const section = el.closest("section") ?? el;
        let started = false;
        let shown = -1;
        let morph = 0;

        made.onFrame((t, dt) => {
          const k = 1 - Math.exp(-dt * 4);
          const vh = window.innerHeight;
          const rect = section.getBoundingClientRect();
          // 0 as the section enters the bottom edge, 1 as it leaves the top.
          const p = clamp01((vh - rect.top) / (rect.height + vh));

          if (!started) {
            started = true;
            canvas.style.opacity = "1";
            if (!reduced) {
              reveal = gsap.to(uniforms.uReveal, {
                value: 1,
                duration: 2.8,
                ease: "expo.out",
              });
            }
          }

          morph += (smoothstep(0.34, 0.66, p) - morph) * k;
          uniforms.uMorph.value = reduced ? 0 : morph;
          uniforms.uTime.value = t;

          core.position.set(base.x, base.y, 0);
          core.rotation.y = t * 0.09 + p * Math.PI * 1.3;
          core.rotation.x = 0.4 + Math.sin(t * 0.2) * 0.06 + p * 0.25;
          for (const r of rings) r.orbit.rotation.z += r.speed * dt;

          // Pointer → world position on the plane the core sits in.
          const box = el.getBoundingClientRect();
          const nx = ((pointer.x - box.left) / box.width) * 2 - 1;
          const ny = -(((pointer.y - box.top) / box.height) * 2 - 1);
          const inside = pointer.seen && Math.abs(nx) <= 1 && Math.abs(ny) <= 1;
          uniforms.uPointer.value.set((nx * base.visW) / 2, (ny * base.visH) / 2, 0);
          uniforms.uPointerOn.value +=
            ((inside ? 1 : 0) - uniforms.uPointerOn.value) * k * 1.5;

          // Fade the whole thing in and out with the section.
          const fade = Math.min(smoothstep(0, 0.12, p), 1 - smoothstep(0.88, 1, p));
          if (Math.abs(fade - shown) > 0.01) {
            shown = fade;
            canvas.style.opacity = String(fade);
          }
        });

        if (reduced) made.renderOnce();
      } catch {
        /* decorative scene — the section works without it */
      }
    });

    return () => {
      cancelled = true;
      cancelWait();
      removePointer?.();
      reveal?.kill();
      stage?.dispose();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
