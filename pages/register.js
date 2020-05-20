import Layout from "../components/layout"
import Link from "next/link"
import Alert from "../components/alert"

import utilStyles from "../styles/utils.module.css"
import styles from "../styles/account.module.css"
import cn from "classnames"

import { useState } from "react";

export default function Register(props) {

  const [alertType, setAlert] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

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
      console.log(userObj);
    } else {
      setAlert("error");
      setAlertMsg(await res.text());
    }

    // if (data.password !== data.confirmPassword) {
    //   setAlert("error");
    //   setAlertMsg("Passwords do not match, please check again.");
    // }
    // else if (data.username === "already exists") {
    //   setAlert("error");
    //   setAlertMsg("Username already exists, please try a different one.");
    // }
    // else {

    //   fetch("../api/register", {
    //     method: "POST",
    //     headers: {
    //       "Accept": "application/json, text/plain, */*",
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(data)
    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    //   // setAlert(null);
    //   // setAlertMsg(null);
    // }

  }

  return (
    <Layout>

      <Alert type={alertType}>
        {alertMsg && alertMsg}
      </Alert>

      <section className={styles.container}>

        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="username">Choose a username:</label>
            <input className={styles.input} id="username" type="text"></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="email">Your email:</label>
            <input className={styles.input} id="email" type="email"></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="password">Your password:</label>
            <input className={styles.input} id="password" type="password"></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="confirmPassword">Confirm password:</label>
            <input className={styles.input} id="confirmPassword" type="password"></input>
          </div>

          {/* <div className={styles.row}>
            <label className={styles.label} htmlFor="username">Choose a username:</label>
            <input className={styles.input} id="username" type="text" required></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="email">Your email:</label>
            <input className={styles.input} id="email" type="email" required></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="password">Your password:</label>
            <input className={styles.input} id="password" type="password" minLength="8" required></input>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="confirm-password">Confirm password:</label>
            <input className={styles.input} id="confirm-password" type="password" minLength="8" required></input>
          </div> */}

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