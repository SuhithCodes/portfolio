"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Link,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type Certificate } from "@/data/education.d";
import { useState } from "react";

interface CertificateCardProps {
  certificate: Certificate;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CertificateCard({
  certificate,
  isExpanded,
  onToggle,
}: CertificateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -3 }}
        className="h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Card
          className={cn(
            "h-full overflow-hidden transition-all duration-300",
            isExpanded ? "shadow-md" : ""
          )}
        >
          <div
            className={cn(
              "h-0.5 w-full",
              certificate.category === "web"
                ? "bg-primary"
                : certificate.category === "programming"
                ? "bg-secondary"
                : certificate.category === "database"
                ? "bg-green-500"
                : "bg-blue-500"
            )}
          ></div>
          <CardHeader className="pb-1">
            <div className="flex items-start justify-left">
              <div className="flex flex-col items-start">
                <CardTitle className="text-base mb-1">
                  {certificate.name}
                </CardTitle>
                <CardDescription className="text-xs mb-2">
                  {certificate.issuer}
                </CardDescription>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(certificate.date).toLocaleString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{certificate.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1 mb-3">
              {certificate.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-[10px]">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-2"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="bg-card rounded-lg max-w-2xl w-full h-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground z-50"
            >
              <X size={14} />
            </button>

            <div className="p-4">
              <h2 className="text-lg font-bold text-primary mb-4">
                {certificate.name}
              </h2>

              {certificate.image && (
                <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden border">
                  <Image
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {certificate.description}
                </p>

                {certificate.topics && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Key Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {certificate.topics.map((topic, topicIndex) => (
                        <Badge
                          key={topicIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certificate Link */}
                {certificate.url && (
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => window.open(certificate.url, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Certificate
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
