"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import { Sun, Moon, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Import components
import { DesktopSidebar } from "@/components/navigation/DesktopSidebar";
import { MobileHeader } from "@/components/navigation/MobileHeader";
import { Hero } from "@/components/sections/Hero";
import AboutSection from "@/components/sections/About";
import ExperienceSection from "@/components/sections/Experience";
import { ProjectsSection } from "@/components/sections/Projects";
import EducationSection from "@/components/sections/Education";
import SkillsSection from "@/components/sections/Skills";
import { ContactSection } from "@/components/sections/Contact";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Setup intersection observers for each section
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "-10% 0px -10% 0px",
  };

  const [homeRef, homeInView] = useInView(observerOptions);
  const [aboutRef, aboutInView] = useInView(observerOptions);
  const [experienceRef, experienceInView] = useInView(observerOptions);
  const [projectsRef, projectsInView] = useInView(observerOptions);
  const [educationRef, educationInView] = useInView(observerOptions);
  const [skillsRef, skillsInView] = useInView(observerOptions);
  const [contactRef, contactInView] = useInView(observerOptions);

  // Update active section based on which section is in view
  useEffect(() => {
    if (homeInView) setActiveSection("home");
    else if (aboutInView) setActiveSection("about");
    else if (experienceInView) setActiveSection("experience");
    else if (projectsInView) setActiveSection("projects");
    else if (educationInView) setActiveSection("education");
    else if (skillsInView) setActiveSection("skills");
    else if (contactInView) setActiveSection("contact");
  }, [
    homeInView,
    aboutInView,
    experienceInView,
    projectsInView,
    educationInView,
    skillsInView,
    contactInView,
  ]);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Render theme toggle button with proper hydration handling
  const renderThemeToggle = () => {
    if (!mounted) {
      return (
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <div className="h-5 w-5" />
        </Button>
      );
    }

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        renderThemeToggle={renderThemeToggle}
      />
      <MobileHeader
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        renderThemeToggle={renderThemeToggle}
      />

      <main className="flex-1 lg:ml-64">
        <section ref={homeRef} id="home">
          <Hero scrollToSection={scrollToSection} />
        </section>
        <section ref={aboutRef} id="about">
          <AboutSection />
        </section>
        <section ref={experienceRef} id="experience">
          <ExperienceSection />
        </section>
        <section ref={projectsRef} id="projects">
          <ProjectsSection />
        </section>
        <section ref={educationRef} id="education">
          <EducationSection />
        </section>
        <section ref={skillsRef} id="skills">
          <SkillsSection />
        </section>
        <section ref={contactRef} id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}
