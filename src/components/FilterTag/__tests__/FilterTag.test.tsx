import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterTag from '../FilterTag'

describe('FilterTag', () => {
  it('renders a button with the label text', () => {
    render(<FilterTag label="Frontend" onAdd={vi.fn()} />)
    expect(screen.getByRole('button', { name: /filter by frontend/i })).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(<FilterTag label="React" onAdd={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Filter by React')
  })

  it('calls onAdd with the label when clicked', async () => {
    const onAdd = vi.fn()
    render(<FilterTag label="Junior" onAdd={onAdd} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onAdd).toHaveBeenCalledOnce()
    expect(onAdd).toHaveBeenCalledWith('Junior')
  })
})
