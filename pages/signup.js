import Head from "next/head"
import Link from "next/link"

import Layout from "../components/layout"
import Alert from "../components/alert"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

import styles from "../styles/index.module.css"

import { useState } from "react"
import Router from "next/router"

export default function Register(props) {

  const [alertMsg, setAlertMsg] = useState(null);

  // SIGN UP
  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value
    };

    const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (res.status === 201) {
      Router.push("/");
    } else {
      setAlertMsg(await res.text());
    }
  }

  return (
    <Layout>
      <Head>
        <title>Sign up</title>
      </Head>

      <Alert type="error">
        {alertMsg && alertMsg}
      </Alert>

      <Container>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies massa nec mi mollis.
        </p>

        <form onSubmit={handleSubmit}>
          
          <InputGroup size="md" className="mb-3">
            <FormControl id="name" aria-label="name" placeholder="Your name" required aria-describedby="inputGroup-sizing-md" />
          </InputGroup>

          <InputGroup size="md" className="mb-3">
            <FormControl id="email" type="email" placeholder="Email address" required aria-label="email" aria-describedby="inputGroup-sizing-md" />
          </InputGroup>

          <InputGroup size="md" className="mb-3">
            <FormControl id="password" type="password" placeholder="Password" required aria-label="password" aria-describedby="inputGroup-sizing-md" />
          </InputGroup>

          <div className={styles.btns}>
            <Button type="submit">Sign up</Button>
            <Link href="/">
              <a>
                <Button type="button">Go back</Button>
              </a>
            </Link>
          </div>

        </form>
        
      </Container>

    </Layout>
  )
}