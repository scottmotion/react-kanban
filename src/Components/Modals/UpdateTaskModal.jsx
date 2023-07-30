// TODO: See UpdateBoardModal.jsx for example

import { useState } from "react";
import { ReactComponent as CrossIcon } from "/src/assets/icons/icon-cross.svg"

import styles from "./Modal.module.css"

export default function UpdateTaskModal(props) {

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
      <button className={`${styles.btn} ${styles.deleteBtnCircle}`} onClick={(e) => {handleRemoveSubtask(e, index)}}>
        <CrossIcon className={`${styles.deleteBtnIcon}`}/>
      </button>
    </div>
  ))

  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
      <div className={styles.modal}>
        <div className={styles.modalHeading}>Edit Task</div>
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
                placeholder="e.g. It's always good to take a break. 15 minutes will recharge the batteries a little."
                className={`${styles.modalFormInput} ${styles.modalFormTextarea}`}
                name="description"
                value={newTask.description}
                onChange={handleChange}
              />
            </label>

            <fieldset className={styles.modalFormFieldset}>
              <legend className={styles.modalFormLegend}>Subtasks</legend>
              {newSubtaskInputs}
            </fieldset>

            <button className={`${styles.btn} ${styles.addBtn}`} onClick={(e) => handleNewSubtask(e)}>+ Add New Subtask</button>

            <label className={styles.modalFormLabel}>
              Column
              <select
                className={`${styles.modalFormInput} ${styles.modalFormSelect}`}
                name="columnId"
                value={newTask.columnId}
                onChange={handleChange}
              >
                {/* <option disabled value="defaultValue">Select Column</option> */}
                {columnOptions}
              </select>
            </label>

            <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Create Task</button>
            {/* <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button> */}
          </form>
        </div>
      </div>
    </>
  )
}
