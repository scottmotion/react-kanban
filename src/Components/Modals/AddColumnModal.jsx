import { useState } from "react";
import styles from "./Modal.module.css"

export default function AddColumnModal(props) {

    const [newColumn, setNewColumn] = useState({
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
        setNewColumn(prevNewColumn => ({
            ...prevNewColumn,
            name: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newColumn.name) {
          props.addColumn(newColumn)
        }
    }

    return (
        <>
        <div className={styles.darkBG} onClick={() => props.setModalOpen("")} />
        <div className={styles.centered}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.heading}>New Column Modal</h5>
            </div>
            <div className={styles.modalContent}>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Column Name"
                        className="form__input"
                        name="boardName"
                        value={newColumn.name}
                        onChange={handleChange}
                    />
                    <button className={styles.btn} type="submit">Create New Column</button>
                    <button className={styles.cancelBtn} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>

                </form>
            </div>
          </div>
        </div>
      </>
    )
}
