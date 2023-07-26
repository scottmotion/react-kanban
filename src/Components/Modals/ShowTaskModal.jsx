import EllipsisDropdown from "../Dropdowns/EllipsisDropdown";
import { useState } from "react";
import styles from "./Modal.module.css"

export default function ShowTaskModal(props) {

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    columnId: props.currentColumnId,
  })

  // const [newSubtasks, setNewSubtasks] = useState([{
  //   name: '',
  //   isCompleted: false
  // }])

  let modalClassName = "modal"
  if (props.darkMode) {
    modalClassName += " dark-mode"
  } else {
    modalClassName += " light-mode"
  }

  function handleChangeColumn(event) {
    const {name, value} = event.target
    setNewTask(prevNewTask => ({
        ...prevNewTask,
        [name]: value
    }))
  }

  // function handleNewSubtask(event) {
  //   event.preventDefault();
  //   console.log("New Subtask Clicked")
  //   setNewSubtasks([
  //     ...newSubtasks,
  //     {
  //       name: '',
  //       isCompleted: false
  //     }
  //   ]);
  // }


  function handleSubtaskCheckbox(event, subtaskIndex) {
    const subtaskId = subtaskIndex
    const checked = event.target.checked
    console.log("Checkbox clicked index: ", subtaskId)
    console.log("checked: ", checked)
    // const tempSubtask = {
    //   isCompleted: event.target.checked
    // }

  }


  // function handleChangeSubtask(event, subtaskIndex) {
  //   const subtaskValue = event.target.value
  //   const subtaskId = subtaskIndex
  //   const tempSubtask = {
  //     name: subtaskValue,
  //     isCompleted: false
  //   }
  //   console.log(tempSubtask)

  //   setNewSubtasks(newSubtasks.map((s, index) => {
  //     if (index === subtaskId) {
  //       return tempSubtask;
  //     } else {
  //       return s;
  //     }
  //   }));
  // }

  // function handleRemoveSubtask(event, subtaskIndex) {
  //   event.preventDefault();
  //   console.log("Remove Subtask Clicked: ", subtaskIndex)
  //   setNewSubtasks(
  //     newSubtasks.filter((s, index) =>
  //       index !== subtaskIndex
  //     )
  //   );
  // }

  // const handleSubmit = (event) => { // TODO: validate form to ensure path and data are set
  //   event.preventDefault();
  //   if (newTask.name) {
  //     props.addTask(newTask, newSubtasks)
  //   }
  // }

  const columnOptions = props.columns.map((column, index) => (
    <option className={styles.modalFormOption} key={index} value={column.id}>{column.name}</option>
  ))

  const newSubtaskInputs = props.currentTask.subtasks?.map((subtask, index) => (
    <div className={styles.modalFormInputWrapper} key={index}>

      <label className={`${styles.modalFormLabel} ${styles.modalFormLabelCheckbox}`}>
        <input
          type="checkbox"
          className={styles.modalFormInput}
          name="isCompleted"
          id={index}
          // value={subtask.isCompleted}
          onChange={(e) => handleSubtaskCheckbox(e, index)}
          checked={subtask.isCompleted}
        />
      </label>


      <label className={styles.modalFormLabel}>
        <input
          type="text"
          placeholder="Subtask Name"
          className={styles.modalFormInput}
          name="subtaskName"
          id={index}
          value={subtask.name}
          // onChange={(e) => handleChangeSubtask(e, index)}
          disabled
        />
      </label>
      {/* <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={(e) => {handleRemoveSubtask(e, index)}}>X</button> */}
    </div>
  ))

  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
      {/* <div className={styles.modal}> */}
      <div className={`${styles.modal} ${modalClassName}`}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeading}>{props.currentTask.title}</div>
          <EllipsisDropdown />
        </div>
        <div className={styles.modalContent}>

          <div className={styles.taskDescription}>{props.currentTask.description}</div>

          <div>Subtasks</div>
          {newSubtaskInputs}

          <label className={styles.modalFormLabel}>
            Column: {props.currentColumnId}
            <select
              className={`${styles.modalFormInput} ${styles.modalFormSelect}`}
              name="columnId"
              value={newTask.columnId}
              onChange={handleChangeColumn}
            >
            {/* <option disabled value="defaultValue">Select Column</option> */}
            {columnOptions}
            </select>
          </label>

        </div>
      </div>
    </>
  )
}
