"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  id: number;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  accent: string;
  canvasType: "topology" | "waves" | "circles" | "mesh";
}

const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "OSCAR",
    category: "Digital Platform",
    year: "2025",
    description:
      "Competition management platform with real-time data visualization and immersive digital presence.",
    accent: "#00e5a0",
    canvasType: "topology",
  },
  {
    id: 2,
    number: "02",
    title: "HIMATI",
    category: "Brand Identity",
    year: "2025",
    description:
      "Digital identity system featuring architectural composition and editorial typography.",
    accent: "#808080",
    canvasType: "mesh",
  },
  {
    id: 3,
    number: "03",
    title: "PRISM",
    category: "Creative Tool",
    year: "2024",
    description:
      "Browser-based photo editor with professional color grading and cinematic presets.",
    accent: "#ff6b6b",
    canvasType: "circles",
  },
  {
    id: 4,
    number: "04",
    title: "NEXUS",
    category: "Web Experience",
    year: "2024",
    description:
      "Interactive experience exploring boundaries between physical and digital space.",
    accent: "#c8a0ff",
    canvasType: "waves",
  },
];

function ProjectCanvas({ canvasType, accent }: { canvasType: string; accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);
    };
    resize();

    const draw = () => {
      time += 0.003;
      const w = canvas.width / 2;
      const h = canvas.height / 2;
      ctx.clearRect(0, 0, w, h);

      if (canvasType === "topology") {
        drawTopology(ctx, w, h, accent, time);
      } else if (canvasType === "waves") {
        drawWaves(ctx, w, h, accent, time);
      } else if (canvasType === "circles") {
        drawCircles(ctx, w, h, accent, time);
      } else {
        drawMeshGrid(ctx, w, h, accent, time);
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationId);
  }, [canvasType, accent]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function drawTopology(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, t: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 25; i++) {
    ctx.globalAlpha = 0.08 + Math.sin(t + i * 0.3) * 0.04;
    ctx.beginPath();
    for (let x = 0; x < w; x += 3) {
      const y = h * 0.5
        + Math.sin(x * 0.008 + t + i * 0.4) * (30 + i * 4)
        + Math.cos(x * 0.004 + t * 0.6) * 15;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawWaves(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, t: number) {
  for (let j = 0; j < 3; j++) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.6;
    ctx.globalAlpha = 0.12 - j * 0.03;
    for (let x = 0; x < w; x += 2) {
      const y = h / 2 + Math.sin(x * 0.015 + t * 0.8 + j) * (40 + j * 15);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawCircles(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, t: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.4;
  for (let i = 0; i < 8; i++) {
    const r = 40 + i * 25 + Math.sin(t + i * 0.5) * 10;
    ctx.globalAlpha = 0.08;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawMeshGrid(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, t: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.3;
  const cols = 20;
  const rows = 14;
  const cellW = w / cols;
  const cellH = h / rows;

  for (let i = 0; i <= cols; i++) {
    ctx.globalAlpha = 0.06;
    ctx.beginPath();
    for (let j = 0; j <= rows; j++) {
      const x = i * cellW + Math.sin(j * 0.5 + t) * 4;
      const y = j * cellH + Math.cos(i * 0.5 + t * 0.7) * 4;
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    ctx.globalAlpha = 0.06;
    ctx.beginPath();
    for (let i = 0; i <= cols; i++) {
      const x = i * cellW + Math.sin(j * 0.5 + t) * 4;
      const y = j * cellH + Math.cos(i * 0.5 + t * 0.7) * 4;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${index > 0 ? "mt-24 md:mt-40" : ""}`}>
        <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.15em] text-[var(--color-text-muted)]">
                {project.number}
              </span>
              <div className="h-[1px] w-8 bg-[var(--color-border)]" />
              <span className="text-meta text-[var(--color-text-muted)]">
                {project.category}
              </span>
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-display text-[clamp(36px,5vw,72px)] font-bold tracking-[-0.03em] leading-[0.95]"
            >
              {project.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="text-[15px] text-[var(--color-text-secondary)] leading-[1.7] max-w-[380px]"
            >
              {project.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-4"
            >
              <span className="text-meta text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors cursor-pointer inline-flex items-center gap-2">
                View Project
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </motion.div>
          </div>
        </div>

        <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            data-cursor="project"
            className="relative aspect-[4/3] bg-[var(--color-bg-elevated)] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-subtle)] to-[var(--color-bg)]" />
            <ProjectCanvas canvasType={project.canvasType} accent={project.accent} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
                {project.year}
              </span>
              <span className="text-meta text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Explore →
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-gap">
      <div className="container-wide">
        <div ref={headerRef} className="mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-8 bg-[var(--color-accent)]" />
            <span className="text-meta text-[var(--color-accent)]">Selected Work</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.03em] leading-[1.05]"
          >
            Featured <span className="text-stroke">Projects</span>
          </motion.h2>
        </div>

        {projects.map((project, index) => (
          <ProjectEntry key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
