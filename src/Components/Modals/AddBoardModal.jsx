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
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>New Board Modal</h5>
            </div>
            <div className={styles.modalContent}>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Board Name"
                        className="form__input"
                        name="boardName"
                        value={newBoard.name}
                        onChange={handleChange}
                    />
                    <button className={styles.btn} type="submit">Create New Board</button>
                    <button className={styles.cancelBtn} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>

                </form>
            </div>
          </div>
        </div>
      </>
    )
}