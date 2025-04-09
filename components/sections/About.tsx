"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Layers,
  Terminal,
  Briefcase,
  Heart,
  Coffee,
  Lightbulb,
  Zap,
  Download,
  Printer,
  Boxes,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  StatCard,
  SkillBar,
  BookIcon,
  Mountain,
  Camera,
  Utensils,
  Gamepad,
} from "@/components/about";
import aboutData from "@/data/about.json";
import about from "@/data/about.json";
import Link from "next/link";

interface Overview {
  name: string;
  title: string;
  location: string;
  description: string[];
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [animatedNumbers, setAnimatedNumbers] = useState({
    projects: 0,
    experience: 0,
    iterations: 0,
    domains: 0,
  });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  // Animate stats when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Animate numbers
  useEffect(() => {
    if (statsInView) {
      const interval = setInterval(() => {
        setAnimatedNumbers((prev) => {
          const newNumbers = { ...prev };
          if (newNumbers.projects < 14) newNumbers.projects += 1;
          if (newNumbers.experience < 4) newNumbers.experience += 0.1;
          if (newNumbers.iterations < 95) newNumbers.iterations += 2;
          if (newNumbers.domains < 8) newNumbers.domains += 1;

          if (
            newNumbers.projects === 14 &&
            newNumbers.experience >= 4 &&
            newNumbers.iterations === 95 &&
            newNumbers.domains === 8
          ) {
            clearInterval(interval);
          }

          return newNumbers;
        });
      }, 14);

      return () => clearInterval(interval);
    }
  }, [statsInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Smaller background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        </div>

        <main className="relative py-8 px-3 md:px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-primary">About</span>{" "}
              <span className="text-secondary">Me</span>
            </h1>
            <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
            <p className="mt-2 text-xs text-muted-foreground max-w-xl mx-auto">
              Get to know more about my skills, experience, and what drives me
              as a developer.
            </p>
          </motion.div>

          {/* Tabs Navigation */}
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <div className="flex justify-center mb-4">
              <TabsList className="grid grid-cols-2 w-full max-w-xs">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-3 gap-4 mb-6"
              >
                {/* Smaller Profile Image */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-1 flex justify-center"
                >
                  <div className="relative w-36 h-36">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 animate-pulse-slow">
                      <div className="rounded-full bg-card w-full h-full flex items-center justify-center overflow-hidden">
                        <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                          SG
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* More compact Bio */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader className="p-3">
                      <CardTitle className="text-base">
                        {about.overview.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {about.overview.title}
                      </CardDescription>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin size={10} />
                        {about.overview.location}
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 py-2 text-xs">
                      {about.overview.description.map(
                        (paragraph: string, index: number) => (
                          <p
                            key={index}
                            className={`text-muted-foreground leading-relaxed ${
                              index < about.overview.description.length - 1
                                ? "mb-2"
                                : ""
                            }`}
                          >
                            {paragraph}
                          </p>
                        )
                      )}
                    </CardContent>
                    <CardFooter className="p-3">
                      <Link
                        href="/suhith_ghanathay_full_stack_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1.5"
                        >
                          <Download size={12} />
                          Resume
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Smaller Stats Section */}
              <motion.div
                ref={statsRef}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6"
              >
                <motion.div variants={itemVariants}>
                  <StatCard
                    icon={<Code className="h-8 w-8 text-primary" />}
                    value={animatedNumbers.projects}
                    label="Projects Completed"
                    color="from-primary/20 to-primary/5"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <StatCard
                    icon={<Briefcase className="h-8 w-8 text-secondary" />}
                    value={animatedNumbers.experience.toFixed(1)}
                    label="Years of Experience"
                    color="from-secondary/20 to-secondary/5"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <StatCard
                    icon={<Zap className="h-8 w-8 text-yellow-500" />}
                    value={animatedNumbers.iterations}
                    label="Iterations"
                    color="from-yellow-500/20 to-yellow-500/5"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <StatCard
                    icon={<Globe className="h-8 w-8 text-blue-500" />}
                    value={animatedNumbers.domains.toFixed(0)}
                    label="Domains"
                    color="from-blue-500/20 to-blue-500/5"
                  />
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Personal Tab */}
            <TabsContent value="personal">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader className="p-3">
                        <CardTitle className="text-base">About Me</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 space-y-2 text-xs">
                        <p className="text-muted-foreground">
                          Beyond coding, I'm passionate about continuous
                          learning and staying at the forefront of technology
                          trends. I believe in writing clean, maintainable code
                          and creating solutions that provide real value to
                          users.
                        </p>
                        <p className="text-muted-foreground">
                          When I'm not in front of a computer, you might find me
                          exploring new hiking trails, reading tech blogs, or
                          experimenting with new recipes in the kitchen.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader className="p-3">
                        <CardTitle className="text-base">My Approach</CardTitle>
                      </CardHeader>
                      <CardContent className="p-3">
                        <ul className="space-y-2 text-xs">
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                            </div>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">
                                User-Centered Design:
                              </span>{" "}
                              I prioritize creating intuitive and accessible
                              interfaces.
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 h-4 w-4 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                              <div className="h-2 w-2 rounded-full bg-secondary"></div>
                            </div>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Clean Code:
                              </span>{" "}
                              I write maintainable, well-documented code that
                              follows best practices and design patterns.
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            </div>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Continuous Learning:
                              </span>{" "}
                              I stay updated with the latest technologies and
                              regularly expand my skill set.
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-0.5 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            </div>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">
                                Problem Solving:
                              </span>{" "}
                              I enjoy tackling complex challenges and finding
                              efficient, elegant solutions.
                            </p>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="text-base font-semibold mb-3 text-center">
                    Interests & Hobbies
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {aboutData.hobbies.map((hobby, index) => {
                      const IconMap: Record<
                        string,
                        React.ComponentType<React.SVGProps<SVGSVGElement>>
                      > = {
                        Boxes,
                        BookIcon,
                        Mountain,
                        Camera,
                        Printer,
                        Gamepad,
                        Code,
                      };

                      const IconComponent = IconMap[hobby.icon];
                      if (!IconComponent) return null;

                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1 bg-primary/10">
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {hobby.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
