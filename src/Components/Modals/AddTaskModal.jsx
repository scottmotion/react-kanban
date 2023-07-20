import { useState } from "react";
import styles from "./Modal.module.css"

export default function AddTaskModal(props) {

  const [formData, setFormData] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.name) {
      props.addTask(formData)
    }
  }

  let modalClassName = "modal"
  if (props.darkMode) {
    modalClassName += " dark-mode"
  } else {
    modalClassName += " light-mode"
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeading}>Add New Task</div>
          <div className={styles.modalContent}>
            <form className={styles.modalForm} onSubmit={handleSubmit} autoComplete="off">

              <label className={styles.modalFormLabel}>
                Task Name
                <input
                    type="text"
                    placeholder="e.g. Take coffee break"
                    className={styles.modalFormInput}
                    name="taskName"
                    value={formData.name}
                    onChange={handleChange}
                />
              </label>

              <label className={styles.modalFormLabel}>
                Description
                <textarea
                    type="text"
                    placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                    className={`${styles.modalFormInput} ${styles.modalFormTextarea}`}
                    name="taskDescription"
                    value={formData.description}
                    onChange={handleChange}
                />
              </label>

              <label className={styles.modalFormLabel}>
                Column
                <select
                    type="text"
                    placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                    className={`${styles.modalFormInput} ${styles.modalFormSelect}`}
                    name="taskColumn"
                    value={formData.column}
                    onChange={handleChange}
                >
                  <option value="1">Column 1</option>
                  <option value="2">Column 2</option>
                  <option value="3">Column 3</option>
                </select>
              </label>



              <label className={styles.modalFormLabel}>
                Subtask 1
                <input
                    type="text"
                    placeholder="e.g. Take coffee break"
                    className={styles.modalFormInput}
                    name="subtask"
                    value={formData.subtask}
                    onChange={handleChange}
                />
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
