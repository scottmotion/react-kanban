import { useState } from "react";
import styles from "./Modal.module.css"

export default function UpdateBoardModal(props) {

    const [tempBoard, setTempBoard] = useState({
        name: props.currentBoard.name
    })

    let modalClassName = "modal"
    if (props.darkMode) {
      modalClassName += " dark-mode"
    } else {
      modalClassName += " light-mode"
    }
  
    function handleChange(event) {
        const {value} = event.target
        setTempBoard(prevTempBoard => ({
            ...prevTempBoard,
            name: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (tempBoard.name) {
          props.updateBoard(tempBoard)
        }
    }

    return (
      <>
        <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
        <div className={styles.modal}>
          <div className={styles.modalHeading}>Edit Board</div>
          <div className={styles.modalContent}>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Board Name"
                    className={styles.modalFormInput}
                    name="boardName"
                    value={tempBoard.name}
                    onChange={handleChange}
                />
                <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Save</button>
                <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
            </form>
          </div>
        </div>
      </>
    )
}
