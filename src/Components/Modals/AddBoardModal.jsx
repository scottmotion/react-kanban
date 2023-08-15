import { ReactComponent as CrossIcon } from "/src/assets/icons/icon-cross.svg"

import { useState } from "react";
import styles from "./Modal.module.css"

export default function AddBoardModal({ darkMode, setModalOpen, addBoard, addColumn }) {

  const themeClass = darkMode ? styles.darkMode : styles.lightMode;

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
        />
      </label>
      <button className={`${styles.btn} ${styles.deleteBtnCircle}`} onClick={(e) => { handleRemoveColumn(e, index) }}>
        <CrossIcon className={`${styles.deleteBtnIcon}`} />
      </button>
    </div>
  ))

  function handleChangeBoard(event) {
    const { value } = event.target
    setNewBoard(prevNewBoard => ({
      ...prevNewBoard,
      name: value
    }))
  }

  function handleNewColumn(event) {
    event.preventDefault();
    setNewColumns([
      ...newColumns,
      {
        name: '',
        order: newColumns.length
      }
    ]);
  }

  function handleChangeColumn(event, columnIndex) {
    const columnValue = event.target.value
    const tempColumn = { name: columnValue }

    setNewColumns(newColumns.map((c, index) => {
      if (index === columnIndex) {
        return ({
          ...c,
          ...tempColumn
        });
      } else {
        return c;
      }
    }));
  }

  function handleRemoveColumn(event, columnIndex) {
    event.preventDefault();

    const filteredColumns = newColumns.filter((c, index) =>
      index !== columnIndex
    )
    const newArray = filteredColumns.map((c, index) => ({
      ...c,
      order: index
    }))

    setNewColumns(
      newArray
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newBoard.name) {
      // add the board and get firebase ref
      const newBoardRef = await addBoard(newBoard)
      if (newColumns.length > 0) {
        // add each new column
        newColumns.forEach(async (column, index) => {
          const newColumnRef = await addColumn(column, index, newBoardRef)
        })
      }
    }
  }

  return (
    <>
      <div className={`${styles.darkBG} ${themeClass}`} onClick={() => setModalOpen("")} />
      <div className={`${styles.modal} ${themeClass}`}>
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
          </form>
        </div>
      </div>
    </>
  )
}
