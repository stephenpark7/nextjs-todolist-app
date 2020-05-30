import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

// import utilStyles from "../styles/utils.module.css"
// import indexStyles from "../styles/index.module.css"
import dashboardStyles from "../styles/dashboard.module.css"

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

          <Container>
            <ul className={dashboardStyles.ul}>
              {tasks && tasks.map(task => {
                return <li className={dashboardStyles.li} key={task._id}>{task.name}
                <Button variant="secondary" className={dashboardStyles.taskBtn} type="button" onClick={() => deleteTask(task._id)}>X</Button></li>;
              })}
            </ul>

            <br />
            <InputGroup size="md" className="mb-3">
              <FormControl id="inputTask" aria-label="taskname" placeholder="Task name" required aria-describedby="inputGroup-sizing-md" />
              <Button type="button" onClick={addNewTask}>
                Add new task
              </Button>
            </InputGroup>

            <Link href="/">
              <a>
                <Button className={dashboardStyles.goBackBtn}>Go back</Button>
              </a>
            </Link>

          </Container>
        </Layout>
      : 
        <Layout>
          Loading...
        </Layout>
      }
    </>
  )
}