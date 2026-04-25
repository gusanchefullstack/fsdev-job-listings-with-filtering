import styles from './FilterBar.module.css'

interface FilterBarProps {
  filters: string[]
  onRemove: (tag: string) => void
  onClear: () => void
}

export default function FilterBar({ filters, onRemove, onClear }: FilterBarProps) {
  if (filters.length === 0) return null

  return (
    <aside className={styles.bar} aria-label="Active filters">
      <ul className={styles.chips} role="list">
        {filters.map((tag) => (
          <li key={tag} className={styles.chip}>
            <span className={styles.chipLabel}>{tag}</span>
            <button
              className={styles.removeBtn}
              onClick={() => onRemove(tag)}
              aria-label={`Remove ${tag} filter`}
              type="button"
            >
              <img src="/images/icon-remove.svg" alt="" aria-hidden="true" width="14" height="14" />
            </button>
          </li>
        ))}
      </ul>
      <button
        className={styles.clearBtn}
        onClick={onClear}
        type="button"
        aria-label="Clear all filters"
      >
        Clear
      </button>
    </aside>
  )
}
