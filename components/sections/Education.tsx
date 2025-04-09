"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Brain,
  Code2,
  Database,
  Lightbulb,
  BadgeIcon as CertificateIcon,
  Clock,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  EducationTimelineItem,
  CertificateCard,
  CourseCard,
  Particles,
} from "@/components/education";
import educationData from "@/data/education.json";

// Icon mapping for different education categories
const categoryIcons = {
  foundations: <BookOpen className="h-5 w-5 text-primary" />,
  algorithms: <Code2 className="h-5 w-5 text-secondary" />,
  ai_ml: <Brain className="h-5 w-5 text-green-500" />,
  systems: <Lightbulb className="h-5 w-5 text-blue-500" />,
  data: <Database className="h-5 w-5 text-yellow-500" />,
};

/**
 * EducationPage Component
 *
 * Displays the education journey with tabs for formal education, certifications, and courses.
 * Includes animations, expandable content, and a progress bar.
 */
export default function EducationPage() {
  // State for expanded education and certificate items
  const [expandedEducation, setExpandedEducation] = useState<number | null>(0);
  const [expandedCertificate, setExpandedCertificate] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("formal"); // State for active tab
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container
  const { scrollYProgress } = useScroll(); // Scroll progress for animations
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 }); // Spring animation for progress bar

  // Toggle expanded state for education
  const toggleEducationExpand = (id: number) => {
    setExpandedEducation(expandedEducation === id ? null : id);
  };

  // Toggle expanded state for certificates
  const toggleCertificateExpand = (id: number) => {
    setExpandedCertificate(expandedCertificate === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 relative w-full">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
          <Particles />
        </div>

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
          style={{ scaleX }}
        />

        <main className="relative py-8 px-6 md:px-8 mx-auto min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-primary">Education</span>{" "}
              <span className="text-secondary">Journey</span>
            </h1>
            <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
            <p className="mt-2 text-xs text-muted-foreground max-w-xl mx-auto">
              {educationData.sectionDescription}
            </p>
          </motion.div>

          {/* Education Tabs */}
          <Tabs
            defaultValue="formal"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <div className="flex justify-center mb-4">
              <TabsList className="grid grid-cols-3 w-full max-w-xs">
                <TabsTrigger value="formal">Formal</TabsTrigger>
                <TabsTrigger value="certifications">Certificates</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
              </TabsList>
            </div>

            {/* Formal Education */}
            <TabsContent value="formal" className="space-y-0">
              <div className="relative" ref={containerRef}>
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/50 transform md:-translate-x-1/2"></div>

                {/* Education Items */}
                {educationData.formalEducation.map((education, index) => (
                  <EducationTimelineItem
                    key={education.id}
                    education={education}
                    index={index}
                    isExpanded={expandedEducation === education.id}
                    onToggle={() => toggleEducationExpand(education.id)}
                    isEven={index % 2 === 0}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Certifications */}
            <TabsContent value="certifications">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full"
              >
                {educationData.certifications.map((certificate) => (
                  <CertificateCard
                    key={certificate.id}
                    certificate={certificate}
                    isExpanded={expandedCertificate === certificate.id}
                    onToggle={() => toggleCertificateExpand(certificate.id)}
                  />
                ))}
              </motion.div>
            </TabsContent>

            {/* Online Courses */}
            <TabsContent value="courses">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
                  {educationData.onlineCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
