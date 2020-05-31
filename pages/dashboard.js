import Head from "next/head"
import Link from "next/link"
import Layout, { siteTitle } from "../components/layout"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Table from "react-bootstrap/Table"

import dashboardStyles from "../styles/dashboard.module.css"

import { getTaskList } from "../lib/hooks";

import { useState } from "react";
import Task from "../components/task";

export default function Home() {

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

  function handleDelete() {
    mutate(tasks);
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
                    <Task key={task._id} id={task._id} name={task.name} 
                          done={task.done} date={task.dueDate && new Date(parseInt(task.dueDate))} 
                          delete={handleDelete} />
                  )
                })}
              </tbody>
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