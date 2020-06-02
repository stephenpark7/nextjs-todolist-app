import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import DatePicker from "react-datepicker"

import dashboardStyles from "../styles/dashboard.module.css"

import { useRef, useState } from "react"

export default function Task( props ) {

  // STATES
  const [getTaskId] = useState(props.id);
  const [getTaskName, setTaskName] = useState(props.name);
  const [getTaskDone, setTaskDone] = useState(props.done);
  const [getDate, setDate] = useState(props.date);
  const [getEditMode, setEditMode] = useState(false);
  const textInputRef = useRef(null);

  // TOGGLE TASK
  async function handleToggle() {
    const res = await fetch("/api/tasks/" + getTaskId + "?done=" + getTaskDone, {
      method: "PUT"
    });
    if (res.status === 201) {
      setTaskDone(!getTaskDone);
      props.setMutate();
    }
  }

  // EDIT A TASK
  async function handleEdit(e) {
    e.stopPropagation();
    setEditMode(true);
  }

  // CHANGE TASK NAME
  async function handleConfirm() {
    const newTaskName = textInputRef.current.value;
    const res = await fetch("/api/tasks/" + getTaskId + "?taskName=" + newTaskName, {
      method: "PUT"
    });
    if (res.status === 201) {
      setTaskName(newTaskName);
      setEditMode(false);
      props.setMutate();
    }
  }

  function handleCancel() {
    setEditMode(false);
  }

  // DRAG MODE
  function handleTaskClick(e) {
    // --
  }

  // DELETE A TASK
  async function handleDelete() {
    const res = await fetch("/api/tasks/" + getTaskId, {
        method: "DELETE"
    });
    if (res.status === 201) {
      props.setMutate();
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
      props.setMutate();
    }
  }

  // RENDER
  return (
    <tr key={getTaskId} className={getTaskDone ? dashboardStyles.taskDone : ""}>
      <td onClick={handleToggle}>
        <span className={dashboardStyles.toggleBtn}>&#10004;</span>
      </td>
      <td onClick={handleTaskClick}>
        {getEditMode === false ? <span className={dashboardStyles.taskNameSpan} onClick={handleEdit}>{getTaskName}</span> : 
          <div className={dashboardStyles.taskNameDiv}>
            <InputGroup size="md">
              <FormControl ref={textInputRef} spellCheck="false" autoFocus className={dashboardStyles.taskNameInput} placeholder="Enter a new task name" defaultValue={getTaskName} aria-label="enterNewTaskName" required aria-describedby="inputGroup-sizing-md" />
              <Button className={dashboardStyles.confirmBtn} variant="success" onClick={handleConfirm}>&#10003;</Button>
              <Button className={dashboardStyles.cancelBtn} variant="danger" onClick={handleCancel}>&#10005;</Button>
            </InputGroup>
          </div>
        }
      </td>
      <td className={dashboardStyles.datePicker}>
        <DatePicker selected={getDate} onChange={handleChange}></DatePicker>
      </td>
      <td><Button variant="danger" className={dashboardStyles.taskBtn} type="button" onClick={handleDelete}>&#10005;</Button></td>
    </tr>
  )
}