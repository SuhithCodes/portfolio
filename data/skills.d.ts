export interface Skill {
  id: number;
  name: string;
  description: string;
  category: string;
  level: number;
  experience: number;
  tags: string[];
  projects: string[];
  achievements: string[];
}

export interface LearningJourneyItem {
  year: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
}

export interface SkillsData {
  sectionTitle: string;
  sectionDescription: string;
  skills: Skill[];
  learningJourney: LearningJourneyItem[];
  stats: {
    value: string;
    label: string;
    color: string;
  }[];
}
