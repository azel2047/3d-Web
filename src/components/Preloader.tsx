"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ isLoading }: { isLoading: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) return 100;
        const step = Math.random() * 12 + 3;
        return Math.min(100, Math.round(prev + step));
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[var(--color-bg)] flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-10">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              Initializing
            </div>

            <div className="relative">
              <span className="font-display text-[80px] md:text-[120px] font-bold leading-none tabular-nums text-[var(--color-text)]">
                {String(count).padStart(3, "0")}
              </span>
            </div>

            <div className="w-48 h-[1px] bg-[var(--color-border)] relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--color-text)]"
                style={{ width: `${count}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
