import Head from "next/head"
import Link from "next/link"

import Layout from "../components/layout"
import Alert from "../components/alert"

import utilStyles from "../styles/utils.module.css"
import styles from "../styles/account.module.css"

import { useState } from "react";
import Router from "next/router";

export default function Login(props) {

  const [alertMsg, setAlertMsg] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    };

    const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (res.status === 200) {
      Router.push("/");
    } else {
      setAlertMsg("Incorrect username or password.");
    }
  }

  return (
    <Layout>
      <Head>
        <title>Sign in</title>
      </Head>

      <Alert type="error">
        {alertMsg && alertMsg}
      </Alert>

      <section className={styles.container}>

        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="email">Email:</label>
            <input className={styles.input} id="email" type="text"></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="password">Password:</label>
            <input className={styles.input} id="password" type="password"></input>
          </div>

          <div className={styles.btnDiv}>
            <button type="submit" className={utilStyles.btn}>Log in</button>
            <Link href="/">
              <a>
                <button type="button" className={utilStyles.btn}>Go back</button>
              </a>
            </Link>
          </div>

        </form>
        
      </section>
    </Layout>
  )
}