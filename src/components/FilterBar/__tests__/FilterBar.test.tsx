import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterBar from '../FilterBar'

describe('FilterBar', () => {
  it('renders nothing when filters is empty', () => {
    const { container } = render(
      <FilterBar filters={[]} onRemove={vi.fn()} onClear={vi.fn()} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renders one chip per active filter', () => {
    render(
      <FilterBar filters={['Frontend', 'Junior', 'React']} onRemove={vi.fn()} onClear={vi.fn()} />
    )
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Junior')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('each chip has a remove button with correct aria-label', () => {
    render(
      <FilterBar filters={['Frontend', 'Junior']} onRemove={vi.fn()} onClear={vi.fn()} />
    )
    expect(screen.getByRole('button', { name: 'Remove Frontend filter' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove Junior filter' })).toBeInTheDocument()
  })

  it('clicking a remove button calls onRemove with the correct tag', async () => {
    const onRemove = vi.fn()
    render(
      <FilterBar filters={['Frontend', 'Junior']} onRemove={onRemove} onClear={vi.fn()} />
    )
    await userEvent.click(screen.getByRole('button', { name: 'Remove Junior filter' }))
    expect(onRemove).toHaveBeenCalledOnce()
    expect(onRemove).toHaveBeenCalledWith('Junior')
  })

  it('renders a Clear button', () => {
    render(
      <FilterBar filters={['Frontend']} onRemove={vi.fn()} onClear={vi.fn()} />
    )
    expect(screen.getByRole('button', { name: /clear all filters/i })).toBeInTheDocument()
  })

  it('clicking Clear calls onClear', async () => {
    const onClear = vi.fn()
    render(
      <FilterBar filters={['Frontend']} onRemove={vi.fn()} onClear={onClear} />
    )
    await userEvent.click(screen.getByRole('button', { name: /clear all filters/i }))
    expect(onClear).toHaveBeenCalledOnce()
  })
})
