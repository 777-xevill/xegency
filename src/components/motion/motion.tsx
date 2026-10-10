"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { getLenis, onIntroDone, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ============================================================================
   MOTION ORCHESTRATOR
   ----------------------------------------------------------------------------
   Mounted once in the root layout. Section components stay server components
   and opt into motion with data attributes; this scans the page after every
   route change and wires each one up with GSAP + ScrollTrigger. Everything is
   torn down (and the DOM restored) before the next page is scanned.

   Text      data-split="lines|words|chars" [data-split-delay] [data-split-trigger="intro"]
             data-scrub-words
   Blocks    data-stagger[="0.07"]  data-draw  data-clip-reveal[="bottom|top|left|right"]
             data-parallax="0.15"  data-parallax-img  data-rotate-in
             data-velocity-skew  data-count
   Layouts   data-marquee="60" > data-marquee-track   data-pin-horizontal > data-pin-track
             data-stack
   Pointer   data-tilt[="7"]  data-magnetic[="0.3"]   (cursor labels live in cursor.tsx)

   Never put two transform-driving attributes on the same element.
   ========================================================================== */

type Cleanup = () => void;

const num = (value: string | undefined, fallback: number) => {
  const n = parseFloat(value ?? "");
  return Number.isFinite(n) ? n : fallback;
};

const all = (selector: string) =>
  Array.from(document.querySelectorAll<HTMLElement>(selector));

/** Smoothed scroll velocity (px/s), shared by the marquee and skew effects. */
let velocity = 0;

/**
 * CSS transitions on `transform` fight GSAP's per-frame writes. Strip
 * `transform` from an element's transition list while GSAP owns it; Tailwind
 * v4's separate translate/scale/rotate hover utilities keep working.
 */
const SAFE_TRANSITION =
  "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, filter, backdrop-filter, translate, scale, rotate, clip-path";

function guardTransform(el: HTMLElement): Cleanup {
  const props = getComputedStyle(el)
    .transitionProperty.split(",")
    .map((p) => p.trim());
  if (!props.includes("all") && !props.includes("transform")) return () => {};
  const previous = el.style.transitionProperty;
  el.style.transitionProperty = props.includes("all")
    ? SAFE_TRANSITION
    : props.filter((p) => p !== "transform").join(", ") || "none";
  return () => {
    el.style.transitionProperty = previous;
  };
}

const CLIP_FROM: Record<string, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/* --------------------------------------------------------------- text */

function splitText(cleanups: Cleanup[]) {
  for (const el of all("[data-split]")) {
    const mode =
      el.dataset.split === "chars"
        ? "chars"
        : el.dataset.split === "words"
          ? "words"
          : "lines";
    const delay = num(el.dataset.splitDelay, 0);
    const onIntro = el.dataset.splitTrigger === "intro";
    let unsubscribe: Cleanup | undefined;

    const split = SplitText.create(el, {
      type:
        mode === "chars"
          ? "lines,words,chars"
          : mode === "words"
            ? "lines,words"
            : "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit(self) {
        const targets =
          mode === "chars" ? self.chars : mode === "words" ? self.words : self.lines;
        const tween = gsap.from(targets, {
          yPercent: mode === "lines" ? 112 : 125,
          rotate: mode === "lines" ? 2.5 : 0,
          rotationX: mode === "chars" ? -80 : 0,
          opacity: mode === "lines" ? 1 : 0,
          transformOrigin: "50% 100%",
          transformPerspective: 700,
          duration: mode === "chars" ? 1.2 : 1.35,
          ease: "expo.out",
          stagger: mode === "chars" ? 0.022 : mode === "words" ? 0.045 : 0.11,
          delay,
          paused: onIntro,
          scrollTrigger: onIntro
            ? undefined
            : { trigger: el, start: "top 88%", once: true },
        });
        if (onIntro) {
          unsubscribe?.();
          unsubscribe = onIntroDone(() => tween.play());
        }
        return tween;
      },
    });

    cleanups.push(() => {
      unsubscribe?.();
      split.revert();
    });
  }

  for (const el of all("[data-scrub-letters]")) {
    const split = SplitText.create(el, {
      type: "chars",
      mask: "chars",
      charsClass: "split-char",
      onSplit(self) {
        return gsap.fromTo(
          self.chars,
          { yPercent: 118, rotate: 7, transformOrigin: "0% 100%" },
          {
            yPercent: 0,
            rotate: 0,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 108%",
              end: "top 62%",
              scrub: true,
            },
          },
        );
      },
    });
    cleanups.push(() => split.revert());
  }

  for (const el of all("[data-scrub-words]")) {
    const split = SplitText.create(el, {
      type: "words",
      onSplit(self) {
        return gsap.fromTo(
          self.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
      },
    });
    cleanups.push(() => split.revert());
  }
}

