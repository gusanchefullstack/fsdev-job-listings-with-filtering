import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <h1 className={styles.srOnly}>Job Listings with Filtering</h1>
    </header>
  )
}
