export interface Education {
  id: number;
  title: string;
  institution: string;
  location: string;
  year: string;
  grade?: string;
  description: string;
  barColor: string;
  iconBgColor: string;
  showStar?: boolean;
  achievements?: string[];
  courses?: string[];
  projects?: string[];
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  duration: string;
  category: string;
  description: string;
  skills: string[];
  topics?: string[];
  image?: string;
  url?: string;
}

export interface OnlineCourse {
  id: number;
  name: string;
  platform: string;
  category: string;
  duration: string;
  completionDate: string;
  skills: string[];
  url?: string;
}

export interface CourseCategory {
  id: string;
  name: string;
}

export interface EducationStat {
  value: string;
  label: string;
  color: string;
}

export interface EducationData {
  sectionTitle: string;
  sectionDescription: string;
  formalEducation: Education[];
  certifications: Certificate[];
  courseCategories: CourseCategory[];
  onlineCourses: OnlineCourse[];
  stats: EducationStat[];
}
