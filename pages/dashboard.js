import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Table from "react-bootstrap/Table"

import dashboardStyles from "../styles/dashboard.module.css"

import { getCurrentUser, getTaskList } from "../lib/hooks";

export default function Home() {

  //const [user] = getCurrentUser();
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

    const res = await fetch("/api/tasks/" + id, {
        method: "DELETE"
    });

    if (res.status === 201) {
      mutate(tasks);
    }

  }

  // TOGGLE TASK
  async function toggleTask(id) {

    const res = await fetch("/api/tasks/" + id, {
      method: "PUT"
    });

    if (res.status === 201) {
      mutate(tasks);
    }

  }

  // SET DUE DATE
  async function setDueDate(id) {

    console.log("k")

  }

  // RENDER
  return (
    <>
      {tasks !== undefined ?
        <Layout>
          <Head>
            <title>{siteTitle}</title>
          </Head>

          <Container>

            <Table striped bordered hover className={dashboardStyles.taskTable}>
              <thead>
                <tr>
                  <th></th>
                  <th>Task name</th>
                  <th>Due date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tasks && tasks.map(task => {
                  return (
                    <tr className={task.done ? dashboardStyles.taskDone : ""} key={task._id}>
                      <td onClick={() => toggleTask(task._id)}>
                        <span className={dashboardStyles.toggleBtn}>&#10004;</span>
                      </td>
                      <td>{task.name}</td>
                      <td className={dashboardStyles.datePicker} onClick={() => setDueDate(task._id)}>
                        <input type="date"></input>
                      </td>
                      <td><Button variant="secondary" className={dashboardStyles.taskBtn} type="button" onClick={() => deleteTask(task._id)}>&#10005;</Button></td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>


            {/* <ul className={dashboardStyles.ul}>
              {tasks && tasks.map(task => {
                return <li className={dashboardStyles.li} key={task._id}><span onClick={() => toggleTask(task._id)}>{task.name}</span>
                <Button variant="secondary" className={dashboardStyles.taskBtn} type="button" onClick={() => deleteTask(task._id)}>X</Button></li>;
              })}
            </ul> */}

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
          <Container>
            Loading...
          </Container>
        </Layout>
      }
    </>
  )
}