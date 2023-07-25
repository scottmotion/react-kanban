import { useState } from "react";
import styles from "./Modal.module.css"

export default function ShowTaskModal(props) {

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    columnId: props.columns[0].id,
  })

  const [newSubtasks, setNewSubtasks] = useState([{
    name: '',
    isCompleted: false
  }])

  let modalClassName = "modal"
  if (props.darkMode) {
    modalClassName += " dark-mode"
  } else {
    modalClassName += " light-mode"
  }

  function handleChange(event) {
    const {name, value} = event.target
    setNewTask(prevNewTask => ({
        ...prevNewTask,
        [name]: value
    }))
  }

  function handleNewSubtask(event) {
    event.preventDefault();
    console.log("New Subtask Clicked")
    setNewSubtasks([
      ...newSubtasks,
      {
        name: '',
        isCompleted: false
      }
    ]);
  }

  function handleChangeSubtask(event, subtaskIndex) {
    const subtaskValue = event.target.value
    const subtaskId = subtaskIndex
    const tempSubtask = {
      name: subtaskValue,
      isCompleted: false
    }
    console.log(tempSubtask)

    setNewSubtasks(newSubtasks.map((s, index) => {
      if (index === subtaskId) {
        return tempSubtask;
      } else {
        return s;
      }
    }));
  }

  function handleRemoveSubtask(event, subtaskIndex) {
    event.preventDefault();
    console.log("Remove Subtask Clicked: ", subtaskIndex)
    setNewSubtasks(
      newSubtasks.filter((s, index) =>
        index !== subtaskIndex
      )
    );
  }

  const handleSubmit = (event) => { // TODO: validate form to ensure path and data are set
    event.preventDefault();
    if (newTask.name) {
      props.addTask(newTask, newSubtasks)
    }
  }

  const columnOptions = props.columns.map((column, index) => (
    <option className={styles.modalFormOption} key={index} value={column.id}>{column.name}</option>
  ))

  const newSubtaskInputs = newSubtasks.map((subtask, index) => (
    <div className={styles.modalFormInputWrapper} key={index}>
      <label className={styles.modalFormLabel}>
        <input
          type="text"
          placeholder="Subtask Name"
          className={styles.modalFormInput}
          name="subtaskName"
          id={index}
          value={subtask.name}
          onChange={(e) => handleChangeSubtask(e, index)}
        />
      </label>
      <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={(e) => {handleRemoveSubtask(e, index)}}>X</button>
    </div>
  ))

  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
      <div className={styles.modal}>
        <div className={styles.modalHeading}>{props.currentTask.title}</div>
        <div className={styles.modalContent}>
          <div>Description</div>
          <div>{props.currentTask.description}</div>
          <div>Subtasks</div>
          <div>Column</div>
        </div>
      </div>
    </>
  )
}
