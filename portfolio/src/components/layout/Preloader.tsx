"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 12;
      if (current >= 100) {
        current = 100;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setIsDone(true), 400);
        setTimeout(() => setIsVisible(false), 1200);
      }
      setProgress(Math.min(Math.round(current), 100));
    }, 80);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isDone ? (
        <motion.div
          key="preloader"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
          className="preloader"
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-surface">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
          </div>

          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="flex items-center gap-2"
            >
              <span className="font-[var(--font-display)] text-4xl font-extrabold tracking-tight">
                PRINCE
              </span>
              <span className="font-[var(--font-display)] text-4xl font-extrabold gradient-text-static">
                KUMAR
              </span>
            </motion.div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-baseline gap-1"
            >
              <span className="font-[var(--font-heading)] text-7xl font-bold tabular-nums tracking-tighter text-text-primary">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="text-lg text-text-muted">%</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-kicker"
            >
              Loading Experience
            </motion.p>
          </div>

          {/* Bottom meta */}
          <div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between text-xs text-text-muted tracking-wider uppercase">
            <span>Portfolio 2026</span>
            <span>Creative Development</span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="preloader-exit"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="preloader"
        />
      )}
    </AnimatePresence>
  );
}
