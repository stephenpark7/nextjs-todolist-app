import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

import utilStyles from "../styles/utils.module.css"
import indexStyles from "../styles/index.module.css"

import { useCurrentUser } from "../lib/hooks";
import { useEffect, useState } from "react";

export default function Home() {
  const [user] = useCurrentUser();
  const [getTaskList, setTaskList] = useState(null);

  // useEffect(() => {
  //   loadTaskList();
  // }, []);

  // async function loadTaskList() {
  //   try {
  //     const res = await fetch("/api/tasks");

  //     if (res.status === 200) {
  //       const result = await res.json();
  //       setTaskList(result);
  //       //console.log(result);
  //     } else {
  //       console.log("errror!!")
  //     }
  //   }
  //   catch(e) {
  //     console.log(e);
  //   }
  // }

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

      {!getTaskList ? (
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
            {getTaskList.map(task => {
              return <li key={task.name}>{task.name}</li>;
            })}
          </ul>
          <input id="inputTask" type="text"></input>
          <button type="button" onClick={addNewTask}>Add new task</button><br />
          <button type="button" onClick={logout}>Logout</button>
        </section>
      )}

    </Layout>
  )

  // async function logout() {
  //   await fetch('/api/auth', {
  //     method: 'DELETE',
  //   });
  //   res.Link
  // }

  // async function addNewTask() {
  //   const taskName = document.getElementById("inputTask").value;

  //   const data = {
  //     name: taskName,
  //     deadline: null,
  //     progress: null
  //   }

  //   const res = await fetch("/api/tasks", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(data)
  //   });

  //   if (res.status === 200) {
  //     document.getElementById("inputTask").value = null;
  //     loadTaskList(); // prob better to just do it locally instead of fetching
  //   } else {
  //     console.log("errror!!")
  //   }
  // }
}

// <li>Hit the gym</li>
// <li className={indexStyles.checked}>Pay bills</li>
// <li>Meet George</li>
// <li>Buy eggs</li>
// <li>Read a book</li>
// <li>Organize office</li>