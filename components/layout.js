import Head from 'next/head'
import layoutStyles from './layout.module.css'
// import utilStyles from '../styles/utils.module.css'

import Container from "react-bootstrap/Container";

export const siteTitle = "To Do List"
const headerTitle = "To Do List";

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="todolist" />
      </Head>

      <header className={layoutStyles.header}>
        <h1>{headerTitle}</h1>
      </header>

      <main>{children}</main>
    </>
  )
}