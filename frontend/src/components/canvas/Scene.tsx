"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

/**
 * Continuous 3D Camera & Scene Choreography
 * Calculates exact camera coordinates and lookAt targets along the scroll journey.
 */
interface SceneChoreographyKeyframe {
  progress: number;
  camPos: [number, number, number];
  camLook: [number, number, number];
}

const CHOREOGRAPHY_KEYFRAMES: SceneChoreographyKeyframe[] = [
  // 1. Hero: Character strides forward into view in front of giant red typography
  {
    progress: 0.0,
    camPos: [0.0, -0.15, 4.1],
    camLook: [0.0, -0.45, 0.0],
  },
  // 2. About: Camera glides left, framing profile with orbital neon loop
  {
    progress: 0.20,
    camPos: [-1.8, -0.35, 4.3],
    camLook: [0.4, -0.45, 0.0],
  },
  // 3. Projects: Elevated panoramic view overlooking circular system amphitheater
  {
    progress: 0.42,
    camPos: [0.0, -1.2, 5.2],
    camLook: [0.0, -0.8, 0.0],
  },
  // 4. Experience: Camera rotates, warm amber lighting accents timeline journey
  {
    progress: 0.64,
    camPos: [1.7, -0.75, 4.4],
    camLook: [-0.35, -0.65, 0.0],
  },
  // 5. Achievements: Focused dramatic perspective
  {
    progress: 0.82,
    camPos: [-1.2, -1.0, 4.4],
    camLook: [0.25, -0.7, 0.0],
  },
  // 6. Contact: Intimate dramatic convergence in front of diagonal contrast
  {
    progress: 1.0,
    camPos: [0.0, -1.35, 3.6],
    camLook: [0.0, -0.75, 0.0],
  },
];

function getChoreographedState(progress: number) {
  const p = Math.max(0, Math.min(1, progress));

  let idx = 0;
  for (let i = 0; i < CHOREOGRAPHY_KEYFRAMES.length - 1; i++) {
    if (p >= CHOREOGRAPHY_KEYFRAMES[i].progress && p <= CHOREOGRAPHY_KEYFRAMES[i + 1].progress) {
      idx = i;
      break;
    }
  }

  const k0 = CHOREOGRAPHY_KEYFRAMES[idx];
  const k1 = CHOREOGRAPHY_KEYFRAMES[idx + 1] || k0;

  const range = k1.progress - k0.progress;
  const rawT = range > 0 ? (p - k0.progress) / range : 0;
  // Cubic Hermite smoothstep for zero-jerk transitions
  const t = rawT * rawT * (3 - 2 * rawT);

  const camPos = new THREE.Vector3(
    THREE.MathUtils.lerp(k0.camPos[0], k1.camPos[0], t),
    THREE.MathUtils.lerp(k0.camPos[1], k1.camPos[1], t),
    THREE.MathUtils.lerp(k0.camPos[2], k1.camPos[2], t)
  );

  const camLook = new THREE.Vector3(
    THREE.MathUtils.lerp(k0.camLook[0], k1.camLook[0], t),
    THREE.MathUtils.lerp(k0.camLook[1], k1.camLook[1], t),
    THREE.MathUtils.lerp(k0.camLook[2], k1.camLook[2], t)
  );

  return { camPos, camLook };
}

// Walking cutout character has been upgraded to Rishabh's authentic full-body portrait cutout
// rendered directly in Hero with synchronized walking cadence, parallax, and depth choreography.


/**
 * Reflective Circular Stage Floor with Concentric Glowing Rings (Reference Frames 3, 4, 5, 6)
 */
