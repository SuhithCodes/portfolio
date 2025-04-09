"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Server,
  Database,
  Cpu,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Trophy,
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
import { type Skill } from "@/data/skills.d";

interface SkillCardProps {
  skill: Skill;
  isExpanded: boolean;
  onToggle: () => void;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function SkillCard({
  skill,
  isExpanded,
  onToggle,
  isHovered,
  onHover,
  onLeave,
}: SkillCardProps) {
  return (
    <motion.div
      className="h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={{
        rotateY: isHovered ? 5 : 0,
        rotateX: isHovered ? -5 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className={cn(
          "h-full overflow-hidden transition-all duration-300 flex flex-col",
          isExpanded ? "shadow-lg" : ""
        )}
      >
        <CardHeader className="pb-2 flex-none">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  skill.category === "frontend"
                    ? "bg-primary/10"
                    : skill.category === "backend"
                    ? "bg-secondary/10"
                    : skill.category === "database"
                    ? "bg-green-500/10"
                    : "bg-blue-500/10"
                )}
              >
                {skill.category === "frontend" ? (
                  <Monitor className="h-5 w-5 text-primary" />
                ) : skill.category === "backend" ? (
                  <Server className="h-5 w-5 text-secondary" />
                ) : skill.category === "database" ? (
                  <Database className="h-5 w-5 text-green-500" />
                ) : (
                  <Cpu className="h-5 w-5 text-blue-500" />
                )}
              </div>
              <div>
                <CardTitle>{skill.name}</CardTitle>
                <CardDescription className="mt-1">
                  {skill.description}
                </CardDescription>
              </div>
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
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Skill Level */}
          <div className="mb-4 flex-none">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Proficiency</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < skill.level
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  skill.category === "frontend"
                    ? "bg-primary"
                    : skill.category === "backend"
                    ? "bg-secondary"
                    : skill.category === "database"
                    ? "bg-green-500"
                    : "bg-blue-500"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level * 20}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 flex-none min-h-[28px]">
            {skill.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden flex-1"
              >
                <div className="pt-4 mt-4 border-t">
                  {/* Experience */}
                  <div className="mb-4 flex-none">
                    <h4 className="text-sm font-medium mb-2">Experience</h4>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          className={cn(
                            "h-full rounded-full",
                            skill.category === "frontend"
                              ? "bg-primary"
                              : skill.category === "backend"
                              ? "bg-secondary"
                              : skill.category === "database"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          )}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.experience}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {skill.experience}%
                      </span>
                    </div>
                  </div>

                  {/* Projects */}
                  {skill.projects.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">
                        Related Projects
                      </h4>
                      <ul className="space-y-1">
                        {skill.projects.map((project, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <span className="text-sm text-muted-foreground">
                              {project}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Achievements */}
                  {skill.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Achievements</h4>
                      <ul className="space-y-1">
                        {skill.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <span className="text-sm text-muted-foreground">
                              {achievement}
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
  );
}
