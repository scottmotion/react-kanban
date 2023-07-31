// TODO: See UpdateBoardModal.jsx for example

import { useState } from "react";
import { ReactComponent as CrossIcon } from "/src/assets/icons/icon-cross.svg"

import styles from "./Modal.module.css"

export default function UpdateTaskModal(props) {

  const themeClass = props.darkMode ? styles.darkMode : styles.lightMode;

  const [tempTask, setTempTask] = useState({
    name: props.currentTask.name,
    id: props.currentTask.id,
    description: props.currentTask.description,
    columnId: props.currentTask.columnId
  })

  const [tempSubtasks, setTempSubtasks] = useState(props.currentTask.subtasks)
  // console.log("tempColumns: ", tempColumns)

  const [removedSubtasks, setRemovedSubtasks] = useState([])
  // console.log("removedColumns: ", removedColumns)

  const tempSubtaskInputs = tempSubtasks.map((subtask, index) => (
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

   const columnOptions = props.columns.map((column, index) => (
    <option className={styles.modalFormOption} key={index} value={column.id}>{column.name}</option>
  )) 

  // let modalClassName = "modal"
  // if (props.darkMode) {
  //   modalClassName += " dark-mode"
  // } else {
  //   modalClassName += " light-mode"
  // }

  function handleChange(event) {
    const {name, value} = event.target
    setTempTask(prevTempTask => ({
        ...prevTempTask,
        [name]: value
    }))
  }

  function handleNewSubtask(event) {
    event.preventDefault();
    console.log("New Subtask Clicked")
    setTempSubtasks([
      ...tempSubtasks,
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
      name: subtaskValue
    }
    console.log(tempSubtask)

    setTempSubtasks(tempSubtasks.map((s, index) => {
      if (index === subtaskId) {
        return ({...s, ...tempSubtask});
      } else {
        return s;
      }
    }));
  }

  function handleRemoveSubtask(event, subtaskIndex) {
    event.preventDefault();
    console.log("Remove Subtask Clicked: ", subtaskIndex)
    setTempSubtasks(
      tempSubtasks.filter((s, index) =>
        index !== subtaskIndex
      )
    );
  }

  const handleSubmit = (event) => { // TODO: validate form to ensure path and data are set
    event.preventDefault();
    let tempData = {...tempTask, subtasks: tempSubtasks}
    if (tempTask.name) {
      props.editItem(tempData)
    }
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
      <div className={`${styles.modal} ${themeClass}`}>
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
                value={tempTask.name}
                onChange={handleChange}
              />
            </label>

            <label className={styles.modalFormLabel}>
              Description
              <textarea
                placeholder="e.g. It's always good to take a break. 15 minutes will recharge the batteries a little."
                className={`${styles.modalFormInput} ${styles.modalFormTextarea}`}
                name="description"
                value={tempTask.description}
                onChange={handleChange}
              />
            </label>

            <fieldset className={styles.modalFormFieldset}>
              <legend className={styles.modalFormLegend}>Subtasks</legend>
              {tempSubtaskInputs}
            </fieldset>

            <button className={`${styles.btn} ${styles.addBtn}`} onClick={(e) => handleNewSubtask(e)}>+ Add New Subtask</button>

            <label className={styles.modalFormLabel}>
              Column
              <select
                className={`${styles.modalFormInput} ${styles.modalFormSelect}`}
                name="columnId"
                value={tempTask.columnId}
                onChange={handleChange}
              >
                {/* <option disabled value="defaultValue">Select Column</option> */}
                {columnOptions}
              </select>
            </label>

            <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Save</button>
            {/* <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button> */}
          </form>
        </div>
      </div>
    </>
  )
}