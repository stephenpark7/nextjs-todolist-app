import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

import utilStyles from '../styles/utils.module.css'
import indexStyles from '../styles/index.module.css'

import { useUser } from "../lib/hooks";

function Dashboard({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Dashboard</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          What are you waiting for? Just do it. Try this app out - it will help you achieve
          the goals that you have been putting off this whole time.
        </p>
      </section>
    </Layout>
  )
}

// Home.getInitialProps = async (ctx) => {
//   console.log("Hi")
//   return 
// }

export default Dashboard;