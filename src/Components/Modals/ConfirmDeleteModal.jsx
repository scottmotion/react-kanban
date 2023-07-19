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
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>Delete Board Modal</h5>
            </div>
            <div className={styles.modalContent}>
                <form className="form" onSubmit={handleSubmit}>
                    <button className="form__button" type="submit">Delete</button>
                    <button className="form__button" onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
                </form>
            </div>
          </div>
        </div>
      </>
    )
}
