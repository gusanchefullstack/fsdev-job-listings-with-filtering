import { describe, it, expect } from 'vitest'
import { getJobTags, filterJobs } from '../filterJobs'
import type { Job } from '../../types/job'

const makeJob = (overrides: Partial<Job> = {}): Job => ({
  id: 1,
  company: 'Acme',
  logo: './images/acme.svg',
  new: false,
  featured: false,
  position: 'Developer',
  role: 'Frontend',
  level: 'Junior',
  postedAt: '1d ago',
  contract: 'Full Time',
  location: 'Worldwide',
  languages: ['JavaScript', 'HTML'],
  tools: ['React'],
  ...overrides,
})

describe('getJobTags', () => {
  it('returns role, level, languages, and tools merged', () => {
    const job = makeJob()
    expect(getJobTags(job)).toEqual(['Frontend', 'Junior', 'JavaScript', 'HTML', 'React'])
  })

  it('works when tools is empty', () => {
    const job = makeJob({ tools: [] })
    expect(getJobTags(job)).toEqual(['Frontend', 'Junior', 'JavaScript', 'HTML'])
  })

  it('works when languages is empty', () => {
    const job = makeJob({ languages: [] })
    expect(getJobTags(job)).toEqual(['Frontend', 'Junior', 'React'])
  })
})

describe('filterJobs', () => {
  const jobs: Job[] = [
    makeJob({ id: 1, role: 'Frontend', level: 'Junior', languages: ['JavaScript'], tools: [] }),
    makeJob({ id: 2, role: 'Backend', level: 'Junior', languages: ['Ruby'], tools: ['RoR'] }),
    makeJob({ id: 3, role: 'Frontend', level: 'Senior', languages: ['JavaScript', 'CSS'], tools: [] }),
    makeJob({ id: 4, role: 'Fullstack', level: 'Midweight', languages: ['Python'], tools: ['React'] }),
  ]

  it('returns all jobs when filters are empty', () => {
    expect(filterJobs(jobs, [])).toHaveLength(4)
  })

  it('filters by role', () => {
    const result = filterJobs(jobs, ['Frontend'])
    expect(result).toHaveLength(2)
    expect(result.map((j) => j.id)).toEqual([1, 3])
  })

  it('filters by level', () => {
    const result = filterJobs(jobs, ['Junior'])
    expect(result).toHaveLength(2)
    expect(result.map((j) => j.id)).toEqual([1, 2])
  })

  it('applies AND logic across multiple filters', () => {
    const result = filterJobs(jobs, ['Frontend', 'Junior'])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  it('returns empty array when no jobs match', () => {
    expect(filterJobs(jobs, ['NonExistent'])).toHaveLength(0)
  })

  it('filters by language', () => {
    const result = filterJobs(jobs, ['Ruby'])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('filters by tool', () => {
    const result = filterJobs(jobs, ['React'])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(4)
  })

  it('matches across language and tool together (AND)', () => {
    const result = filterJobs(jobs, ['Python', 'React'])
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(4)
  })
})
