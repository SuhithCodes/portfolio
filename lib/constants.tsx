import {
  Home,
  User,
  Briefcase,
  Code,
  GraduationCap,
  Wrench,
  Mail,
} from "lucide-react";

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const SECTIONS: Section[] = [
  { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
  { id: "about", label: "About", icon: <User className="h-4 w-4" /> },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase className="h-4 w-4" />,
  },
  { id: "projects", label: "Projects", icon: <Code className="h-4 w-4" /> },
  {
    id: "education",
    label: "Education",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  { id: "skills", label: "Skills", icon: <Wrench className="h-4 w-4" /> },
  { id: "contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
];
