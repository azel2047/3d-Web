"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="section-gap border-t border-[var(--color-border-subtle)]">
      <div className="container-wide" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-[1px] w-8 bg-[var(--color-accent)]" />
              <span className="text-meta text-[var(--color-accent)]">Contact</span>
            </motion.div>

            <div className="space-y-1 mb-10">
              {["Let's", "create something", "together."].map((line, i) => (
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
                      className={`font-display text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.03em] leading-[1.1] block ${
                        i === 1 ? "text-[var(--color-text-secondary)]" : ""
                      }`}
                    >
                      {line}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              href="mailto:hello@void.studio"
              className="inline-flex items-center gap-3 text-[15px] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 group"
            >
              <span>hello@void.studio</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-5 mb-12"
            >
              {[
                { label: "Location", value: "Jakarta, Indonesia" },
                { label: "Email", value: "hello@void.studio" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-4">
                  <span className="text-meta text-[var(--color-text-muted)] w-16 shrink-0">
                    {item.label}
                  </span>
                  <span className="text-[14px] text-[var(--color-text-secondary)]">
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-6"
            >
              {["GitHub", "Twitter", "LinkedIn"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-[13px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-300"
                >
                  {platform}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-24 border-t border-[var(--color-border-subtle)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <span className="font-display text-[13px] font-semibold tracking-[0.1em] uppercase text-[var(--color-text-muted)]">
            VOID
          </span>
          <p className="font-mono text-[11px] text-[var(--color-text-muted)] tracking-[0.05em]">
            © {currentYear} All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
