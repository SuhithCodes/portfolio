"use client";

import React from "react";
import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SkillCategories } from "@/components/skills";
import skillsData from "@/data/skills.json";
import { cn } from "@/lib/utils";

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="relative py-20 bg-background">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      <div className="container mx-auto px-8 lg:px-8">
        <main>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              {skillsData.sectionTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {skillsData.sectionDescription}
            </p>
          </motion.div>

          {/* Skill Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Skill Categories
            </h2>
            <SkillCategories skills={skillsData.skills} />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {skillsData.stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-lg text-center",
                  "bg-gradient-to-b",
                  stat.color
                )}
              >
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
