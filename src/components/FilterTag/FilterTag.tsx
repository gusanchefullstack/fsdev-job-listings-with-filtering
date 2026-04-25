import styles from './FilterTag.module.css'

interface FilterTagProps {
  label: string
  onAdd: (tag: string) => void
}

export default function FilterTag({ label, onAdd }: FilterTagProps) {
  return (
    <button
      className={styles.tag}
      onClick={() => onAdd(label)}
      aria-label={`Filter by ${label}`}
      type="button"
    >
      {label}
    </button>
  )
}
