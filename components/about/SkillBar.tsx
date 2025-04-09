import React from "react";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

export function SkillBar({ name, percentage, color }: SkillBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