function ConcentricStageFloor() {
  const floorRef = useRef<THREE.Group>(null);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  useFrame((state, delta) => {
    if (!floorRef.current) return;
    floorRef.current.rotation.z += delta * 0.025;

    // React to scroll: subtle vertical elevation
    const targetY = -1.62 + scrollProgress * 0.2;
    floorRef.current.position.y = THREE.MathUtils.lerp(floorRef.current.position.y, targetY, 0.05);
  });

  return (
    <group ref={floorRef} position={[0, -1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* Dark reflective stage disc */}
      <mesh>
        <circleGeometry args={[7.0, 64]} />
        <meshStandardMaterial
          color="#040406"
          roughness={0.12}
          metalness={0.94}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Ring 1 — Inner Crimson Core Ring */}
      <mesh>
        <ringGeometry args={[1.9, 1.93, 64]} />
        <meshBasicMaterial color="#dc2626" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Ring 2 — Warm Amber Middle Ring */}
      <mesh>
        <ringGeometry args={[3.15, 3.175, 64]} />
        <meshBasicMaterial color="#d97706" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>

      {/* Ring 3 — Outer Crimson Horizon Ring */}
      <mesh>
        <ringGeometry args={[4.4, 4.42, 64]} />
        <meshBasicMaterial color="#dc2626" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* Ring 4 — Perimeter Silver Ring */}
      <mesh>
        <ringGeometry args={[5.8, 5.815, 64]} />
        <meshBasicMaterial color="#e5e7eb" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * 3D Glowing Red Neon Light Ribbon / Loop (Reference Frames 3 & 4)
 * Loops dynamically around the stage space behind the walking character.
 */
function NeonLightRibbon() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  const curve = useMemo(() => {
    // Elegant sweeping orbital ribbon positioned behind the subject (z <= -1.0)
    const points = [
      new THREE.Vector3(-3.8, 0.2, -1.8),
      new THREE.Vector3(-2.2, 1.5, -1.3),
      new THREE.Vector3(0.0, 1.9, -1.6),
      new THREE.Vector3(2.2, 1.5, -1.3),
      new THREE.Vector3(3.8, 0.0, -1.8),
      new THREE.Vector3(2.2, -1.0, -1.5),
      new THREE.Vector3(-2.2, -1.0, -1.5),
      new THREE.Vector3(-3.8, 0.2, -1.8),
    ];
    return new THREE.CatmullRomCurve3(points, true);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.05;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.04;

    // Visibility peaks during About (0.15 - 0.40) and Projects
    const p = scrollProgress;
    let targetOpacity = 0.25;
    if (p >= 0.15 && p <= 0.6) {
      targetOpacity = 0.75;
    } else if (p < 0.15) {
      targetOpacity = 0.22;
    }

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (mat) {
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.05);
    }
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 80, 0.035, 12, true]} />
      <meshStandardMaterial
        color="#ef4444"
        emissive="#dc2626"
        emissiveIntensity={2.5}
        transparent
        opacity={0.4}
        toneMapped={false}
      />
    </mesh>
  );
}

/**
 * Floating 3D Tech Nodes in Arena (Reference Frames 3 & 4)
 */
function FloatingTechNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return [
      { pos: [-2.6, 0.6, -0.8] as [number, number, number], color: "#dc2626", size: 0.18 },
      { pos: [2.5, 0.8, -0.5] as [number, number, number], color: "#d97706", size: 0.2 },
      { pos: [-2.0, -0.4, 1.0] as [number, number, number], color: "#ef4444", size: 0.16 },
      { pos: [2.2, -0.5, 0.9] as [number, number, number], color: "#d97706", size: 0.17 },
      { pos: [0.3, 1.6, -1.2] as [number, number, number], color: "#ffffff", size: 0.15 },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <octahedronGeometry args={[node.size, 0]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={1.5}
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Vertical Spotlight Laser Beam (Reference Frame 6)
 */
function VerticalLaserBeam() {
  const beamRef = useRef<THREE.Mesh>(null);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  useFrame(() => {
    if (!beamRef.current) return;
    const p = scrollProgress;
    // Active strictly during Projects section (0.38 - 0.58)
    const isProjectSection = p >= 0.35 && p <= 0.60;
    const targetIntensity = isProjectSection ? 0.75 : 0.0;

    const mat = beamRef.current.material as THREE.MeshBasicMaterial;
    if (mat) {
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetIntensity, 0.08);
      beamRef.current.visible = mat.opacity > 0.01;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, 2.5, -1.8]} visible={false}>
      <cylinderGeometry args={[0.04, 0.45, 9, 16]} />
      <meshBasicMaterial
        color="#dc2626"
        transparent
        opacity={0.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * 3D Atmospheric Dust & Embers Nebula
 */
function ParticleNebula({ count = 260 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const crimson = new THREE.Color("#dc2626");
    const amber = new THREE.Color("#d97706");
    const metallic = new THREE.Color("#d1d5db");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const pick = Math.random();
      const chosen = pick < 0.44 ? crimson : pick < 0.78 ? amber : metallic;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.03;

    // Vertical parallax reacting to continuous scroll
    const targetY = scrollProgress * 5.0;
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      targetY,
      0.04
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.72}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Camera Rig interpolating smoothly to scroll choreography + pointer parallax
 */
function CameraRig() {
  const { camera, pointer } = useThree();
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const { camPos: targetPos, camLook: targetLook } = getChoreographedState(scrollProgress);

    // Subtle pointer parallax
    const parallaxX = pointer.x * 0.35;
    const parallaxY = pointer.y * 0.28;

    const desiredX = targetPos.x + parallaxX;
    const desiredY = targetPos.y + parallaxY;
    const desiredZ = targetPos.z;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredY, 0.045);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, 0.045);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, targetLook.x, 0.045);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, targetLook.y, 0.045);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, targetLook.z, 0.045);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}

/**
 * Dynamic Atmospheric Dual Rim Lighting
 */
function CinematicLighting() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const crimsonLightRef = useRef<THREE.PointLight>(null);
  const amberLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const p = Math.max(0, Math.min(1, scrollProgress));

    const targetCrimson =
      p < 0.5
        ? THREE.MathUtils.lerp(1.8, 2.3, p * 2)
        : THREE.MathUtils.lerp(2.3, 2.7, (p - 0.5) * 2);

    const targetAmber =
      p < 0.5
        ? THREE.MathUtils.lerp(1.4, 2.4, p * 2)
        : THREE.MathUtils.lerp(2.4, 1.8, (p - 0.5) * 2);

    if (crimsonLightRef.current) {
      crimsonLightRef.current.intensity = THREE.MathUtils.lerp(
        crimsonLightRef.current.intensity,
        targetCrimson,
        0.05
      );
    }
    if (amberLightRef.current) {
      amberLightRef.current.intensity = THREE.MathUtils.lerp(
        amberLightRef.current.intensity,
        targetAmber,
        0.05
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight position={[6, 8, 6]} intensity={0.65} color="#ffffff" />
      <pointLight
        ref={crimsonLightRef}
        position={[-5, 2.5, 2]}
        intensity={1.9}
        color="#dc2626"
        distance={16}
      />
      <pointLight
        ref={amberLightRef}
        position={[5, -2, 1.5]}
        intensity={1.6}
        color="#d97706"
        distance={16}
      />
    </>
  );
}

/**
 * Main 3D Canvas Scene
 */
export default function Scene() {
  const setIsCanvasReady = usePortfolioStore((s) => s.setIsCanvasReady);
  const [canRender, setCanRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!prefersReducedMotion) {
        setCanRender(true);
      }
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  if (!canRender) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden opacity-95 transition-opacity duration-1000"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0.0, -0.25, 4.2], fov: 48 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={() => setIsCanvasReady(true)}
      >
        <CinematicLighting />
        <ConcentricStageFloor />
        <NeonLightRibbon />
        <FloatingTechNodes />
        <VerticalLaserBeam />
        <ParticleNebula count={isMobile ? 85 : 240} />
        <CameraRig />
      </Canvas>
    </div>
  );
}
