import { useState } from 'react'
import Header from './components/Header/Header'
import FilterBar from './components/FilterBar/FilterBar'
import JobList from './components/JobList/JobList'
import { jobs } from './data/jobs'
import { filterJobs } from './utils/filterJobs'
import styles from './App.module.css'

export default function App() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filteredJobs = filterJobs(jobs, activeFilters)

  function addFilter(tag: string) {
    setActiveFilters((prev) => (prev.includes(tag) ? prev : [...prev, tag]))
  }

  function removeFilter(tag: string) {
    setActiveFilters((prev) => prev.filter((f) => f !== tag))
  }

  function clearFilters() {
    setActiveFilters([])
  }

  const liveMessage = activeFilters.length > 0
    ? `${filteredJobs.length} job${filteredJobs.length === 1 ? '' : 's'} found for ${activeFilters.join(', ')}`
    : `Showing all ${filteredJobs.length} jobs`

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div aria-live="polite" aria-atomic="true" className={styles.srOnly}>
          {liveMessage}
        </div>
        <div className={styles.container}>
          {activeFilters.length > 0 && (
            <div className={styles.filterWrapper}>
              <FilterBar
                filters={activeFilters}
                onRemove={removeFilter}
                onClear={clearFilters}
              />
            </div>
          )}
          <div className={activeFilters.length > 0 ? styles.listWrapperFiltered : styles.listWrapper}>
            <JobList jobs={filteredJobs} activeFilters={activeFilters} onAddFilter={addFilter} />
          </div>
        </div>
      </main>
      <footer className={styles.attribution}>
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a href="https://github.com/gusanchefullstack" target="_blank" rel="noreferrer">
          Gustavo Sanchez
        </a>
        .
      </footer>
    </>
  )
}
