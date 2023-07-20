import { useState } from "react";
import styles from "./Modal.module.css"

export default function AddTaskModal(props) {

  const [newTask, setNewTask] = useState({
      name: ''
  })

  let modalClassName = "modal"
  if (props.darkMode) {
    modalClassName += " dark-mode"
  } else {
    modalClassName += " light-mode"
  }

  function handleChangeName(event) {
    const {value} = event.target
    setNewTask(prevNewTask => ({
        ...prevNewTask,
        name: value
    }))
  }

  function handleChangeDescription(event) {
    const {value} = event.target
    setNewTask(prevNewTask => ({
        ...prevNewTask,
        description: value
    }))
  }

  function handleChangeColumn(event) {
    const {value} = event.target
    setNewTask(prevNewTask => ({
        ...prevNewTask,
        column: value
    }))
    // console.log("Select Column: ", value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.name) {
      props.addTask(newTask)
    }
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeading}>New Task Modal</div>
          <div className={styles.modalContent}>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
                <label className={styles.modalFormLabel}>
                  Task Name
                  <input
                      type="text"
                      placeholder="e.g. Take coffee break"
                      className={styles.modalFormInput}
                      name="taskName"
                      value={newTask.name}
                      onChange={handleChangeName}
                  />
                </label>
                <label className={styles.modalFormLabel}>
                  Description
                  <textarea
                      type="text"
                      placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                      className={`${styles.modalFormInput} ${styles.modalFormTextarea}`}
                      name="taskDescription"
                      value={newTask.description}
                      onChange={handleChangeDescription}
                  />
                </label>
                <label className={styles.modalFormLabel}>
                  Column
                  <select
                      type="text"
                      placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                      className={`${styles.modalFormInput} ${styles.modalFormSelect}`}
                      name="taskColumn"
                      value={newTask.column}
                      onChange={handleChangeColumn}
                  >
                    <option value="1">Column 1</option>
                    <option value="2">Column 2</option>
                    <option value="3">Column 3</option>
                  </select>
                </label>
              <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Create New Task</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
