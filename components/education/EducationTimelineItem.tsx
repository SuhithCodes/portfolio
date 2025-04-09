"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Building,
  Calendar,
  School,
  Star,
  Award,
  ChevronDown,
  ChevronUp,
  MapPin,
  FileText,
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
import { type Education } from "@/data/education.d";

interface EducationTimelineItemProps {
  education: Education;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isEven: boolean;
}

const iconMap = {
  BCA: GraduationCap,
  Intermediate: BookOpen,
  "High School": Building,
};

export default function EducationTimelineItem({
  education,
  index,
  isExpanded,
  onToggle,
  isEven,
}: EducationTimelineItemProps) {
  const Icon =
    iconMap[education.title as keyof typeof iconMap] || GraduationCap;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className={cn("relative mb-8 md:mb-16", isEven ? "md:text-right" : "")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Timeline Icon */}
      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 -mt-2 z-10">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            education.iconBgColor
          )}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Date Badge */}
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
          <span>{education.year}</span>
        </Badge>
      </div>

      {/* Education Card */}
      <motion.div
        className={cn(
          "ml-20 md:ml-0 md:mr-0 md:w-5/12 mt-12 cursor-pointer hover:shadow-md transition-shadow",
          isEven ? "md:mr-auto" : "md:ml-auto"
        )}
        whileHover={{ y: -5 }}
      >
        <Card
          className={cn(
            "overflow-hidden transition-all duration-300",
            isExpanded ? "shadow-lg" : ""
          )}
        >
          <CardHeader className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle
                  className={cn(
                    "text-base text-primary",
                    education.barColor === "bg-[#d53f8c]"
                      ? "text-secondary"
                      : education.barColor === "bg-[#4361ee]"
                      ? "text-primary"
                      : "text-green-500"
                  )}
                >
                  {education.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 mt-0.5 text-xs">
                  <School className="h-3 w-3" />
                  <span>{education.institution}</span>
                </CardDescription>
                <CardDescription className="flex items-center gap-1.5 mt-0.5 text-xs">
                  <MapPin className="h-3 w-3" />
                  <span>{education.location}</span>
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
              >
                {isExpanded ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </Button>
            </div>
          </CardHeader>
          <div className={cn("h-1 w-full", education.barColor)}></div>
          <CardContent className="pt-4">
            {education.grade && (
              <div className="flex items-center gap-1.5 mb-3">
                {education.showStar && (
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                )}
                <span className="text-xs font-medium">{education.grade}</span>
              </div>
            )}

            <p className="text-xs text-muted-foreground mb-3">
              {education.description}
            </p>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 mt-3 border-t">
                    {/* Key Achievements */}
                    {education.achievements && (
                      <div className="mb-3">
                        <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5">
                          <Award className="h-3 w-3 text-yellow-500" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-1.5">
                          {education.achievements.map(
                            (achievement, achievementIndex) => (
                              <li
                                key={achievementIndex}
                                className="flex items-start gap-1.5"
                              >
                                <Award className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">
                                  {achievement}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Courses */}
                    {education.courses && (
                      <div className="mb-3">
                        <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5">
                          <BookOpen className="h-3 w-3 text-blue-500" />
                          Notable Courses
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {education.courses.map((course, courseIndex) => (
                            <Badge
                              key={courseIndex}
                              variant="outline"
                              className="bg-muted/30 text-[10px] px-1.5 py-0.5"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {education.projects && (
                      <div>
                        <h4 className="text-xs font-medium mb-2 flex items-center gap-1.5">
                          <FileText className="h-3 w-3 text-green-500" />
                          Academic Projects
                        </h4>
                        <ul className="space-y-1.5">
                          {education.projects.map((project, projectIndex) => (
                            <li
                              key={projectIndex}
                              className="flex items-start gap-1.5"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                              <span className="text-xs text-muted-foreground text-left">
                                {project}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
