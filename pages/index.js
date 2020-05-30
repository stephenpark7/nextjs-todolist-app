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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies massa nec mi mollis, 
              at tincidunt tortor lobortis. Aenean vel massa at eros suscipit suscipit non id metus. Phasellus eget pharetra metus. 
            </p>
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