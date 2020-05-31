import Button from "react-bootstrap/Button"
import DatePicker from "react-datepicker"

import dashboardStyles from "../styles/dashboard.module.css"

import { useState } from "react"

export default function Task( props ) {

  // STATES
  const [getTaskId, setTaskId] = useState(props.id);
  const [getTaskName, setTaskName] = useState(props.name);
  const [getTaskDone, setTaskDone] = useState(props.done);
  const [getDate, setDate] = useState(props.date);

  // TOGGLE TASK
  async function handleToggle() {
    const res = await fetch("/api/tasks/" + getTaskId + "?done=" + getTaskDone, {
      method: "PUT"
    });
    if (res.status === 201) {
      setTaskDone(!getTaskDone);
    }
  }

  // DELETE A TASK
  async function handleDelete() {
    const res = await fetch("/api/tasks/" + getTaskId, {
        method: "DELETE"
    });
    if (res.status === 201) {
      props.delete();
    }
  }

  // CHANGE DUE DATE
  async function handleChange(date) {
    let dateInMs;
    if (date !== null) {
      dateInMs = date.getTime();
    }
    else {
      dateInMs = 0;
    }
    const res = await fetch("/api/tasks/" + getTaskId + "?dueDate=" + dateInMs, {
      method: "PUT"
    });
    if (res.status === 201) {
      setDate(date);
    }
  }

  // RENDER
  return (
    <tr key={getTaskId} className={getTaskDone ? dashboardStyles.taskDone : ""}>
      <td onClick={handleToggle}>
        <span className={dashboardStyles.toggleBtn}>&#10004;</span>
      </td>
      <td>{getTaskName}</td>
      <td className={dashboardStyles.datePicker}>
        <DatePicker selected={getDate} onChange={handleChange}></DatePicker>
      </td>
      <td><Button variant="danger" className={dashboardStyles.taskBtn} type="button" onClick={handleDelete}>&#10005;</Button></td>
    </tr>
  )
}