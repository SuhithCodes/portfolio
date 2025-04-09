import React from "react";
import { ProjectCard } from "./ProjectCard";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  keyFeatures?: string[];
}

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const handleNext = (currentIndex: number) => {
    return currentIndex < projects.length - 1 ? currentIndex + 1 : null;
  };

  const handlePrev = (currentIndex: number) => {
    return currentIndex > 0 ? currentIndex - 1 : null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          index={index}
          totalProjects={projects.length}
          onNext={
            handleNext(index) !== null ? () => handleNext(index) : undefined
          }
          onPrev={
            handlePrev(index) !== null ? () => handlePrev(index) : undefined
          }
        />
      ))}
    </div>
  );
}
