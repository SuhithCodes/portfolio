"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Database, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type LearningJourneyItem as LearningJourneyItemType } from "@/data/skills.d";

interface LearningJourneyItemProps {
  item: LearningJourneyItemType;
  index: number;
}

export default function LearningJourneyItem({
  item,
  index,
}: LearningJourneyItemProps) {
  return (
    <motion.div
      className={cn(
        "relative mb-12 md:mb-24",
        index % 2 === 0 ? "md:text-right" : ""
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Timeline Icon */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -mt-2 z-10">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            item.category === "frontend"
              ? "bg-primary"
              : item.category === "backend"
              ? "bg-secondary"
              : item.category === "database"
              ? "bg-green-500"
              : "bg-blue-500"
          )}
        >
          {item.category === "frontend" ? (
            <Monitor className="h-6 w-6 text-white" />
          ) : item.category === "backend" ? (
            <Server className="h-6 w-6 text-white" />
          ) : item.category === "database" ? (
            <Database className="h-6 w-6 text-white" />
          ) : (
            <Cpu className="h-6 w-6 text-white" />
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "ml-24 md:ml-0 md:mr-0 md:w-5/12",
          index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
        )}
      >
        <Card>
          <CardContent className="p-6">
            <Badge className="mb-2">{item.year}</Badge>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.skills.map((skill, skillIndex) => (
                <Badge key={skillIndex} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
