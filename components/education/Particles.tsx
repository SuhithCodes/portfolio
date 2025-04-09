"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Seeded random number generator for consistent values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export default function Particles() {
  const [particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      scale: number;
    }>
  >([]);

  // Generate particles only on client side
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      x: seededRandom(i * 1) * 100,
      y: seededRandom(i * 2) * 100,
      size: seededRandom(i * 3) * 4 + 2,
      opacity: seededRandom(i * 4) * 0.5 + 0.1,
      scale: seededRandom(i * 5) * 0.5 + 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary/10"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: particle.scale,
            opacity: particle.opacity,
          }}
          animate={{
            x: [
              `${particle.x}%`,
              `${particle.x + seededRandom(index * 6) * 20 - 10}%`,
              `${particle.x}%`,
            ],
            y: [
              `${particle.y}%`,
              `${particle.y + seededRandom(index * 7) * 20 - 10}%`,
              `${particle.y}%`,
            ],
          }}
          transition={{
            duration: 5 + seededRandom(index * 8) * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
}
