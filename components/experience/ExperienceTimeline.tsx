import React from "react";
import { motion, useScroll } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimelineItem } from "./TimelineItem";

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  type: "fulltime" | "internship";
  description: string;
  technologies: string[];
  achievements: string[];
  projectLink?: string;
}

interface ExperienceTimelineProps {
  jobs: Job[];
}

export function ExperienceTimeline({ jobs }: ExperienceTimelineProps) {
  const [expandedJob, setExpandedJob] = React.useState<number | null>(0);
  const [activeTab, setActiveTab] = React.useState<
    "all" | "fulltime" | "internship"
  >("all");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const toggleExpand = (index: number) => {
    setExpandedJob(expandedJob === index ? null : index);
  };

  // Filter jobs based on active tab
  const filteredJobs =
    activeTab === "all" ? jobs : jobs.filter((job) => job.type === activeTab);

  return (
    <div className="mb-8">
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "all" | "fulltime" | "internship")
        }
      >
        <div className="flex justify-center mb-4">
          <TabsList className="text-xs">
            <TabsTrigger value="all">All Experiences</TabsTrigger>
            <TabsTrigger value="fulltime">Full-time</TabsTrigger>
            <TabsTrigger value="internship">Internship</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div ref={containerRef} className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/50 transform md:-translate-x-1/2"></div>

        {/* Timeline Progress Indicator */}
        <motion.div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary transform md:-translate-x-1/2 origin-top"
          style={{ scaleY: scrollYProgress }}
        />

        {/* Experience Items */}
        {filteredJobs.map((job, index) => (
          <TimelineItem
            key={index}
            job={job}
            index={index}
            isExpanded={expandedJob === index}
            onToggle={() => toggleExpand(index)}
            isEven={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
