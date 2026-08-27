"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const capabilities = [
  "Creative Development",
  "WebGL / Three.js",
  "Interaction Design",
  "Frontend Architecture",
  "Motion Design",
  "Generative Art",
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section id="about" className="section-gap">
      <div className="container-wide">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-[1px] w-8 bg-[var(--color-accent)]" />
              <span className="text-meta text-[var(--color-accent)]">About</span>
            </motion.div>

            <div className="space-y-1">
              {["I build", "digital experiences", "where design meets", "technology."].map(
                (line, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={isInView ? { y: 0 } : {}}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + i * 0.1,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                    >
                      <span
                        className={`font-display text-[clamp(32px,5vw,64px)] font-bold tracking-[-0.03em] leading-[1.1] block ${
                          i === 1 || i === 3
                            ? "text-[var(--color-text-secondary)]"
                            : ""
                        }`}
                      >
                        {line}
                      </span>
                    </motion.div>
                  </div>
                )
              )}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 text-[15px] text-[var(--color-text-muted)] leading-[1.8] max-w-[440px]"
            >
              From generative art installations to immersive web platforms,
              I craft digital realities that blur the line between the physical
              and the virtual. Every project is an opportunity to push boundaries.
            </motion.p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="mb-8">
                <span className="text-meta text-[var(--color-text-muted)] block mb-5">
                  Capabilities
                </span>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="text-[13px] text-[var(--color-text-secondary)] tracking-[0.02em]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div ref={statsRef} className="mt-24 md:mt-32 border-t border-[var(--color-border)] pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Projects" },
              { number: "8+", label: "Years" },
              { number: "30+", label: "Clients" },
              { number: "∞", label: "Curiosity" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="font-display text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.02em] mb-1">
                  {stat.number}
                </div>
                <div className="text-meta text-[var(--color-text-muted)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
