import type { Job } from '../types/job'

export function getJobTags(job: Job): string[] {
  return [job.role, job.level, ...job.languages, ...job.tools]
}

export function filterJobs(jobs: Job[], activeFilters: string[]): Job[] {
  if (activeFilters.length === 0) return jobs
  return jobs.filter((job) => {
    const tags = getJobTags(job)
    return activeFilters.every((f) => tags.includes(f))
  })
}
