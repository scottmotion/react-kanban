import EllipsisDropdown from "../Dropdowns/EllipsisDropdown";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../App";
import { boardsCollection } from "../../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

import styles from "./Modal.module.css"

export default function ShowTaskModal({ setModalOpen, currentBoardId, columns, currentTask, setCurrentTask, confirmDelete, editItem, changeTaskColumn }) {

  const theme = useContext(ThemeContext);
  const themeClass = (theme === 'dark') ? styles.darkMode : styles.lightMode;

  let modalClassName
  if (theme === 'dark') {
    modalClassName += " dark-mode"
  } else if (theme === 'light') {
    modalClassName += " light-mode"
  }


  const [task, setTask] = useState({})
  const [subtasks, setSubtasks] = useState([])

  const taskRef = doc(boardsCollection, currentBoardId, "tasks", currentTask.id)
  // get boards from firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(taskRef, function (snapshot) {
      const tempTask = {
        ...snapshot.data(),
        id: snapshot.id

      }
      setTask(tempTask)
      setCurrentTask(tempTask)
      // console.log("TempTask: ", tempTask)
      setSubtasks(snapshot.data().subtasks)
    })
    return unsubscribe
  }, [])


  const handleChangeColumn = async (event) => {
    const taskId = currentTask.id
    const columnId = event.target.value

    await changeTaskColumn(taskId, columnId)

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

    return await updateDoc(taskRef, { subtasks: tempSubtasksArray })

  }

  const columnOptions = columns.map((column, index) => (
    <option className={styles.modalFormOption} key={index} value={column.id}>{column.name}</option>
  ))

  const subtaskElements = subtasks.map((subtask, index) => (
    <div className={styles.modalFormCheckboxWrapper} key={index}>

      <label className={`${styles.modalFormLabel} ${styles.modalFormLabelCheckbox}`}>
        <input
          type="checkbox"
          className={styles.modalFormCheckbox}
          name="isCompleted"
          id={index}
          onChange={(e) => handleSubtaskCheckbox(e, subtask, index)}
          checked={subtask.isCompleted}
        />
      </label>
      <p className={`${styles.subTaskText} ${subtask.isCompleted ? styles.subTaskChecked : ''}`}>{subtask.name}</p>
    </div>
  ))

  return (
    <>
      <div className={`${styles.darkBG} ${themeClass}`} onClick={() => setModalOpen("")} />
      <div className={`${styles.modal} ${themeClass} ${modalClassName}`}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeading}>{task.name}</div>
          <EllipsisDropdown currentItem={task} confirmDelete={confirmDelete} editItem={editItem} itemType={"task"} setModalOpen={setModalOpen} />
        </div>
        <div className={styles.modalContent}>

          <div className={styles.taskDescription}>{task.description}</div>

          <div>Subtasks</div>
          {subtaskElements}

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
          <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={() => setModalOpen('')}>Close</button>

        </div>
      </div>
    </>
  )
}
