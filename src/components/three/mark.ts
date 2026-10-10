import type { Group, Mesh } from "three";
import type { Stage } from "./stage";

/* ============================================================================
   THE MARK, IN 3D
   ----------------------------------------------------------------------------
   Three porcelain slabs and one hollow metal frame on a 45° grid — the 2D logo
   (src/lib/logo-geometry.ts) rebuilt with depth. Shared by the hero and the
   footer so both read as the same object.
   ========================================================================== */

// Distance from the grid centre to each square's centre, in square sides.
const O = 28.5 / 43;

export type PieceDef = {
  key: "a" | "b" | "c" | "frame";
  x: number;
  y: number;
  /** Scattered start rotation (rad). */
  spin: [number, number, number];
};

// Assembly order: the three solids first, the frame lands last.
export const PIECES: PieceDef[] = [
  { key: "a", x: O, y: O, spin: [0.9, -1.1, 1.4] },
  { key: "b", x: O, y: -O, spin: [-1.2, 0.8, -1.0] },
  { key: "c", x: -O, y: -O, spin: [1.1, 1.3, 0.7] },
  { key: "frame", x: -O, y: O, spin: [-0.8, -1.2, 2.2] },
];

export type MarkPiece = {
  def: PieceDef;
  mesh: Mesh;
  /** Unit vector along the piece's diagonal, used to scatter and explode. */
  dirX: number;
  dirY: number;
  /** 0 = scattered, 1 = assembled. */
  intro: number;
  phase: number;
};

export type MarkDeps = Awaited<ReturnType<typeof loadMarkDeps>>;

export async function loadMarkDeps() {
  const [{ RoomEnvironment }, { RoundedBoxGeometry }] = await Promise.all([
    import("three/addons/environments/RoomEnvironment.js"),
    import("three/addons/geometries/RoundedBoxGeometry.js"),
  ]);
  return { RoomEnvironment, RoundedBoxGeometry };
}

/** Soft studio reflections, a warm key light and a cool stone rim. */
export function studioLighting(stage: Stage, deps: MarkDeps) {
  const { THREE, renderer, scene } = stage;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new deps.RoomEnvironment();
  const envTarget = pmrem.fromScene(room, 0.04);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.6;
  stage.onDispose(() => {
    envTarget.dispose();
    pmrem.dispose();
    room.dispose();
  });

  const key = new THREE.DirectionalLight(0xffe9cf, 1.7);
  key.position.set(3.5, 4.5, 6);
  const rim = new THREE.DirectionalLight(0xa59b8f, 3.2);
  rim.position.set(-5, 2, -4);
  scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.15));

  return { key, rim };
}

export function buildMark(
  stage: Stage,
  deps: MarkDeps,
  assembled: boolean,
): { mark: Group; pieces: MarkPiece[] } {
  const { THREE } = stage;

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

  const slabDepth = 0.24;
  const slab = new deps.RoundedBoxGeometry(1, 1, slabDepth, 5, 0.06);

  // Hollow frame: outer 1 × 1, bar thickness 9/43 like the 2D mark.
  const bevel = 0.02;
  const outerHalf = 0.5 - bevel;
  const holeHalf = 0.29 + bevel;
  const shape = new THREE.Shape();
  shape.moveTo(-outerHalf, -outerHalf);
  shape.lineTo(outerHalf, -outerHalf);
  shape.lineTo(outerHalf, outerHalf);
  shape.lineTo(-outerHalf, outerHalf);
  shape.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-holeHalf, -holeHalf);
  hole.lineTo(-holeHalf, holeHalf);
  hole.lineTo(holeHalf, holeHalf);
  hole.lineTo(holeHalf, -holeHalf);
  hole.closePath();
  shape.holes.push(hole);
  const frame = new THREE.ExtrudeGeometry(shape, {
    depth: slabDepth - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 4,
  });
  frame.translate(0, 0, -(slabDepth - bevel * 2) / 2);

  const mark = new THREE.Group();
  // Same quarter-turn as the 2D mark: the hollow piece ends up on top.
  mark.rotation.z = -Math.PI / 4;

  const pieces: MarkPiece[] = PIECES.map((def, i) => {
    const isFrame = def.key === "frame";
    const mesh = new THREE.Mesh(isFrame ? frame : slab, isFrame ? metal : porcelain);
    mark.add(mesh);
    const len = Math.hypot(def.x, def.y);
    return {
      def,
      mesh,
      dirX: def.x / len,
      dirY: def.y / len,
      intro: assembled ? 1 : 0,
      phase: i * 1.7,
    };
  });

  return { mark, pieces };
}

/**
 * Places every piece for the current moment.
 * `explode` (0–1) pushes pieces out along their diagonals and towards the
 * camera; each piece's own `intro` pulls it in from the scattered state.
 */
export function poseMark(pieces: MarkPiece[], t: number, explode: number) {
  for (const p of pieces) {
    const isFrame = p.def.key === "frame";
    const away = (1 - p.intro) * 2.8 + explode * 1.15;
    const wobble = Math.sin(t * 0.9 + p.phase) * 0.045 * p.intro;
    p.mesh.position.set(
      p.def.x + p.dirX * away,
      p.def.y + p.dirY * away,
      (1 - p.intro) * 2.2 + explode * 0.95 + wobble,
    );
    const unrest = 1 - p.intro;
    p.mesh.rotation.set(
      p.def.spin[0] * unrest + (isFrame ? 0 : explode * 0.5),
      p.def.spin[1] * unrest,
      p.def.spin[2] * unrest + (isFrame ? explode * Math.PI : 0),
    );
  }
}
