declare module "@/data/projects.json" {
  interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
  }

  interface SectionInfo {
    title: string;
    description: string;
  }

  interface ProjectsData {
    sectionInfo: SectionInfo;
    projects: Project[];
  }

  const data: ProjectsData;
  export default data;
}
