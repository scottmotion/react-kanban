import { useState } from "react";
import styles from "./Modal.module.css"

export default function AddBoardModal(props) {

  const [newBoard, setNewBoard] = useState({
      name: ''
  })

  const [newColumns, setNewColumns] = useState([])
  const newColumnInputs = newColumns.map((column, index) => (

    <label className={styles.modalFormLabel} key={index}>
      <input
      type="text"
      placeholder="Column Name"
      className={styles.modalFormInput}
      name="columnName"
      value={column.name}
      onChange={handleChange}
      />
    </label>

  ))

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

  function handleNewColumn(event) {
    event.preventDefault();
    console.log("New Column Clicked")
    // const columnsArr = newColumns.map(column => ({name: column.name}))
    // columnsArr.push({name:""})
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
            <label className={styles.modalFormLabel}>
              <input
                  type="text"
                  placeholder="Board Name"
                  className={styles.modalFormInput}
                  name="boardName"
                  value={newBoard.name}
                  onChange={handleChange}
              />
            </label>
            {newColumnInputs}
            <button className={`${styles.btn} ${styles.addBtn}`} onClick={(e) => handleNewColumn(e)}>Add New Column</button>
            <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Create New Board</button>
            <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  )
}
