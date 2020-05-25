import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

import utilStyles from "../styles/utils.module.css"
import indexStyles from "../styles/index.module.css"

import { useCurrentUser } from "../lib/hooks";

export default function Home({ allPostsData }) {
  const [user] = useCurrentUser();

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        {!user ? (
          <>
            <p>
              What are you waiting for? Just do it. Try this app out - it will help you achieve
              the goals that you have been putting off this whole time.
            </p>
          </>
        ) : (
          <div className={indexStyles.tasks}>
            Tasks
          </div>
        )}
      </section>

      {!user ? (
        <section className={utilStyles.headingMd}>
          <div className={indexStyles.btnDiv}>
              <Link href="/signup">
                <a>
                  <button className={utilStyles.btn}>Sign up</button>
                </a>
              </Link>
              <Link href="/login">
                <a>
                  <button className={utilStyles.btn}>Log in</button>
                </a>
              </Link>
          </div>
        </section>
      ) : (
        <section className={utilStyles.headingMd}>
          <ul className={indexStyles.ul}>
            <li>Hit the gym</li>
            <li className={indexStyles.checked}>Pay bills</li>
            <li>Meet George</li>
            <li>Buy eggs</li>
            <li>Read a book</li>
            <li>Organize office</li>
          </ul>
        </section>
      )}

    </Layout>
  )
}