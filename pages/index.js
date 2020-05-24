import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'

import utilStyles from '../styles/utils.module.css'
import indexStyles from '../styles/index.module.css'

export default function Home({ allPostsData }) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          What are you waiting for? Just do it. Try this app out - it will help you achieve
          the goals that you have been putting off this whole time.
        </p>
      </section>

      <section className={utilStyles.headingMd}>
        <div className={indexStyles.btnDiv}>
          <Link href="/register">
            <a>
              <button className={utilStyles.btn}>Register</button>
            </a>
          </Link>

          <Link href="/login">
            <a>
              <button className={utilStyles.btn}>Log in</button>
            </a>
          </Link>
        </div>
      </section>

    </Layout>
  )
}