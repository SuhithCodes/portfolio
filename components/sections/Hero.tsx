import { ArrowRight, ChevronDown, Code, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TechIcons } from "./TechIcons";
import { SocialLinks } from "./SocialLinks";
import { TypingEffect } from "@/components/ui/typing-effect";

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export function Hero({ scrollToSection }: HeroProps) {
  return (
    <div className="w-full max-w-4xl mx-auto text-center relative z-10 py-4">
      {/* Terminal-like header */}
      <div className="mb-4 mx-auto max-w-md">
        <div className="bg-card border rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 border-b">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <div className="ml-2 text-xs font-mono text-muted-foreground">
              portfolio.dev
            </div>
          </div>
          <div className="p-3 font-mono text-sm text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-green-500">➜</span>
              <span className="text-primary">~</span>
              <span className="text-muted-foreground">who-am-i?</span>
            </div>
            <div className="text-base font-semibold">Suhith Ghanathay</div>
            <div className="flex items-center gap-2 mt-2 mb-1">
              <span className="text-green-500">➜</span>
              <span className="text-primary">~</span>
              <span className="text-muted-foreground">role</span>
            </div>
            <TypingEffect />
          </div>
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
        <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
          Suhith Ghanathay
        </span>
      </h1>

      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
        I build robust, scalable applications with modern technologies and clean
        code principles. Specializing in full-stack development, AI/ML,
        Automation Testing, Performance Testing and DevOps.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <Badge
          variant="outline"
          className="px-2.5 py-0.5 text-sm bg-primary/5 border-primary/20"
        >
          React
        </Badge>
        <Badge
          variant="outline"
          className="px-2.5 py-0.5 text-sm bg-secondary/5 border-secondary/20"
        >
          Next.js
        </Badge>
        <Badge
          variant="outline"
          className="px-2.5 py-0.5 text-sm bg-blue-500/5 border-blue-500/20"
        >
          Python
        </Badge>
        <Badge
          variant="outline"
          className="px-2.5 py-0.5 text-sm bg-yellow-500/5 border-yellow-500/20"
        >
          TensorFlow
        </Badge>
        <Badge
          variant="outline"
          className="px-2.5 py-0.5 text-sm bg-cyan-500/5 border-cyan-500/20"
        >
          Docker
        </Badge>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button
          className="rounded-full px-6 py-5 text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 group"
          onClick={() => scrollToSection("projects")}
        >
          <Code className="mr-2 h-4 w-4" />
          <span>View Projects</span>
          <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          variant="outline"
          className="rounded-full px-6 py-5 text-sm font-medium border-2 hover:bg-secondary/10 transition-all duration-300"
          onClick={() => scrollToSection("contact")}
        >
          <Mail className="mr-2 h-4 w-4" /> Contact Me
        </Button>
      </div>

      <TechIcons />
      <SocialLinks />

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scrollToSection("about")}
          className="rounded-full"
        >
          <ChevronDown className="h-5 w-5" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </div>
  );
}
