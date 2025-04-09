import React from "react";
import { Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ContactInfoProps {
  data: {
    title: string;
    heading: string;
    description: string;
    email: {
      label: string;
      address: string;
    };
  };
}

export function ContactInfo({ data }: ContactInfoProps) {
  return (
    <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-8">
      <div className="max-w-md mx-auto md:ml-auto md:mr-0">
        <p className="text-primary font-medium mb-4">{data.title}</p>

        <h2 className="text-3xl md:text-4xl font-bold mb-6">{data.heading}</h2>

        <p className="text-muted-foreground mb-12">{data.description}</p>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  {data.email.label}
                </p>
                <a
                  href={`mailto:${data.email.address}`}
                  className="hover:text-primary transition-colors"
                >
                  {data.email.address}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
