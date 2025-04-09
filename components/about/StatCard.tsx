import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  color: string;
}

export function StatCard({ icon, value, label, color }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-50`}
        ></div>
        <div className="relative z-10">
          <div className="mb-3">{icon}</div>
          <div className="text-3xl font-bold mb-1">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}
