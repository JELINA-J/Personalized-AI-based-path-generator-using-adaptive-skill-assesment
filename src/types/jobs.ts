export type JobSource = 'linkedin' | 'naukri';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  matchedSkills: string[];
  matchScore: number;
  source: JobSource;
  type: string;
  salary?: string;
  postedDate: string;
  applyUrl: string;
}
