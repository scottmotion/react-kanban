import { useState } from "react";
import styles from "./Modal.module.css"

let nextId = 0;

export default function AddBoardModal(props) {

  const [newBoard, setNewBoard] = useState({
      name: ""
  })

  const [newColumns, setNewColumns] = useState([])
  const newColumnInputs = newColumns.map((column, index) => (
    <div className={styles.modalFormInputWrapper} key={index}>
      <label className={styles.modalFormLabel}>
        <input
          type="text"
          placeholder="Column Name"
          className={styles.modalFormInput}
          name="columnName"
          value={column.name || ""}
          onChange={(e) => handleChangeColumn(e, index)}
          // id={index}
        />
      </label>
      <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={(e) => {handleRemoveColumn(e, index)}}>X</button>
    </div>
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
        name: ''
      }
    ]);
  }

  function handleChangeColumn(event, columnIndex) {
    const columnValue = event.target.value
    // const columnId = columnIndex
    const tempColumn = {name: columnValue}

    console.log("tempColumn: ", tempColumn)

    setNewColumns(newColumns.map((c, index) => {
      if (index === columnIndex) {
        return tempColumn;
      } else {
        return c;
      }
    }));
  }

  function handleRemoveColumn(event, columnIndex) {
    event.preventDefault();
    console.log("Remove Column Clicked: ", columnIndex)
    setNewColumns(
      newColumns.filter((c, index) =>
        index !== columnIndex
      )
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newBoard.name) {
      const newBoardRef = await props.addBoard(newBoard)
      console.log("newBoardRef: ",newBoardRef)
      if (newColumns.length > 0) {
        console.log("submitted columns: ", newColumns)
        newColumns.forEach(async (column, index) => {
          console.log("this column: ", column)
          const newColumnRef = await props.addColumn(column, index, newBoardRef)
          console.log("this columnRef: ", newColumnRef)
        })
      }
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
              Board Name
              <input
                  type="text"
                  placeholder="Board Name"
                  className={styles.modalFormInput}
                  name="boardName"
                  value={newBoard.name}
                  onChange={handleChangeBoard}
              />
            </label>

            {newColumns.length > 0
              ? <fieldset className={styles.modalFormFieldset}>
                  <legend className={styles.modalFormLegend}>Columns</legend>
                  {newColumnInputs}
                </fieldset> 
              : ""          
            }

            <button className={`${styles.btn} ${styles.addBtn}`} onClick={(e) => handleNewColumn(e)}>+ Add New Column</button>
            <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Create Board</button>
            {/* <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button> */}
          </form>
        </div>
      </div>
    </>
  )
}
