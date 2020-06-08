import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"
import Task from "../components/task";

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Table from "react-bootstrap/Table"

import { CSSTransition, TransitionGroup } from "react-transition-group";

import dashboardStyles from "../styles/dashboard.module.css"

import { getTaskList } from "../lib/hooks";

export default function Home() {

  const { tasks, mutate } = getTaskList();

  // ADD A NEW TASK
  async function addNewTask() {

    const inputTask = document.getElementById("inputTask");
    if (!inputTask.value) return;

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

  function handleMutate() {
    mutate(tasks);
  }

  // RENDER
  return (
    <>
      {tasks !== undefined ?
        <Layout header="Dashboard" >
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
              <TransitionGroup component="tbody">
                {tasks && tasks.map(task => {
                  return (
                    <CSSTransition
                      key={task._id}
                      timeout={500}
                      classNames={{
                        enter: dashboardStyles["fade-enter"],
                        enterActive: dashboardStyles["fade-enter-active"],
                        exit: dashboardStyles["fade-enter-exit"],
                        exitActive: dashboardStyles["fade-exit-active"]
                      }}>
                      <Task key={task._id} id={task._id} name={task.name} 
                            done={task.done} date={task.dueDate && new Date(parseInt(task.dueDate))} 
                            setMutate={handleMutate} />
                    </CSSTransition>
                  )
                })}
              </TransitionGroup>
            </Table>

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