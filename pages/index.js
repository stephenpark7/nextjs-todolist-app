import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

import utilStyles from "../styles/utils.module.css"
import indexStyles from "../styles/index.module.css"

import { getCurrentUser } from "../lib/hooks";

export default function Home() {

  const [user, { mutate } ] = getCurrentUser();

  return (
    <>
      {user !== undefined ?
        <Layout>
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
              {user === null ?
                <Link href="/signup">
                  <a>
                    <button className={utilStyles.btn}>Sign up</button>
                  </a>
                </Link> : <></>
              }
              {user === null ? 
                <Link href="/login">
                  <a>
                    <button className={utilStyles.btn}>Log in</button>
                  </a>
                </Link>
               : 
                <>
                  <Link href="/dashboard">
                    <a>
                      <button className={utilStyles.btn}>Dashboard</button>
                    </a>
                  </Link>
                  <button className={utilStyles.btn} type="button" onClick={handleLogout}>Logout</button>
                </>
              }
            </div>
          </section>
        </Layout>
      : 
        <Layout>
          <section className={utilStyles.headingMdCentered}>
            Loading...
          </section>
        </Layout>
      }
    </>
  )

  async function handleLogout() {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  }
}