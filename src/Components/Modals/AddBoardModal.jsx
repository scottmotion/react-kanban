import { useState } from "react";
import styles from "./Modal.module.css"

export default function AddBoardModal(props) {

    const [newBoard, setNewBoard] = useState({
        name: ''
    })

    let modalClassName = "modal"
    if (props.darkMode) {
      modalClassName += " dark-mode"
    } else {
      modalClassName += " light-mode"
    }
  
    function handleChange(event) {
        const {value} = event.target
        setNewBoard(prevNewBoard => ({
            ...prevNewBoard,
            name: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newBoard.name) {
          props.addBoard(newBoard)
        }
    }

    return (
      <>
        <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
        <div className={styles.modal}>
          <div className={styles.modalHeading}>Add New Board</div>
          <div className={styles.modalContent}>
            <form className={styles.modalForm} onSubmit={handleSubmit} autoComplete="off">
                <input
                    type="text"
                    placeholder="Board Name"
                    className={styles.modalFormInput}
                    name="boardName"
                    value={newBoard.name}
                    onChange={handleChange}
                />
                <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Create New Board</button>
                <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
            </form>
          </div>
        </div>
      </>
    )
}
