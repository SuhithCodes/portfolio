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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Skill } from "@/data/skills.d";

interface SkillRowProps {
  skill: Skill;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SkillRow({
  skill,
  isExpanded,
  onToggle,
}: SkillRowProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300",
        isExpanded ? "shadow-lg" : ""
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
              <h3 className="font-medium">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">
                {skill.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Skill Level Stars */}
            <div className="hidden md:flex items-center">
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

            {/* Experience Badge */}
            <Badge variant="outline" className="hidden md:flex">
              {skill.experience}% Experience
            </Badge>

            {/* Expand/Collapse Button */}
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
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
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
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Projects */}
                  {skill.projects.length > 0 && (
                    <div>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
