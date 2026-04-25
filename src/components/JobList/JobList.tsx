import type { Job } from '../../types/job'
import JobCard from '../JobCard/JobCard'
import styles from './JobList.module.css'

interface JobListProps {
  jobs: Job[]
  activeFilters: string[]
  onAddFilter: (tag: string) => void
}

export default function JobList({ jobs, activeFilters, onAddFilter }: JobListProps) {
  return (
    <section aria-label="Job listings" className={styles.list}>
      <h2 className={styles.srOnly}>Job listings</h2>
      {jobs.length === 0 ? (
        <p className={styles.empty}>No job listings match your current filters.</p>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} activeFilters={activeFilters} onAddFilter={onAddFilter} />
        ))
      )}
    </section>
  )
}
