import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

import utilStyles from "../styles/utils.module.css"
import indexStyles from "../styles/index.module.css"
import dashboardStyles  from "../styles/dashboard.module.css"

import { getCurrentUser, getTaskList } from "../lib/hooks";

export default function Home() {

  const [user] = getCurrentUser();
  const { tasks, mutate } = getTaskList();

  // ADD A NEW TASK
  async function addNewTask() {

    const inputTask = document.getElementById("inputTask");

    const data = {
      taskName: inputTask.value
    };

    const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (res.status === 201) {
      inputTask.value = "";
      mutate(tasks);
    }

  }

  // DELETE A TASK
  async function deleteTask(id) {

    const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({taskId: id})
    });

    if (res.status === 201) {
      mutate(tasks);
    }

  }

  // RENDER
  return (
    <>
      {user !== undefined ?
        <Layout>
          <Head>
            <title>{siteTitle}</title>
          </Head>

          <section className={utilStyles.headingMd}>
            <div className={dashboardStyles.tasks}>
              Tasks
            </div>
          </section>

          <section className={utilStyles.headingMd}>
            <ul className={dashboardStyles.ul}>
              {tasks && tasks.map(task => {
                return <li className={dashboardStyles.li} key={task._id}>{task.name}
                <button className={dashboardStyles.taskBtn} type="button" onClick={() => deleteTask(task._id)}>X</button></li>;
              })}
            </ul>

            <br />
            <input className={dashboardStyles.input} id="inputTask" type="text" placeholder="Task name"></input>
            <button className={dashboardStyles.addNewTaskBtn} type="button" onClick={addNewTask}>
              Add new task
            </button><br />

            <br />
            <Link href="/">
              <a>
                <button className={dashboardStyles.goBackBtn}>Go back</button>
              </a>
            </Link>

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
}