import { Job } from '@/types/jobs';

export function mapBackendJobs(
  jobs: any[],
  source: 'linkedin' | 'naukri',
  skills: string[]
): Job[] {
  return jobs.map((job, index) => ({
    id: `${source}-${index}`,
    title: job.title || job.positionName,
    company: job.companyName || job.company,
    location: job.location || 'India',
    description: job.description || 'No description available',
    matchedSkills: skills,
    matchScore: Math.min(95, 60 + skills.length * 5),
    source,
    type: job.employmentType || 'Full-time',
    salary: job.salary || undefined,
    postedDate: job.postedAt || new Date().toISOString(),
    applyUrl: job.link || job.url,
  }));
}
