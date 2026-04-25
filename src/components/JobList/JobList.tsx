import type { Job } from '../../types/job'
import JobCard from '../JobCard/JobCard'
import styles from './JobList.module.css'

interface JobListProps {
  jobs: Job[]
  onAddFilter: (tag: string) => void
}

export default function JobList({ jobs, onAddFilter }: JobListProps) {
  return (
    <section aria-label="Job listings" className={styles.list}>
      {jobs.length === 0 ? (
        <p className={styles.empty}>No job listings match your current filters.</p>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} onAddFilter={onAddFilter} />
        ))
      )}
    </section>
  )
}
