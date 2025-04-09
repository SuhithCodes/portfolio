import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { type Skill } from "@/data/skills.d";
import { Code, Briefcase } from "lucide-react";

interface SkillDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  skills: Skill[];
  categoryName: string;
}

export default function SkillDetailsModal({
  isOpen,
  onClose,
  skills,
  categoryName,
}: SkillDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {categoryName}
          </DialogTitle>
          <DialogDescription>
            Detailed overview of skills in this category
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="space-y-4 p-4 rounded-lg bg-muted/30"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Proficiency</div>
                  <div className="text-2xl font-bold text-primary">
                    {skill.level}/5
                  </div>
                </div>
              </div>

              <Progress value={skill.level * 20} className="h-2" />

              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {skill.projects.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Related Projects
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {skill.projects.map((project, index) => (
                      <div
                        key={index}
                        className="p-2 rounded bg-background border text-sm flex items-center gap-2"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary/50" />
                        {project}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
