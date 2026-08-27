"use client";

import { useRef, useMemo, useCallback, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";

function InteractiveShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
        0.05
      );
    }
  });

  const handlePointerMove = useCallback((e: { point: THREE.Vector3 }) => {
    mouseRef.current.x = e.point.x * 0.5 + 0.5;
    mouseRef.current.y = e.point.y * 0.5 + 0.5;
  }, []);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    
    void main() {
      vec2 uv = vUv;
      float d = length(uv - uMouse);
      float wave = sin(d * 20.0 - uTime * 2.0) * 0.5 + 0.5;
      wave *= smoothstep(0.5, 0.0, d);
      
      vec3 col1 = vec3(0.78, 1.0, 0.0);
      vec3 col2 = vec3(0.0, 0.0, 0.0);
      vec3 color = mix(col2, col1, wave * 0.6);
      
      float alpha = smoothstep(0.6, 0.0, d) * 0.8;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove} position={[0, 0, 0]}>
      <planeGeometry args={[4, 3, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

function ExperimentScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <InteractiveShader />
    </>
  );
}

function InteractiveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] bg-[var(--color-bg-elevated)] overflow-hidden cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="drag"
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ExperimentScene />
      </Canvas>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
          Move cursor to interact
        </span>
        <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--color-text-muted)]">
          {isHovered ? "● LIVE" : "○ IDLE"}
        </span>
      </div>
    </div>
  );
}

const experiments = [
  {
    id: 1,
    title: "Noise Fields",
    description: "Procedural noise terrain with real-time deformation",
    tag: "WebGL",
  },
  {
    id: 2,
    title: "Particle Cosmos",
    description: "Gravitational particle simulation in real-time",
    tag: "Three.js",
  },
  {
    id: 3,
    title: "Audio Reactive",
    description: "Visualizations responding to microphone input",
    tag: "Web Audio",
  },
];

export default function Experiments() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="experiments" className="section-gap">
      <div className="container-wide">
        <div ref={headerRef} className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-8 bg-[var(--color-accent)]" />
            <span className="text-meta text-[var(--color-accent)]">Lab</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.03em] leading-[1.05]"
          >
            Creative <span className="text-stroke">Experiments</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8">
            <InteractiveCanvas />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            {experiments.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)] transition-colors duration-500 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--color-text-muted)]">
                    {String(exp.id).padStart(2, "0")}
                  </span>
                  <span className="text-meta text-[var(--color-accent)]">
                    {exp.tag}
                  </span>
                </div>
                <h4 className="font-display text-lg font-semibold mb-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  {exp.title}
                </h4>
                <p className="text-[13px] text-[var(--color-text-muted)] leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
