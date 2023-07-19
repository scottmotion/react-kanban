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

  function handleChange(event) {
      const {value} = event.target
      setNewTask(prevNewTask => ({
          ...prevNewTask,
          name: value
      }))
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
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>New Task Modal</h5>
          </div>
          <div className={styles.modalContent}>
              <form className={styles.modalForm} onSubmit={handleSubmit}>
                  <input
                      type="text"
                      placeholder="Task Name"
                      className="form__input"
                      name="taskName"
                      value={newTask.name}
                      onChange={handleChange}
                  />
                  <button className={styles.btn} type="submit">Create New Task</button>
                  <button className={styles.cancelBtn} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
              </form>
          </div>
        </div>
      </div>
    </>
  )
}
