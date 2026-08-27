"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function LiquidSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.4, 64);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    meshRef.current.rotation.x = t * 0.08 + mouseRef.current.y * 0.15;
    meshRef.current.rotation.y = t * 0.05 + mouseRef.current.x * 0.15;

    const scale = 1 + Math.sin(t * 0.3) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);
  });

  const handlePointerMove = useCallback((e: { point: THREE.Vector3 }) => {
    mouseRef.current.x = e.point.x * 0.3;
    mouseRef.current.y = e.point.y * 0.3;
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerMove={handlePointerMove}
      position={[0.5, 0, 0]}
    >
      <MeshDistortMaterial
        color="#1a1a1a"
        roughness={0.15}
        metalness={0.95}
        distort={0.25}
        speed={1.5}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

function SubtleParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 600;

  useEffect(() => {
    if (!particlesRef.current) return;

    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);

    let seed = 42;
    const seededRandom = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < count; i++) {
      const theta = seededRandom() * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom() - 1);
      const r = 2.5 + seededRandom() * 3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    particlesRef.current.geometry = geo;

    return () => {
      geo.dispose();
    };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={particlesRef}>
      <pointsMaterial
        size={0.008}
        color="#ffffff"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* eslint-disable react-hooks/immutability -- R3F animation loops safely mutate camera */
function CameraRig() {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const targetX = Math.sin(t * 0.05) * 0.5;
    const targetY = Math.cos(t * 0.04) * 0.3;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.02);

    targetRef.current.set(0.5, 0, 0);
    camera.lookAt(targetRef.current);
  });

  return null;
}
/* eslint-enable react-hooks/immutability */

function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-3, 2, -5]} intensity={0.3} color="#c8ff00" />
      <pointLight position={[0, -3, 3]} intensity={0.2} color="#ffffff" />
      <LiquidSculpture />
      <SubtleParticles />
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Scene />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />

      <div className="relative z-10 h-full container-wide flex flex-col justify-end pb-20 md:pb-28">
        <div className="max-w-[700px]">
          <div className="overflow-hidden mb-4">
            <p className="text-meta text-[var(--color-text-muted)] translate-y-full animate-[translateY0_0.8s_ease-out_2.4s_forwards]">
              Creative Technology Studio
            </p>
          </div>

          <div className="overflow-hidden mb-2">
            <h1 className="font-display text-[clamp(48px,8vw,130px)] font-bold leading-[0.88] tracking-[-0.04em] translate-y-full animate-[translateY0_1s_ease-out_2.5s_forwards]">
              SENO
            </h1>
          </div>

          <div className="overflow-hidden mb-8">
            <p className="font-display text-[clamp(16px,2vw,24px)] font-normal text-[var(--color-text-secondary)] tracking-[-0.01em] translate-y-full animate-[translateY0_0.8s_ease-out_2.7s_forwards]">
              Creative Developer
            </p>
          </div>

          <div className="overflow-hidden">
            <p className="text-[15px] text-[var(--color-text-muted)] max-w-[380px] leading-[1.7] translate-y-full animate-[translateY0_0.8s_ease-out_2.9s_forwards]">
              Crafting immersive digital experiences where design meets emerging technology.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-10 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-3">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[var(--color-text-muted)]" />
          <span className="text-meta text-[var(--color-text-muted)] [writing-mode:vertical-rl]">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
