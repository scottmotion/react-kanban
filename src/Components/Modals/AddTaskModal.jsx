import { useState, useContext } from "react";
import { ThemeContext } from "../../App";
import { ReactComponent as CrossIcon } from "/src/assets/icons/icon-cross.svg";
import SubtaskInput from "./Inputs/SubtaskInput";

import styles from "./Modal.module.css";

export default function AddTaskModal({ setModalOpen, columns, addTask }) {
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.darkMode : styles.lightMode;

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    columnId: columns[0].id,
  });

  const [newSubtasks, setNewSubtasks] = useState([
    {
      name: "",
      isCompleted: false,
    },
  ]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNewTask((prevNewTask) => ({
      ...prevNewTask,
      [name]: value,
    }));
  }

  function handleNewSubtask(event) {
    event.preventDefault();
    setNewSubtasks([
      ...newSubtasks,
      {
        name: "",
        isCompleted: false,
      },
    ]);
  }

  function handleChangeSubtask(event, subtaskIndex) {
    const subtaskValue = event.target.value;
    const subtaskId = subtaskIndex;
    const tempSubtask = {
      name: subtaskValue,
      isCompleted: false,
    };

    setNewSubtasks(
      newSubtasks.map((s, index) => {
        if (index === subtaskId) {
          return tempSubtask;
        } else {
          return s;
        }
      })
    );
  }

  function handleRemoveSubtask(event, subtaskIndex) {
    event.preventDefault();
    setNewSubtasks(newSubtasks.filter((s, index) => index !== subtaskIndex));
  }

  const handleSubmit = (event) => {
    // TODO: validate form to ensure path and data are set
    event.preventDefault();
    if (newTask.name) {
      addTask(newTask, newSubtasks);
    }
  };

  // const columnOptions = columns.map((column, index) => (
  //   <option className={styles.modalFormOption} key={index} value={column.id}>{column.name}</option>
  // ))

  // const newSubtaskInputs = newSubtasks.map((subtask, index) => (
  //   <SubtaskInput
  //     key={index}
  //     subtask={subtask}
  //     index={index}
  //     handleChangeSubtask={handleChangeSubtask}
  //     handleRemoveSubtask={handleRemoveSubtask}
  //   />
  // ));

  return (
    <>
      <div
        className={`${styles.darkBG} ${themeClass}`}
        onClick={() => setModalOpen("")}
      />
      <div className={`${styles.modal} ${themeClass}`}>
        <div className={styles.modalHeading}>Add New Task</div>
        <div className={styles.modalContent}>
          <form
            className={styles.modalForm}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
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
              {newSubtasks.map((subtask, index) => (
                <SubtaskInput
                  key={index}
                  subtask={subtask}
                  index={index}
                  handleChangeSubtask={handleChangeSubtask}
                  handleRemoveSubtask={handleRemoveSubtask}
                />
              ))}
            </fieldset>

            <button
              className={`${styles.btn} ${styles.addBtn}`}
              onClick={(e) => handleNewSubtask(e)}
            >
              + Add New Subtask
            </button>

            <label className={styles.modalFormLabel}>
              Column
              <select
                className={`${styles.modalFormInput} ${styles.modalFormSelect}`}
                name="columnId"
                value={newTask.columnId}
                onChange={handleChange}
              >
                {columns.map((column, index) => (
                  <option
                    className={styles.modalFormOption}
                    key={index}
                    value={column.id}
                  >
                    {column.name}
                  </option>
                ))}
              </select>
            </label>

            <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">
              Create Task
            </button>
            <button
              className={`${styles.btn} ${styles.cancelBtn}`}
              onClick={() => setModalOpen("")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
