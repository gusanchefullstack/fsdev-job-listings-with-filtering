import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JobCard from '../JobCard'
import type { Job } from '../../../types/job'

const baseJob: Job = {
  id: 1,
  company: 'Photosnap',
  logo: './images/photosnap.svg',
  new: false,
  featured: false,
  position: 'Senior Frontend Developer',
  role: 'Frontend',
  level: 'Senior',
  postedAt: '1d ago',
  contract: 'Full Time',
  location: 'USA Only',
  languages: ['HTML', 'CSS', 'JavaScript'],
  tools: [],
}

describe('JobCard', () => {
  it('renders company name, position, contract, location and postedAt', () => {
    render(<JobCard job={baseJob} onAddFilter={vi.fn()} />)
    expect(screen.getByText('Photosnap')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Senior Frontend Developer' })).toBeInTheDocument()
    expect(screen.getByText('Full Time')).toBeInTheDocument()
    expect(screen.getByText('USA Only')).toBeInTheDocument()
    expect(screen.getByText('1d ago')).toBeInTheDocument()
  })

  it('does NOT render New! badge when job.new is false', () => {
    render(<JobCard job={{ ...baseJob, new: false }} onAddFilter={vi.fn()} />)
    expect(screen.queryByText('New!')).not.toBeInTheDocument()
  })

  it('renders New! badge when job.new is true', () => {
    render(<JobCard job={{ ...baseJob, new: true }} onAddFilter={vi.fn()} />)
    expect(screen.getByText('New!')).toBeInTheDocument()
  })

  it('does NOT render Featured badge when job.featured is false', () => {
    render(<JobCard job={{ ...baseJob, featured: false }} onAddFilter={vi.fn()} />)
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  it('renders Featured badge when job.featured is true', () => {
    render(<JobCard job={{ ...baseJob, featured: true }} onAddFilter={vi.fn()} />)
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('renders all tags from role, level, languages and tools', () => {
    const job: Job = { ...baseJob, role: 'Frontend', level: 'Senior', languages: ['HTML', 'CSS'], tools: ['React'] }
    render(<JobCard job={job} onAddFilter={vi.fn()} />)
    expect(screen.getByRole('button', { name: /filter by frontend/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter by senior/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter by html/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter by css/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /filter by react/i })).toBeInTheDocument()
  })

  it('clicking a tag calls onAddFilter with the correct tag', async () => {
    const onAddFilter = vi.fn()
    render(<JobCard job={baseJob} onAddFilter={onAddFilter} />)
    await userEvent.click(screen.getByRole('button', { name: /filter by frontend/i }))
    expect(onAddFilter).toHaveBeenCalledWith('Frontend')
  })

  it('company logo has correct alt text', () => {
    render(<JobCard job={baseJob} onAddFilter={vi.fn()} />)
    expect(screen.getByRole('img', { name: 'Photosnap logo' })).toBeInTheDocument()
  })
})
