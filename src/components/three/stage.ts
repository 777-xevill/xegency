import type {
  BufferGeometry,
  Material,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

/* ============================================================================
   STAGE
   ----------------------------------------------------------------------------
   The small amount of plumbing every WebGL scene on the site shares: a
   transparent canvas inside a host element, a camera that follows the host's
   size, a render loop that only runs while the host is on screen and the tab
   is visible, and one dispose() that releases everything (StrictMode safe).

   three.js itself is imported here, lazily, so none of it lands in the
   initial bundle. Scenes build their own content on top of the stage.
   ========================================================================== */

export type ThreeNS = typeof import("three");

export type Stage = {
  THREE: ThreeNS;
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  canvas: HTMLCanvasElement;
  /** True while the host is on screen and the tab is visible. */
  isActive(): boolean;
  /** Runs once now, then again whenever the host's box changes. */
  onResize(cb: (width: number, height: number) => void): void;
  /** Runs every frame while active. `t` = seconds since creation. */
  onFrame(cb: (t: number, dt: number) => void): void;
  /** Extra teardown for things the scene owns (render targets, listeners). */
  onDispose(cb: () => void): void;
  /** Draw one frame now, whether or not the host is visible. */
  renderOnce(): void;
  dispose(): void;
};

type StageOptions = {
  /** Run the render loop. False = still image via renderOnce(). */
  animate?: boolean;
  maxPixelRatio?: number;
  fov?: number;
};

export async function createStage(
  host: HTMLElement,
  { animate = true, maxPixelRatio = 1.75, fov = 35 }: StageOptions = {},
): Promise<Stage | null> {
  const THREE = await import("three");

  let renderer: WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null; // no WebGL — callers fall back to something static
  }

  const small = window.innerWidth < 768;
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, small ? 1.1 : maxPixelRatio),
  );
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;

  const canvas = renderer.domElement;
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.4s cubic-bezier(0.16,1,0.3,1)";
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 80);

  const resizeCbs: ((w: number, h: number) => void)[] = [];
  const frameCbs: ((t: number, dt: number) => void)[] = [];
  const disposers: (() => void)[] = [];
  const size = { w: 1, h: 1 };

  const measure = () => {
    size.w = Math.max(1, host.clientWidth);
    size.h = Math.max(1, host.clientHeight);
    renderer.setSize(size.w, size.h, false);
    camera.aspect = size.w / size.h;
    camera.updateProjectionMatrix();
    for (const cb of resizeCbs) cb(size.w, size.h);
  };
  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(host);

  let onScreen = true;
  const io = new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
    },
    { threshold: 0 },
  );
  io.observe(host);

  const isActive = () => onScreen && !document.hidden;

  const start = performance.now();
  let last = 0;
  let raf = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!isActive()) {
      last = now;
      return;
    }
    const dt = Math.min((now - (last || now)) / 1000, 0.05);
    last = now;
    const t = (now - start) / 1000;
    for (const cb of frameCbs) cb(t, dt);
    renderer.render(scene, camera);
  };
  if (animate) raf = requestAnimationFrame(frame);

  let disposed = false;

  return {
    THREE,
    renderer,
    scene,
    camera,
    canvas,
    isActive,
    onResize(cb) {
      resizeCbs.push(cb);
      cb(size.w, size.h);
    },
    onFrame(cb) {
      frameCbs.push(cb);
    },
    onDispose(cb) {
      disposers.push(cb);
    },
    renderOnce() {
      const t = (performance.now() - start) / 1000;
      for (const cb of frameCbs) cb(t, 0.016);
      renderer.render(scene, camera);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      for (const cb of disposers) {
        try {
          cb();
        } catch {
          /* teardown must never throw */
        }
      }
      const seen = new Set<unknown>();
      scene.traverse((object) => {
        const item = object as Mesh;
        const geometry = item.geometry as BufferGeometry | undefined;
        if (geometry && !seen.has(geometry)) {
          seen.add(geometry);
          geometry.dispose();
        }
        const material = item.material as Material | Material[] | undefined;
        for (const m of Array.isArray(material) ? material : material ? [material] : []) {
          if (!seen.has(m)) {
            seen.add(m);
            m.dispose();
          }
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}

/**
 * Resolves once `el` is within `rootMargin` of the viewport, so scenes far
 * down the page don't spend GPU memory until they are about to be seen.
 * Returns a cancel function.
 */
export function whenNear(
  el: Element,
  run: () => void,
  rootMargin = "100% 0px",
): () => void {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        io.disconnect();
        run();
      }
    },
    { rootMargin },
  );
  io.observe(el);
  return () => io.disconnect();
}
