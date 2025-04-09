"use client";

import { useState } from "react";
import {
  Monitor,
  Server,
  Database,
  Globe,
  Brain,
  Cpu,
  Shield,
  Code,
  Wrench,
  Smartphone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type Skill } from "@/data/skills.d";
import SkillDetailsModal from "./SkillDetailsModal";

interface SkillCategoriesProps {
  skills: Skill[];
}

export default function SkillCategories({ skills }: SkillCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      name: "Frontend Development",
      icon: Monitor,
      color: "text-primary",
      bgColor: "bg-primary/10",
      category: "frontend",
    },
    {
      name: "Backend Development",
      icon: Server,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      category: "backend",
    },
    {
      name: "Database Management",
      icon: Database,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      category: "database",
    },
    {
      name: "Mobile Development",
      icon: Smartphone,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      category: "mobile",
    },
    {
      name: "AI & Machine Learning",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      category: "ai_ml",
    },
    {
      name: "Systems & DevOps",
      icon: Cpu,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      category: "systems",
    },
    {
      name: "Security & Authentication",
      icon: Shield,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      category: "security",
    },
    {
      name: "DevOps",
      icon: Code,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      category: "devops",
    },
    {
      name: "Testing",
      icon: Wrench,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      category: "testing",
    },
    {
      name: "Embedded",
      icon: Cpu,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      category: "embedded",
    },
  ];

  const getCategorySkills = (category: string) => {
    return skills.filter((skill) => skill.category === category);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {categories.map((category) => {
          const categorySkills = getCategorySkills(category.category);
          if (categorySkills.length === 0) return null;

          return (
            <Card
              key={category.name}
              className="cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => setSelectedCategory(category.category)}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className={cn("p-2 rounded-lg", category.bgColor)}>
                    <category.icon className={cn("h-5 w-5", category.color)} />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categorySkills.map((skill) => (
                    <li key={skill.id} className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          category.bgColor
                        )}
                      />
                      <span className="text-sm text-muted-foreground">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedCategory && (
        <SkillDetailsModal
          isOpen={true}
          onClose={() => setSelectedCategory(null)}
          skills={getCategorySkills(selectedCategory)}
          categoryName={
            categories.find((c) => c.category === selectedCategory)?.name || ""
          }
        />
      )}
    </>
  );
}
