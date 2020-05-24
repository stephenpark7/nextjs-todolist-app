import Head from "next/head"
import Link from "next/link"

import Layout, { siteTitle } from "../components/layout"
import Alert from "../components/alert"

import utilStyles from "../styles/utils.module.css"
import styles from "../styles/account.module.css"

import { useState } from "react";
import Router from "next/router";

import { useUser } from "../lib/hooks";

export default function Register(props) {

  const [user, { mutate }] = useUser();
  const [alertMsg, setAlertMsg] = useState(null);

// console.log(user);

//   useEffect(() => {
//     if (user) Router.push("/");
//   }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      confirmPassword: e.currentTarget.confirmPassword.value,
    };

    const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
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
            <label className={styles.label} htmlFor="username">Choose a username:</label>
            <input className={styles.input} id="username" type="text" required></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="email">Your email:</label>
            <input className={styles.input} id="email" type="email" required></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="password">Your password:</label>
            <input className={styles.input} id="password" type="password" required></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="confirmPassword">Confirm password:</label>
            <input className={styles.input} id="confirmPassword" type="password" required></input>
          </div>

          <div className={styles.btnDiv}>
            <button type="submit" className={utilStyles.btn}>Create an account</button>
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