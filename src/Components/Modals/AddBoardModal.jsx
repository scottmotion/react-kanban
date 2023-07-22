import { useState } from "react";
import styles from "./Modal.module.css"

let nextId = 0;

export default function AddBoardModal(props) {

  const [newBoard, setNewBoard] = useState({
      name: ""
  })

  const [newColumns, setNewColumns] = useState([])
  const newColumnInputs = newColumns.map((column, index) => (

    <label className={styles.modalFormLabel} key={index}>
      <input
      type="text"
      placeholder="Column Name"
      className={styles.modalFormInput}
      name="columnName"
      value={column.name || ""}
      onChange={handleChangeColumn}
      id={column.id}
      />
    </label>

  ))

  let modalClassName = "modal"
  if (props.darkMode) {
    modalClassName += " dark-mode"
  } else {
    modalClassName += " light-mode"
  }

  function handleChangeBoard(event) {
    const {value} = event.target
    setNewBoard(prevNewBoard => ({
        ...prevNewBoard,
        name: value
    }))
  }

  function handleNewColumn(event) {
    event.preventDefault();
    console.log("New Column Clicked")
    setNewColumns([
      ...newColumns,
      {
        id: nextId++
      }
    ]);
  }

  function handleChangeColumn(event) {
    const columnValue = event.target.value
    const columnId = Number(event.target.id)
    const tempColumn = {id:columnId, name: columnValue}
    // console.log("value: ", columnValue)
    // console.log("id: ", columnId)
    console.log("tempColumn: ", tempColumn)

    setNewColumns(newColumns.map(c => {
      if (c.id === columnId) {
        return tempColumn;
      } else {
        return c;
      }
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newBoard.name) {
      props.addBoard(newBoard)
    }
    console.log("submitted columns: ", newColumns)
    // if (newColumns.length > 0)  {
    //   newColumns.forEach((column) => props.addColumn(column))
    // }
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
                  onChange={handleChangeBoard}
              />
            </label>
            {newColumnInputs}
            {/* <button className={`${styles.btn} ${styles.addBtn}`} onClick={(e) => handleNewColumn(e)}>Add New Column</button> */}
            <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Create New Board</button>
            <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  )
}
