"use client";

import { motion } from "framer-motion";

export function CoffeeSteam() {
  return (
    <div className="pointer-events-none absolute bottom-[30%] left-1/2 flex -translate-x-1/2 gap-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-12 w-1.5 rounded-full bg-white/20"
          animate={{
            y: [-10, -50],
            opacity: [0, 0.5, 0],
            scaleX: [1, 1.3, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function FloatingElements() {
  const elements = [
    { size: 80, top: "15%", left: "10%", delay: 0 },
    { size: 60, top: "60%", left: "85%", delay: 1 },
    { size: 40, top: "75%", left: "15%", delay: 2 },
    { size: 50, top: "25%", left: "80%", delay: 0.5 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-secondary/10"
          style={{
            width: el.size,
            height: el.size,
            top: el.top,
            left: el.left,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
