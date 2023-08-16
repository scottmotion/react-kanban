import { useContext } from "react";
import { ThemeContext } from "../../App";
import styles from "./Modal.module.css"

export default function ConfirmDeleteModal({ setModalOpen, willDeleteId, deleteBoard, deleteTask }) {

  const theme = useContext(ThemeContext);
  const themeClass = (theme === 'dark') ? styles.darkMode : styles.lightMode;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (willDeleteId.type === "board") {
      deleteBoard(willDeleteId.id)
    } else if (willDeleteId.type === "task") {
      deleteTask(willDeleteId.id)
    }
  }

  return (
    <>
      <div className={`${styles.darkBG} ${themeClass}`} onClick={() => setModalOpen("")} />
      <div className={`${styles.modal} ${themeClass}`}>
        <div className={styles.modalHeading}>Delete {willDeleteId.type}</div>
        <div className={styles.modalContent}>
          <form className={styles.modalForm} onSubmit={handleSubmit} autoComplete="off">
            <button className={`${styles.btn} ${styles.deleteBtn}`} type="submit">Delete</button>
            <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => { e.preventDefault(); setModalOpen("") }}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  )
}
