import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JobList from '../JobList'
import type { Job } from '../../../types/job'

const makeJob = (id: number, company: string): Job => ({
  id,
  company,
  logo: `./images/${company.toLowerCase()}.svg`,
  new: false,
  featured: false,
  position: 'Developer',
  role: 'Frontend',
  level: 'Junior',
  postedAt: '1d ago',
  contract: 'Full Time',
  location: 'Worldwide',
  languages: ['JavaScript'],
  tools: [],
})

describe('JobList', () => {
  it('renders a card for each job', () => {
    const jobs = [makeJob(1, 'Acme'), makeJob(2, 'Globex'), makeJob(3, 'Initech')]
    render(<JobList jobs={jobs} onAddFilter={vi.fn()} />)
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('shows empty-state message when jobs list is empty', () => {
    render(<JobList jobs={[]} onAddFilter={vi.fn()} />)
    expect(
      screen.getByText('No job listings match your current filters.')
    ).toBeInTheDocument()
  })

  it('passes onAddFilter down so tag clicks fire the callback', async () => {
    const onAddFilter = vi.fn()
    render(<JobList jobs={[makeJob(1, 'Acme')]} onAddFilter={onAddFilter} />)
    await userEvent.click(screen.getByRole('button', { name: /filter by frontend/i }))
    expect(onAddFilter).toHaveBeenCalledWith('Frontend')
  })
})
