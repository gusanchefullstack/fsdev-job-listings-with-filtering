import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App — filter integration', () => {
  it('renders all 10 job cards on initial load', () => {
    render(<App />)
    expect(screen.getAllByRole('article')).toHaveLength(10)
  })

  it('FilterBar is hidden on initial load', () => {
    render(<App />)
    expect(screen.queryByRole('complementary', { name: /active filters/i })).not.toBeInTheDocument()
  })

  it('clicking a tag adds it to FilterBar and narrows the list', async () => {
    render(<App />)
    const [firstTag] = screen.getAllByRole('button', { name: /filter by frontend/i })
    await userEvent.click(firstTag)
    const filterBar = screen.getByRole('complementary', { name: /active filters/i })
    expect(filterBar).toBeInTheDocument()
    expect(within(filterBar).getByText('Frontend')).toBeInTheDocument()
    const articles = screen.getAllByRole('article')
    expect(articles.length).toBeGreaterThan(0)
    expect(articles.length).toBeLessThan(10)
  })

  it('clicking the same tag twice does not duplicate it in FilterBar', async () => {
    render(<App />)
    const tags = screen.getAllByRole('button', { name: /filter by frontend/i })
    await userEvent.click(tags[0])
    await userEvent.click(screen.getAllByRole('button', { name: /filter by frontend/i })[0])
    const filterBar = screen.getByRole('complementary', { name: /active filters/i })
    const chips = within(filterBar).getAllByText('Frontend')
    expect(chips).toHaveLength(1)
  })

  it('clicking remove on a chip removes that filter', async () => {
    render(<App />)
    const [firstTag] = screen.getAllByRole('button', { name: /filter by frontend/i })
    await userEvent.click(firstTag)
    await userEvent.click(screen.getByRole('button', { name: 'Remove Frontend filter' }))
    expect(screen.queryByRole('complementary', { name: /active filters/i })).not.toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(10)
  })

  it('clicking Clear restores all 10 jobs and hides FilterBar', async () => {
    render(<App />)
    const [firstTag] = screen.getAllByRole('button', { name: /filter by frontend/i })
    await userEvent.click(firstTag)
    await userEvent.click(screen.getByRole('button', { name: /clear all filters/i }))
    expect(screen.queryByRole('complementary', { name: /active filters/i })).not.toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(10)
  })

  it('combining two tags applies AND logic and shows fewer results', async () => {
    render(<App />)
    const [frontendTag] = screen.getAllByRole('button', { name: /filter by frontend/i })
    await userEvent.click(frontendTag)
    const [juniorTag] = screen.getAllByRole('button', { name: /filter by junior/i })
    await userEvent.click(juniorTag)
    const filterBar = screen.getByRole('complementary', { name: /active filters/i })
    expect(within(filterBar).getByText('Frontend')).toBeInTheDocument()
    expect(within(filterBar).getByText('Junior')).toBeInTheDocument()
    const articles = screen.getAllByRole('article')
    expect(articles.length).toBeGreaterThan(0)
    expect(articles.length).toBeLessThan(10)
  })
})