/* ------------------------------------------------------------- blocks */

function blocks(cleanups: Cleanup[]) {
  for (const el of all("[data-stagger]")) {
    const kids = Array.from(el.children) as HTMLElement[];
    if (kids.length === 0) continue;
    const guards = kids.map(guardTransform);
    gsap.from(kids, {
      y: 46,
      opacity: 0,
      rotationX: 14,
      transformPerspective: 1000,
      transformOrigin: "50% 0%",
      duration: 1.25,
      ease: "expo.out",
      stagger: num(el.dataset.stagger, 0.07),
      scrollTrigger: { trigger: el, start: "top 86%", once: true },
      onComplete: () => guards.forEach((g) => g()),
    });
    cleanups.push(() => guards.forEach((g) => g()));
  }

  for (const el of all("[data-draw]")) {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "0% 50%",
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 94%", once: true },
      },
    );
  }

  for (const el of all("[data-clip-reveal]")) {
    const from = CLIP_FROM[el.dataset.clipReveal ?? ""] ?? CLIP_FROM.bottom;
    const inner =
      el.querySelector<HTMLElement>("[data-clip-inner]") ?? el.querySelector("img");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    tl.fromTo(
      el,
      { clipPath: from },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.6,
        ease: "expo.inOut",
        clearProps: "clipPath",
      },
    );
    if (inner && !inner.hasAttribute("data-parallax-img")) {
      cleanups.push(guardTransform(inner));
      tl.fromTo(inner, { scale: 1.32 }, { scale: 1, duration: 2.1, ease: "expo.out" }, 0);
    }
  }

  for (const el of all("[data-parallax]")) {
    const speed = num(el.dataset.parallax, 0.15);
    cleanups.push(guardTransform(el));
    gsap.fromTo(
      el,
      { y: () => speed * 100 },
      {
        y: () => -speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  }

  for (const el of all("[data-parallax-img]")) {
    cleanups.push(guardTransform(el));
    gsap.fromTo(
      el,
      { yPercent: -8, scale: 1.18 },
      {
        yPercent: 8,
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }

  for (const el of all("[data-float3d]")) {
    gsap.fromTo(
      el,
      { rotationY: -26, y: 70 },
      {
        rotationY: 26,
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }

  for (const el of all("[data-rotate-in]")) {
    const guard = guardTransform(el);
    gsap.from(el, {
      rotationX: 22,
      y: 90,
      opacity: 0,
      transformPerspective: 1400,
      transformOrigin: "50% 0%",
      duration: 1.6,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onComplete: guard,
    });
    cleanups.push(guard);
  }

  for (const el of all("[data-count]")) {
    const raw = el.textContent ?? "";
    if (/[[\]]/.test(raw)) continue;
    const match = raw.match(/^(\D*?)(\d+(?:\.\d+)?)([\s\S]*)$/);
    if (!match) continue;
    const [, prefix, digits, suffix] = match;
    const target = parseFloat(digits);
    const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
    const state = { value: 0 };
    const render = () => {
      el.textContent = `${prefix}${state.value.toFixed(decimals)}${suffix}`;
    };
    render();
    gsap.to(state, {
      value: target,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: render,
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
    cleanups.push(() => {
      el.textContent = raw;
    });
  }
}

/* ------------------------------------------------- velocity-driven */

function velocityEffects(cleanups: Cleanup[]) {
  const tracker = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      velocity = self.getVelocity();
    },
  });
  const decay = () => {
    velocity *= 0.9;
  };
  gsap.ticker.add(decay);
  cleanups.push(() => {
    gsap.ticker.remove(decay);
    tracker.kill();
  });

  const skewEls = all("[data-velocity-skew]");
  if (skewEls.length > 0) {
    skewEls.forEach((el) => cleanups.push(guardTransform(el)));
    const setters = skewEls.map((el) =>
      gsap.quickTo(el, "skewY", { duration: 0.7, ease: "power3.out" }),
    );
    const skew = () => {
      const s = gsap.utils.clamp(-5, 5, velocity / -320);
      setters.forEach((set) => set(Math.abs(s) < 0.05 ? 0 : s));
    };
    gsap.ticker.add(skew);
    cleanups.push(() => gsap.ticker.remove(skew));
  }

  for (const el of all("[data-marquee]")) {
    const track = el.querySelector<HTMLElement>("[data-marquee-track]");
    if (!track) continue;
    const base = num(el.dataset.marquee, 60);
    let half = track.scrollWidth / 2;
    const ro = new ResizeObserver(() => {
      half = track.scrollWidth / 2;
    });
    ro.observe(track);

    let x = 0;
    let direction = -1;
    let boost = 1;
    let hoverDamp = 1;
    let hovering = false;
    const setX = gsap.quickSetter(track, "x", "px") as (v: number) => void;

    const tick = (_time: number, deltaMs: number) => {
      if (Math.abs(velocity) > 30) direction = velocity > 0 ? -1 : 1;
      const target = 1 + Math.min(Math.abs(velocity) / 260, 7);
      boost += (target - boost) * 0.08;
      hoverDamp += ((hovering ? 0 : 1) - hoverDamp) * 0.06;
      x += direction * base * boost * hoverDamp * (deltaMs / 1000);
      if (half > 0) x = gsap.utils.wrap(-half, 0, x);
      setX(x);
    };
    gsap.ticker.add(tick);

    const pause = el.hasAttribute("data-marquee-pause");
    const enter = () => {
      hovering = true;
    };
    const leave = () => {
      hovering = false;
    };
    if (pause) {
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
    }

    cleanups.push(() => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      if (pause) {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      }
      gsap.set(track, { clearProps: "transform" });
    });
  }
}

/* -------------------------------------------------- desktop layouts */

function desktopLayouts(): Cleanup {
  const off: Cleanup[] = [];

  for (const section of all("[data-pin-horizontal]")) {
    const track = section.querySelector<HTMLElement>("[data-pin-track]");
    if (!track) continue;

    const distance = () => {
      const left =
        track.getBoundingClientRect().left - Number(gsap.getProperty(track, "x"));
      return Math.max(
        0,
        track.scrollWidth + left * 2 - document.documentElement.clientWidth,
      );
    };

    const travel = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // Tabbing to a card that is off to the side must bring it into view by
    // scrolling the page to the matching point, not by shifting the clipped
    // section sideways.
    const onFocusIn = (e: FocusEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-pin-track] > *",
      );
      const st = travel.scrollTrigger;
      const total = distance();
      if (!card || !st || total <= 0) return;
      section.scrollLeft = 0;
      const gutter = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const want = gsap.utils.clamp(0, total, card.offsetLeft - gutter);
      const y = st.start + (want / total) * (st.end - st.start);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { duration: 1, force: true });
      else window.scrollTo({ top: y, behavior: "smooth" });
    };
    const keepLeft = () => {
      if (section.scrollLeft !== 0) section.scrollLeft = 0;
    };
    track.addEventListener("focusin", onFocusIn);
    section.addEventListener("scroll", keepLeft);
    off.push(() => {
      track.removeEventListener("focusin", onFocusIn);
      section.removeEventListener("scroll", keepLeft);
    });

    const bar = section.querySelector<HTMLElement>("[data-pin-progress]");
    if (bar) {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }

    for (const card of Array.from(track.children) as HTMLElement[]) {
      gsap.fromTo(
        card,
        { rotationY: -26, z: -160, opacity: 0.4 },
        {
          rotationY: 0,
          z: 0,
          opacity: 1,
          ease: "none",
          transformPerspective: 1400,
          transformOrigin: "0% 50%",
          scrollTrigger: {
            trigger: card,
            containerAnimation: travel,
            start: "left 100%",
            end: "left 52%",
            scrub: true,
          },
        },
      );
    }
  }

  for (const list of all("[data-stack]")) {
    const cards = Array.from(list.children) as HTMLElement[];
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      // Scale the covered card back and dim it with an overlay — never with
      // opacity, or the card underneath would show through it.
      const trigger = {
        trigger: next,
        start: "top bottom",
        end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`,
        scrub: true,
        invalidateOnRefresh: true,
      };
      gsap.to(card, {
        scale: 0.92,
        rotationX: -4,
        transformPerspective: 1400,
        transformOrigin: "50% 0%",
        ease: "none",
        scrollTrigger: trigger,
      });
      const shade = card.querySelector<HTMLElement>("[data-stack-shade]");
      if (shade) {
        gsap.to(shade, { opacity: 0.16, ease: "none", scrollTrigger: trigger });
      }
    });
  }

  return () => off.reverse().forEach((c) => c());
}

/* ------------------------------------------------------------ pointer */

function pointerEffects(): Cleanup {
  const local: Cleanup[] = [];

  for (const el of all("[data-tilt]")) {
    const max = num(el.dataset.tilt, 7);
    const glare = document.createElement("span");
    glare.className = "tilt-glare";
    glare.setAttribute("aria-hidden", "true");
    el.appendChild(glare);
    local.push(guardTransform(el));
    gsap.set(el, { transformPerspective: 1100 });

    const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * max * 2);
      rx(-py * max * 2);
      glare.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
      glare.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
    };
    const enter = () => glare.classList.add("is-on");
    const leave = () => {
      rx(0);
      ry(0);
      glare.classList.remove("is-on");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    local.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      glare.remove();
      gsap.set(el, { clearProps: "transform" });
    });
  }

  for (const el of all("[data-magnetic]")) {
    const strength = num(el.dataset.magnetic, 0.3);
    local.push(guardTransform(el));
    const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.45)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.45)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - Number(gsap.getProperty(el, "x"));
      const cy = r.top + r.height / 2 - Number(gsap.getProperty(el, "y"));
      xTo((e.clientX - cx) * strength);
      yTo((e.clientY - cy) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    local.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { clearProps: "transform" });
    });
  }

  return () => local.reverse().forEach((c) => c());
}

/* ---------------------------------------------------------- component */

export function MotionOrchestrator() {
  const pathname = usePathname();

  // The pinned services rail needs its horizontal layout switched on whenever
  // the screen is wide and motion is allowed. Tied to the viewport rather than
  // the route, so it is already in place when the home page mounts.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () =>
      document.documentElement.classList.toggle("pin-on", wide.matches && !calm.matches);
    sync();
    wide.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  // Before paint on every route: re-arm the CSS pre-hide so the new page's
  // animated elements don't flash before GSAP takes them over.
  useLayoutEffect(() => {
    if (!prefersReducedMotion()) {
      document.documentElement.classList.remove("motion-ready");
    }
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    if (prefersReducedMotion()) {
      html.classList.add("motion-ready");
      return;
    }

    ScrollTrigger.config({ ignoreMobileResize: true });

    const cleanups: Cleanup[] = [];
    let ctx: gsap.Context | undefined;
    let mm: gsap.MatchMedia | undefined;
    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      try {
        ctx = gsap.context(() => {
          splitText(cleanups);
          blocks(cleanups);
          velocityEffects(cleanups);
        });
        mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => desktopLayouts());
        mm.add("(hover: hover) and (pointer: fine)", () => pointerEffects());
      } catch (err) {
        console.error("[motion]", err);
      } finally {
        html.classList.add("motion-ready");
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }
    };

    // Two frames: let the new route's DOM settle before measuring it.
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(init);
    });

    // Late layout shifts (web fonts, images) move every trigger.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(() => {
      if (!cancelled) refresh();
    });
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      cleanups.reverse().forEach((c) => c());
      mm?.revert();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
