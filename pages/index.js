import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import indexStyles from "../styles/index.module.css";

import { getCurrentUser } from "../lib/hooks";

export default function Home() {

  // USER STATE
  const [user, { mutate } ] = getCurrentUser();

  // LOGOUT
  async function handleLogout() {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  }

  // RENDER
  return (
    <>
      {user !== undefined ?
        <Layout>
          <Head>
            <title>{siteTitle}</title>
          </Head>

          <Container>
            <p className={indexStyles.desc}>
              Create, organize, and manage tasks. The app to help you get organized
              and start doing!
            </p><br />
          </Container>
          
          <section className={indexStyles.btns}>
            {user === null ?
              <Link href="/signup">
                <a>
                  <Button>Sign up</Button>
                </a>
              </Link> : <></>
            }
            {user === null ? 
              <Link href="/login">
                <a>
                  <Button>Log in</Button>
                </a>
              </Link>
              : 
              <>
                <Link href="/dashboard">
                  <a>
                    <Button>Dashboard</Button>
                  </a>
                </Link>
                <Button type="button" onClick={handleLogout}>Logout</Button>
              </>
            }
          </section>
        </Layout>
      : 
        <Layout>
          <Container>
            Loading...
          </Container>
        </Layout>
      }
    </>
  )
}