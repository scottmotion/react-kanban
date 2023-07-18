import { useState } from "react";
import styles from "./Modal.module.css"

export default function NewBoardModal(props) {

    const [newBoard, setNewBoard] = useState({
        name: ''
    })

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
          props.createNewBoard(newBoard)
        }
    }

    return (
        <>
        <div className={styles.darkBG} onClick={() => props.setNewBoardModalOpen(false)} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>New Board Modal</h5>
            </div>
            {/* <button className={styles.closeBtn} onClick={() => props.setNewBoardModalOpen(false)}>
              X
            </button> */}
            <div className={styles.modalContent}>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Board Name"
                        className="form__input"
                        name="boardName"
                        value={newBoard.name}
                        onChange={handleChange}
                    />
                    <button className="form__button" type="submit">Create New Board</button>

                    {/* <button className="form__button" onClick={props.createNewBoard}>Create New Board</button> */}
                    {/* <button className="form__button" onClick={() => props.setNewBoardModalOpen(false)}>Cancel</button> */}
                    <button className="form__button" onClick={(e) => {e.preventDefault(); props.setNewBoardModalOpen(false)}}>Cancel</button>

                </form>
            </div>
          </div>
        </div>
      </>
    )
}
