// TODO: See UpdateBoardModal.jsx for example

import { useState, useContext } from "react";
import { ThemeContext } from "../../App";

import SubtaskInput from "./Inputs/SubtaskInput";

import styles from "./Modal.module.css";

export default function UpdateTaskModal({
  setModalOpen,
  columns,
  currentTask,
  editItem,
}) {
  const theme = useContext(ThemeContext);
  const themeClass = theme === "dark" ? styles.darkMode : styles.lightMode;

  const [tempTask, setTempTask] = useState({
    name: currentTask.name,
    id: currentTask.id,
    description: currentTask.description,
    columnId: currentTask.columnId,
  });

  const [tempSubtasks, setTempSubtasks] = useState(currentTask.subtasks);

  // const tempSubtaskInputs = tempSubtasks.map((subtask, index) => (
  //   <SubtaskInput
  //     key={index}
  //     subtask={subtask}
  //     index={index}
  //     handleChangeSubtask={handleChangeSubtask}
  //     handleRemoveSubtask={handleRemoveSubtask}
  //   />
  // ));

  // const columnOptions = columns.map((column, index) => (
  //   <option className={styles.modalFormOption} key={index} value={column.id}>
  //     {column.name}
  //   </option>
  // ));

  function handleChange(event) {
    const { name, value } = event.target;
    setTempTask((prevTempTask) => ({
      ...prevTempTask,
      [name]: value,
    }));
  }

  function handleNewSubtask(event) {
    event.preventDefault();
    setTempSubtasks([
      ...tempSubtasks,
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
    };

    setTempSubtasks(
      tempSubtasks.map((s, index) => {
        if (index === subtaskId) {
          return { ...s, ...tempSubtask };
        } else {
          return s;
        }
      })
    );
  }

  function handleRemoveSubtask(event, subtaskIndex) {
    event.preventDefault();
    setTempSubtasks(tempSubtasks.filter((s, index) => index !== subtaskIndex));
  }

  const handleSubmit = (event) => {
    // TODO: validate form to ensure path and data are set
    event.preventDefault();
    let tempData = { ...tempTask, subtasks: tempSubtasks };
    if (tempTask.name) {
      editItem(tempData);
    }
  };

  return (
    <>
      <div
        className={`${styles.darkBG} ${themeClass}`}
        onClick={() => setModalOpen("")}
      />
      <div className={`${styles.modal} ${themeClass}`}>
        <div className={styles.modalHeading}>Edit Task</div>
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
              {tempSubtasks.map((subtask, index) => (
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
                value={tempTask.columnId}
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
              Save
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
