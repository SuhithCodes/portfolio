import {
  Terminal,
  Layers,
  Database,
  Cpu,
  Brain,
  Smartphone,
  TestTube,
  Gauge,
} from "lucide-react";

export function TechIcons() {
  const icons = [
    {
      icon: <Terminal className="h-6 w-6 text-primary" />,
      label: "Backend",
      color: "bg-primary/10",
    },
    {
      icon: <Layers className="h-6 w-6 text-secondary" />,
      label: "Frontend",
      color: "bg-secondary/10",
    },
    {
      icon: <Database className="h-6 w-6 text-green-500" />,
      label: "Database",
      color: "bg-green-500/10",
    },
    {
      icon: <Cpu className="h-6 w-6 text-blue-500" />,
      label: "DevOps",
      color: "bg-blue-500/10",
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      label: "AI/ML",
      color: "bg-purple-500/10",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-orange-500" />,
      label: "Mobile",
      color: "bg-orange-500/10",
    },
    {
      icon: <TestTube className="h-6 w-6 text-pink-500" />,
      label: "Automation",
      color: "bg-pink-500/10",
    },
    {
      icon: <Gauge className="h-6 w-6 text-yellow-500" />,
      label: "Performance",
      color: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="flex justify-center gap-8 mb-12 flex-wrap">
      {icons.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-2`}
          >
            {item.icon}
          </div>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
