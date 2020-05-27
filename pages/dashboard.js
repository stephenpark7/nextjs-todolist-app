import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

import utilStyles from "../styles/utils.module.css"
import indexStyles from "../styles/index.module.css"

import { useCurrentUser } from "../lib/hooks";
import { useEffect, useState } from "react";

import axios from "axios";

export default function Dashboard() {

  const [isLoaded, setLoaded] = useState(null);
  const [getUser, setUser] = useState(null);
  
  const [getTaskList, setTaskList] = useState(null);


  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.get("/api/user");
        setUser(res.data.user);
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, []);

  console.log(getUser);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        {!isLoaded ? (
          <p>
            What are you waiting for? Just do it. Try this app out - it will help you achieve
            the goals that you have been putting off this whole time.
          </p>
        ) : (
          <div className={indexStyles.tasks}>
            Tasks
          </div>
        )}
      </section>

      {!isLoaded ? (
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
            {getTaskList && getTaskList.map(task => {
              return <li key={task.name}>{task.name}</li>;
            })}
          </ul>
          <input id="inputTask" type="text"></input>
          <button type="button" onClick={addNewTask}>Add new task</button><br />
          <button type="button" onClick={handleLogout}>Logout</button>
        </section>
      )}

    </Layout>
  )

  function addNewTask() {

  }

  async function handleLogout() {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
  }
}

// export async function getStaticProps() {
//   let data = {
//     user: null,
//     taskList: []
//   }

//   const res = await fetch("http://localhost:3000/api/user");
//   const userData = await res.json();

//   data.user = userData.user;

//   console.log(userData);

//   return { props: { data } };
// }