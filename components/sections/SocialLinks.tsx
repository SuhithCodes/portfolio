import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function SocialLinks() {
  const links = [
    {
      href: "https://github.com",
      icon: (
        <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      ),
      hoverColor: "group-hover:border-primary group-hover:bg-primary/10",
    },
    {
      href: "https://linkedin.com",
      icon: (
        <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300" />
      ),
      hoverColor: "group-hover:border-blue-500 group-hover:bg-blue-500/10",
    },
    {
      href: "mailto:suhithghanathay@gmail.com",
      icon: (
        <Mail className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors duration-300" />
      ),
      hoverColor: "group-hover:border-secondary group-hover:bg-secondary/10",
    },
  ];

  return (
    <div className="flex justify-center gap-6 mb-20">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={`w-10 h-10 rounded-full border border-muted flex items-center justify-center transition-all duration-300 ${link.hoverColor}`}
          >
            {link.icon}
          </div>
        </Link>
      ))}
    </div>
  );
}
