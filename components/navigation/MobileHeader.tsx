import Link from "next/link";
import { ChevronRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  renderThemeToggle: () => React.ReactNode;
}

export function MobileHeader({
  activeSection,
  scrollToSection,
  renderThemeToggle,
}: MobileHeaderProps) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-30 h-14 border-b bg-background/95 backdrop-blur flex items-center px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-2">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center px-4 border-b">
            <Link
              href="#home"
              className="flex items-center gap-2 font-semibold"
              onClick={() => scrollToSection("home")}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
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
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
          <div className="p-4 border-t flex justify-between items-center">
            <div className="flex gap-4">
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
            {renderThemeToggle()}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex justify-center">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          SG
        </div>
      </div>
      {renderThemeToggle()}
    </header>
  );
}
