import Layout from "../components/layout"
import Link from "next/link"
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
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value
    };

    const res = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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

      <Alert type="error">
        {alertMsg && alertMsg}
      </Alert>

      <section className={styles.container}>

        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="username">Username:</label>
            <input className={styles.input} id="username" type="text"></input>
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