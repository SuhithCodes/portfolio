"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface SkillStatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

export default function SkillStatCard({
  icon,
  value,
  label,
  color,
}: SkillStatCardProps) {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
        <motion.div
          className="text-3xl font-bold mb-1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3,
          }}
        >
          {value}
        </motion.div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}
