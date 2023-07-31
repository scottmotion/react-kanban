import styles from "./Modal.module.css"

export default function ConfirmDeleteModal(props) {

  const themeClass = props.darkMode ? styles.darkMode : styles.lightMode;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.willDeleteId.type === "board") {
      props.deleteBoard(props.willDeleteId.id)
    } else if (props.willDeleteId.type === "task") {
      props.deleteTask(props.willDeleteId.id)
    }
  }
  
  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
      <div className={`${styles.modal} ${themeClass}`}>
        <div className={styles.modalHeading}>Delete {props.willDeleteId.type}</div>
        <div className={styles.modalContent}>
          <form className={styles.modalForm} onSubmit={handleSubmit} autoComplete="off">
              <button className={`${styles.btn} ${styles.deleteBtn}`} type="submit">Delete</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  )
}
