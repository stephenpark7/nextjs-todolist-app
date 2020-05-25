import Head from "next/head"
import Link from "next/link"

import Layout from "../components/layout"
import Alert from "../components/alert"

import utilStyles from "../styles/utils.module.css"
import styles from "../styles/account.module.css"

import { useState } from "react";
import Router from "next/router";

export default function Register(props) {

  const [alertMsg, setAlertMsg] = useState(null);

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

      <section className={styles.container}>

        <form onSubmit={handleSubmit} className={styles.form}>
          
        <div className={styles.row}>
            <label className={styles.label} htmlFor="name">Your name:</label>
            <input className={styles.input} id="name" type="name" required></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="email">Your email:</label>
            <input className={styles.input} id="email" type="email" required></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="password">Your password:</label>
            <input className={styles.input} id="password" type="password" required></input>
          </div>

          <div className={styles.btnDiv}>
            <button type="submit" className={utilStyles.btn}>Sign up</button>
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