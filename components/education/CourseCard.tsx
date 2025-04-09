"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type OnlineCourse } from "@/data/education.d";

interface CourseCardProps {
  course: OnlineCourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div whileHover={{ y: -3 }} className="h-full cursor-pointer">
      <Card className="h-full overflow-hidden">
        <div
          className={cn(
            "h-0.5 w-full",
            course.category === "web"
              ? "bg-primary"
              : course.category === "programming"
              ? "bg-secondary"
              : course.category === "database"
              ? "bg-green-500"
              : "bg-blue-500"
          )}
        ></div>
        <CardHeader className="pb-1">
          <div className="flex flex-col items-start">
            <CardTitle className="text-base mb-1">{course.name}</CardTitle>
            <CardDescription className="text-xs mb-2">
              {course.platform}
            </CardDescription>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {new Date(course.completionDate).toLocaleString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
