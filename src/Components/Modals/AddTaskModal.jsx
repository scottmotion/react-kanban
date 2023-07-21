import { useState } from "react";
import styles from "./Modal.module.css"

export default function AddTaskModal(props) {

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    columnId: 'defaultValue',
    subtaskName: ''
  })

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

  const handleSubmit = (event) => { // TODO: validate form to ensure path and data are set
    event.preventDefault();
    if (newTask.name) {
      props.addTask(newTask)
    }
  }

  const columnOptions = props.columns.map((column, index) => (
    <option key={index} value={column.id}>{column.name}</option>
  ))

  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
      <div className={styles.modal}>
        <div className={styles.modalHeading}>Add New Task</div>
        <div className={styles.modalContent}>
          <form className={styles.modalForm} onSubmit={handleSubmit} autoComplete="off">

            <label className={styles.modalFormLabel}>
              Task Name
              <input
                  type="text"
                  placeholder="Task Name"
                  className={styles.modalFormInput}
                  name="name"
                  value={newTask.name}
                  onChange={handleChange}
              />
            </label>

            <label className={styles.modalFormLabel}>
              Description
              <textarea
                  // type="text"
                  placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                  className={`${styles.modalFormInput} ${styles.modalFormTextarea}`}
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
              />
            </label>

            <label className={styles.modalFormLabel}>
              Column
              <select
                  className={`${styles.modalFormInput} ${styles.modalFormSelect}`}
                  name="columnId"
                  value={newTask.columnId}
                  onChange={handleChange}
              >
                <option disabled value="defaultValue">Select Column</option>
                {columnOptions}
              </select>
            </label>

            <label className={styles.modalFormLabel}>
              Subtask Name
              <input
                  type="text"
                  placeholder="Subtask Name"
                  className={styles.modalFormInput}
                  name="subtaskName"
                  value={newTask.subtaskName}
                  onChange={handleChange}
              />
            </label>

            <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Create New Column</button>
            <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  )
}
