/**
 * TimelineItem Component
 *
 * A responsive timeline item component that displays work experience or project details
 * in an alternating layout. Features expandable content, animations, and visual indicators.
 */

import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Job Interface
 * @interface Job
 * @property {string} title - The job title or role
 * @property {string} company - Company or organization name
 * @property {string} location - Job location (city, remote, etc.)
 * @property {string} period - Time period of employment (e.g., "2022 - Present")
 * @property {"fulltime" | "internship"} type - Type of employment
 * @property {string} description - Brief description of the role
 * @property {string[]} technologies - Array of technologies/skills used
 * @property {string[]} achievements - Array of key achievements/responsibilities
 * @property {string} [projectLink] - Optional link to related project
 */
interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  type: "fulltime" | "internship";
  description: string;
  technologies: string[];
  achievements: string[];
  projectLink?: string;
}

/**
 * TimelineItem Props Interface
 * @interface TimelineItemProps
 * @property {Job} job - Job details object
 * @property {number} index - Index of the timeline item (used for animation delay)
 * @property {boolean} isExpanded - Whether the item's details are expanded
 * @property {() => void} onToggle - Callback function to toggle expanded state
 * @property {boolean} isEven - Whether the item is in an even position (affects layout)
 */
interface TimelineItemProps {
  job: Job;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isEven: boolean;
}

export function TimelineItem({
  job,
  index,
  isExpanded,
  onToggle,
  isEven,
}: TimelineItemProps) {
  // Animation variants for the container using Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1, // Stagger animation based on index
      },
    },
  };

  /**
   * Determines the badge variant based on job type
   * @param {string} type - The job type
   * @returns {string} The corresponding badge variant
   */
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "fulltime":
        return "default";
      case "internship":
        return "secondary";
      case "freelance":
        return "outline";
      default:
        return "default";
    }
  };

  /**
   * Converts job type to display-friendly label
   * @param {string} type - The job type
   * @returns {string} The formatted label
   */
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "fulltime":
        return "Full-time";
      case "internship":
        return "Internship";
      case "freelance":
        return "Freelance";
      default:
        return type;
    }
  };

  return (
    <motion.div
      className={cn("relative mb-8 md:mb-16", isEven ? "md:text-right" : "")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Timeline Connector Icon
       * Centered circle with briefcase icon that connects timeline items
       * Positioned absolutely in the middle for desktop and left side for mobile
       */}
      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 -mt-2 z-10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Briefcase className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Period Badge
       * Displays the employment duration
       * Positioned differently based on even/odd layout and screen size
       */}
      <div
        className={cn(
          "absolute left-16 md:left-auto md:right-auto transform md:translate-y-0 mt-0.5",
          isEven
            ? "md:left-[calc(50%+1.5rem)] md:right-auto"
            : "md:left-auto md:right-[calc(50%+1.5rem)]"
        )}
      >
        <Badge
          variant="outline"
          className="flex items-center gap-1.5 px-2 py-1 bg-muted/30 text-xs"
        >
          <Calendar className="h-3 w-3" />
          <span>{job.period}</span>
        </Badge>
      </div>

      {/* Experience Card
       * Main content container with job details
       * Features expandable content and hover effects
       * Layout adapts based on even/odd positioning
       */}
      <div className="pt-1">
        <Card
          className={cn(
            "ml-20 md:ml-0 md:mr-0 md:w-5/12 mt-12 cursor-pointer hover:shadow-md transition-shadow",
            isEven ? "md:mr-auto" : "md:ml-auto"
          )}
          onClick={onToggle}
        >
          {/* Card Header - Basic Job Information */}
          <CardHeader className="p-3">
            <div className={cn("flex items-start justify-between")}>
              {/* Job Title and Company Info - Always Left Aligned */}
              <div className="text-left">
                <CardTitle className="text-base text-primary">
                  {job.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-0.5 text-xs">
                  <Building className="h-3 w-3" />
                  <span>{job.company}</span>
                </CardDescription>
                <CardDescription className="flex items-center gap-1.5 mt-0.5 text-xs">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                </CardDescription>
              </div>
              {/* Employment Type Badge - Always Right Aligned */}
              <Badge
                variant={getBadgeVariant(job.type)}
                className="ml-2 text-xs"
              >
                {getTypeLabel(job.type)}
              </Badge>
            </div>
          </CardHeader>

          {/* Card Content - Job Description and Technologies */}
          <CardContent className={cn("p-3", isEven ? "md:text-left" : "")}>
            <p className="text-xs text-muted-foreground mb-3">
              {job.description}
            </p>

            {/* Technology Stack Tags */}
            <div
              className={cn(
                "flex flex-wrap gap-1.5 mb-3",
                isEven ? "md:justify-start" : ""
              )}
            >
              {job.technologies.map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  variant="outline"
                  className="bg-muted/30 text-[10px] px-1.5 py-0.5"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Expand/Collapse Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event from triggering
                onToggle();
              }}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  <span>Show More</span>
                </>
              )}
            </Button>
          </CardContent>

          {/* Expandable Content Section
           * Only rendered when isExpanded is true
           * Contains achievements and optional project link
           */}
          {isExpanded && (
            <CardContent
              className={cn("pt-0 px-3 pb-3", isEven ? "md:text-left" : "")}
            >
              <div className="border-t my-3"></div>

              {/* Key Achievements Section */}
              <div className={cn("mb-3", isEven ? "md:text-left" : "")}>
                <h4
                  className={cn(
                    "font-semibold mb-2 flex items-center gap-1.5 text-xs",
                    isEven ? "md:justify-start" : ""
                  )}
                >
                  <Award className="h-3 w-3 text-yellow-500" />
                  Key Achievements
                </h4>
                <ul className="space-y-1.5">
                  {job.achievements.map((achievement, achievementIndex) => (
                    <li
                      key={achievementIndex}
                      className={cn(
                        "flex items-start gap-1.5",
                        isEven ? "md:justify-start" : ""
                      )}
                    >
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span
                        className={cn(
                          "text-xs text-muted-foreground",
                          isEven ? "text-left" : ""
                        )}
                      >
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional Project Link Button */}
              {job.projectLink && (
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-7 text-xs flex items-center gap-1.5",
                    isEven ? "md:ml-0" : ""
                  )}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event from triggering
                    window.open(job.projectLink, "_blank");
                  }}
                >
                  <ExternalLink className="h-3 w-3" />
                  View Project
                </Button>
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </motion.div>
  );
}
