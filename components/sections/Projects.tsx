"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import projectsJson from "@/data/projects.json";

interface Project {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  keyFeatures: string[];
  categories: string[];
}

interface ProjectsData {
  sectionInfo: {
    title: string;
    description: string;
  };
  projects: Project[];
}

// Type assertion for the entire JSON structure
const projects = projectsJson as unknown as ProjectsData;

const categories = [
  "All",
  "Full Stack",
  "Mobile",
  "ML/AI",
  "Distributed Systems",
];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = projects.projects.filter((project) =>
    activeTab === "All" ? true : project.categories.includes(activeTab)
  );

  return (
    <section className="relative bg-background" id="projects">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="text-primary">Personal</span>{" "}
            <span className="text-secondary">Projects</span>
          </h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="mt-2 text-xs text-muted-foreground max-w-xl mx-auto">
            A showcase of my most significant projects, demonstrating my skills
            and expertise in software engineering.
          </p>
        </div>

        {/* Project Categories Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-muted/60 rounded-lg p-1 gap-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-md text-sm transition-colors
                  ${
                    activeTab === category
                      ? "bg-background text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
