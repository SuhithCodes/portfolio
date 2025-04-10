import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  keyFeatures: string[];
  categories: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function BlankProjectImage() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col items-center justify-center gap-2">
      <div className="text-primary/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      </div>
      <div className="text-primary/40 text-xs font-medium">
        No Preview Available
      </div>
    </div>
  );
}

function ImageCarousel({
  images,
  currentIndex,
  onNext,
  onPrev,
  showControls = true,
}: {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  showControls?: boolean;
}) {
  const [failedImages, setFailedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleImageError = (imageSrc: string) => {
    setFailedImages((prev) => ({ ...prev, [imageSrc]: true }));
  };

  const allImagesFailed = images.every((img) => failedImages[img]);

  if (allImagesFailed) {
    return <BlankProjectImage />;
  }

  return (
    <div className="relative group overflow-hidden">
      <motion.div
        className="aspect-[16/9] relative"
        initial={false}
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex w-full h-full">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="w-full h-full flex-shrink-0 bg-black/5"
              initial={false}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {failedImages[image] ? (
                <BlankProjectImage />
              ) : (
                <img
                  src={image}
                  alt={`Project screenshot ${index + 1}`}
                  className="w-full h-full object-contain"
                  onError={() => handleImageError(image)}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
      {showControls && !allImagesFailed && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 text-foreground/80 hover:text-foreground hover:bg-background p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 text-foreground/80 hover:text-foreground hover:bg-background p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <motion.div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-primary/30"
                }`}
                initial={false}
                animate={{ scale: index === currentIndex ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <>
      <motion.div
        className="group relative bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow cursor-pointer h-[320px] flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Project Image */}
        <div className="aspect-[16/9] relative bg-black/5">
          {project.images && project.images.length > 0 ? (
            <ImageCarousel
              images={project.images}
              currentIndex={currentImageIndex}
              onNext={handleNextImage}
              onPrev={handlePrevImage}
              showControls={isHovered}
            />
          ) : (
            <BlankProjectImage />
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm">View Details</span>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-semibold text-sm mb-1.5 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-[10px] px-1.5 py-0 bg-primary/5 text-primary border-primary/20"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 bg-muted text-muted-foreground border-muted"
              >
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      {/* Project Details Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-2"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="bg-card rounded-lg max-w-2xl w-full relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground z-50"
            >
              <X size={14} />
            </button>

            <div className="p-3">
              {/* Header */}
              <h2 className="text-lg font-bold text-primary mb-2">
                {project.title}
              </h2>

              {/* Project Image */}
              <div className="relative rounded-lg overflow-hidden mb-3">
                {project.images && project.images.length > 0 ? (
                  <ImageCarousel
                    images={project.images}
                    currentIndex={currentImageIndex}
                    onNext={handleNextImage}
                    onPrev={handlePrevImage}
                    showControls={true}
                  />
                ) : (
                  <BlankProjectImage />
                )}
              </div>

              <div className="space-y-3">
                {/* Description */}
                <p className="text-xs text-muted-foreground">
                  {project.description}
                </p>

                {/* Technologies */}
                <div>
                  <h3 className="text-xs font-semibold mb-1">Technologies</h3>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 bg-primary/5 text-primary border-primary/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                {project.keyFeatures && (
                  <div>
                    <h3 className="text-xs font-semibold mb-1">Key Features</h3>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-3 columns-2 gap-x-6">
                      {project.keyFeatures.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-2 pt-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs bg-primary text-primary-foreground hover:bg-primary/90 px-2.5 py-1 rounded"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs bg-muted hover:bg-muted/80 px-2.5 py-1 rounded"
                    >
                      <Github className="h-3 w-3" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
