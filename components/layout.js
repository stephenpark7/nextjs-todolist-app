import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'JUST DO IT | The App To Help You Get Started'
const headerTitle = "JUST DO IT";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="todolist"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <h1 className={utilStyles.heading2Xl}>{headerTitle}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}