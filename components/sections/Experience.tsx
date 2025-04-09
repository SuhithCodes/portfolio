"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExperienceTimeline } from "@/components/experience";
import experienceData from "@/data/experience.json";

export default function ExperienceSection() {
  return (
    <div className="flex min-h-screen bg-background relative">
      {/* Main Content */}
      <div className="flex-1 relative w-full">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        </div>

        <main className="relative py-8 px-3 md:px-4 max-w-5xl mx-auto min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-primary">Professional</span>{" "}
              <span className="text-secondary">Experience</span>
            </h1>
            <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
            <p className="mt-2 text-xs text-muted-foreground max-w-xl mx-auto">
              {experienceData.sectionInfo.description}
            </p>
          </motion.div>

          <ExperienceTimeline jobs={experienceData.jobs} />
        </main>
      </div>
    </div>
  );
}
