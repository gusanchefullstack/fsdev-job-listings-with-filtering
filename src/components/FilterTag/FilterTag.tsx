import styles from './FilterTag.module.css'

interface FilterTagProps {
  label: string
  isActive?: boolean
  onAdd: (tag: string) => void
}

export default function FilterTag({ label, isActive = false, onAdd }: FilterTagProps) {
  return (
    <button
      className={styles.tag}
      onClick={() => onAdd(label)}
      aria-label={`Filter by ${label}`}
      aria-pressed={isActive}
      type="button"
    >
      {label}
    </button>
  )
}
