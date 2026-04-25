import type { Job } from '../../types/job'
import FilterTag from '../FilterTag/FilterTag'
import styles from './JobCard.module.css'

interface JobCardProps {
  job: Job
  activeFilters: string[]
  onAddFilter: (tag: string) => void
}

export default function JobCard({ job, activeFilters, onAddFilter }: JobCardProps) {
  const tags = [job.role, job.level, ...job.languages, ...job.tools]

  return (
    <article
      className={`${styles.card} ${job.featured ? styles.featured : ''}`}
      aria-label={`${job.position} at ${job.company}`}
    >
      <div className={styles.logoWrapper}>
        <img src={job.logo} alt={`${job.company} logo`} className={styles.logo} />
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.companyRow}>
            <span className={styles.company}>{job.company}</span>
            {job.new && <span className={styles.badgeNew}>New!</span>}
            {job.featured && <span className={styles.badgeFeatured}>Featured</span>}
          </div>

          <h2 className={styles.position}>{job.position}</h2>

          <ul className={styles.meta} aria-label="Job details">
            <li>{job.postedAt}</li>
            <li aria-hidden="true" className={styles.dot}>•</li>
            <li>{job.contract}</li>
            <li aria-hidden="true" className={styles.dot}>•</li>
            <li>{job.location}</li>
          </ul>
        </div>

        <hr className={styles.divider} aria-hidden="true" />

        <div className={styles.tags} aria-label="Filter tags">
          {tags.map((tag) => (
            <FilterTag
              key={`${job.id}-${tag}`}
              label={tag}
              isActive={activeFilters.includes(tag)}
              onAdd={onAddFilter}
            />
          ))}
        </div>
      </div>
    </article>
  )
}
