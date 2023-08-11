import EllipsisDropdown from "../Dropdowns/EllipsisDropdown";
import { useState, useEffect } from "react";
import { boardsCollection } from "../../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

import styles from "./Modal.module.css"

export default function ShowTaskModal(props) {

  const themeClass = props.darkMode ? styles.darkMode : styles.lightMode;

  let modalClassName
  if (props.darkMode) {
    modalClassName = "dark-mode"
  } else {
    modalClassName = "light-mode"
  }

  const [task, setTask] = useState({})
  const [subtasks, setSubtasks] = useState([])

  const taskRef = doc(boardsCollection, props.currentBoardId, "tasks", props.currentTask.id)
  // get boards from firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(taskRef, function(snapshot) {
      const tempTask = {
        ...snapshot.data(),
        id: snapshot.id
        
      }
      setTask(tempTask)
      setSubtasks(snapshot.data().subtasks)
    })
    return unsubscribe
  }, [])


  const handleChangeColumn = async (event) =>  {
    const taskId = props.currentTask.id
    const columnId = event.target.value

    await props.changeTaskColumn(taskId,columnId)

  }

  const handleSubtaskCheckbox = async (event, subtask, subtaskIndex) => {
    const subtaskId = subtaskIndex
    const checked = event.target.checked
    const tempSubtask = {
      ...subtask,
      isCompleted: checked
    }
    const tempSubtasksArray = subtasks.map((s, index) => {
      if (index === subtaskId) {
        return tempSubtask;
      } else {
        return s;
      }

    })

    setSubtasks(subtasks.map((s, index) => {
      if (index === subtaskId) {
        return tempSubtask;
      } else {
        return s;
      }

    }))

    return await updateDoc(taskRef, { subtasks : tempSubtasksArray } )

  }

  const columnOptions = props.columns.map((column, index) => (
    <option className={styles.modalFormOption} key={index} value={column.id}>{column.name}</option>
  ))

  const newSubtaskInputs = subtasks.map((subtask, index) => (
    <div className={styles.modalFormInputWrapper} key={index}>

      <label className={`${styles.modalFormLabel} ${styles.modalFormLabelCheckbox}`}>
        <input
          type="checkbox"
          className={styles.modalFormInput}
          name="isCompleted"
          id={index}
          // value={subtask.isCompleted}
          onChange={(e) => handleSubtaskCheckbox(e, subtask, index)}
          checked={subtask.isCompleted}
        />
      </label>

      <label className={styles.modalFormLabel}>
        <input
          type="text"
          placeholder="Subtask Name"
          className={`${styles.modalFormInput} ${styles.inputReadOnly}`}
          name="subtaskName"
          id={index}
          value={subtask.name}
          disabled
        />
      </label>
    </div>
  ))

  return (
    <>
      <div className={`${styles.darkBG} ${themeClass}`} onClick={() => props.setModalOpen("")} />
      <div className={`${styles.modal} ${themeClass} ${modalClassName}`}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeading}>{task.name}</div>
          <EllipsisDropdown currentItem={task} confirmDelete={props.confirmDelete} editItem={props.editItem} itemType={"task"} setModalOpen={props.setModalOpen}/>
        </div>
        <div className={styles.modalContent}>

          <div className={styles.taskDescription}>{task.description}</div>

          <div>Subtasks</div>
          {newSubtaskInputs}

          <label className={styles.modalFormLabel}>
            Column:
            <select
              className={`${styles.modalFormInput} ${styles.modalFormSelect}`}
              name="columnId"
              value={task.columnId}
              onChange={handleChangeColumn}
            >
            {columnOptions}
            </select>
          </label>

        </div>
      </div>
    </>
  )
}
