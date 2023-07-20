import { useState } from "react";
import styles from "./Modal.module.css"

export default function ConfirmDeleteModal(props) {

    // const [newBoard, setNewBoard] = useState({
    //     name: ''
    // })

    // function handleChange(event) {
    //     const {value} = event.target
    //     setNewBoard(prevNewBoard => ({
    //         ...prevNewBoard,
    //         name: value
    //     }))
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.currentBoardId) {
          props.deleteBoard(props.currentBoardId)
        }
    }

    return (
      <>
        <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
        <div className={styles.modal}>
          <div className={styles.modalHeading}>Delete Board</div>
          <div className={styles.modalContent}>
            <form className={styles.modalForm} onSubmit={handleSubmit} autocomplete="off">
                <button className={`${styles.btn} ${styles.deleteBtn}`} type="submit">Delete</button>
                <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
            </form>
          </div>
        </div>
      </>
    )
}
