"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorVariant = "default" | "project" | "link" | "drag";

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const outerScale = useMotionValue(1);
  const outerScaleSpring = useSpring(outerScale, { damping: 25, stiffness: 200 });

  const labelRef = useRef<HTMLDivElement>(null);

  const getLabel = useCallback(() => {
    switch (variant) {
      case "project": return "VIEW";
      case "link": return "";
      case "drag": return "DRAG";
      default: return "";
    }
  }, [variant]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (labelRef.current) {
        labelRef.current.style.left = `${e.clientX}px`;
        labelRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest("a") || target.closest("button");
      const isProject = target.closest("[data-cursor='project']");
      const isDrag = target.closest("[data-cursor='drag']");

      if (isProject) {
        setVariant("project");
        outerScale.set(3);
      } else if (isDrag) {
        setVariant("drag");
        outerScale.set(2.5);
      } else if (isLink) {
        setVariant("link");
        outerScale.set(1.8);
      } else {
        setVariant("default");
        outerScale.set(1);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, outerScale]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x, y, scale: outerScaleSpring }}
      >
        <div className="w-4 h-4 rounded-full border border-[var(--color-text)] transition-colors duration-300" />
      </motion.div>

      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ opacity: variant !== "default" ? 1 : 0 }}
      >
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--color-text)] whitespace-nowrap ml-5 mt-4 block">
          {getLabel()}
        </span>
      </div>
    </>
  );
}
