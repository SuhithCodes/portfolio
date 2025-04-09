import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SECTIONS } from "@/lib/constants";

interface DesktopSidebarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  renderThemeToggle: () => React.ReactNode;
}

export function DesktopSidebar({
  activeSection,
  scrollToSection,
  renderThemeToggle,
}: DesktopSidebarProps) {
  return (
    <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-30 border-sidebar-border bg-sidebar-background border-r">
      <div className="flex h-14 items-center px-4 border-b border-sidebar-border">
        <Link
          href="#home"
          className="flex items-center gap-2 font-semibold text-sidebar-foreground"
          onClick={() => scrollToSection("home")}
        >
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
            SG
          </div>
          <span>Suhith Ghanathay</span>
        </Link>
      </div>
      <nav className="flex-1 py-4">
        {SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm transition-colors",
              activeSection === section.id
                ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(section.id);
            }}
          >
            {section.icon}
            <span>{section.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border flex justify-between items-center">
        <div className="flex gap-4">
          <Link
            href="https://github.com"
            className="text-muted-foreground hover:text-sidebar-foreground transition-colors"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://linkedin.com"
            className="text-muted-foreground hover:text-sidebar-foreground transition-colors"
          >
            <Linkedin size={20} />
          </Link>
        </div>
        {renderThemeToggle()}
      </div>
    </aside>
  );
}
