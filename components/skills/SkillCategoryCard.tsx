"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SkillCategoryCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  color: string;
}

export default function SkillCategoryCard({
  icon,
  title,
  skills,
  color,
}: SkillCategoryCardProps) {
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div
          className={`w-16 h-16 rounded-lg ${color} flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">{skill}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
