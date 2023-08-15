import { ReactComponent as CrossIcon } from "/src/assets/icons/icon-cross.svg"
import { useState } from "react";
import styles from "./Modal.module.css"

export default function UpdateBoardModal({ darkMode, setModalOpen, currentBoard, editItem, columns, addColumn, updateColumn, deleteColumn }) {

  const themeClass = darkMode ? styles.darkMode : styles.lightMode;

  const [tempBoard, setTempBoard] = useState({
    name: currentBoard.name,
    id: currentBoard.id
  })

  const [tempColumns, setTempColumns] = useState(columns)

  const [removedColumns, setRemovedColumns] = useState([])

  const tempColumnInputs = tempColumns.map((column, index) => (
    <div className={styles.modalFormInputWrapper} key={index}>
      <label className={styles.modalFormLabel}>
        <input
          type="text"
          placeholder="Column Name"
          className={styles.modalFormInput}
          name="columnName"
          value={column.name || ""}
          onChange={(e) => handleChangeColumn(e, index)}
          id={column.id}
        />
      </label>
      <button className={`${styles.btn} ${styles.deleteBtnCircle}`} onClick={(e) => { handleRemoveColumn(e, index, column.id) }}>
        <CrossIcon className={`${styles.deleteBtnIcon}`} />
      </button>
    </div>
  ))

  function handleChange(event) {
    const { value } = event.target
    setTempBoard(prevTempBoard => ({
      ...prevTempBoard,
      name: value
    }))
  }

  function handleNewColumn(event) {
    event.preventDefault();
    setTempColumns([
      ...tempColumns,
      {
        name: '',
        order: tempColumns.length
      }
    ])
  }

  function handleChangeColumn(event, columnIndex) {
    const columnValue = event.target.value
    const tempColumn = { name: columnValue }

    setTempColumns(tempColumns.map((c, index) => {
      if (index === columnIndex) {
        return ({ ...c, ...tempColumn });
      } else {
        return c;
      }
    }));
  }

  function handleRemoveColumn(event, columnIndex, columnId) {
    event.preventDefault();
    if (columnId) {
      setRemovedColumns([
        ...removedColumns,
        columnId
      ])
    }
    const filteredColumns = tempColumns.filter((c, index) =>
      index !== columnIndex
    )
    const newArray = filteredColumns.map((c, index) => ({
      ...c,
      order: index
    }))
    setTempColumns(
      newArray
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let updateTempBoard = await editItem(tempBoard, tempBoard.id)

      let deleteRemovedColumns = async () => {
        for (let columnId of removedColumns) {
          await deleteColumn(tempBoard.id, columnId)
        }
      }

      let updateTempColumns = async () => {
        tempColumns.forEach(async (col) => {
          if (col.id) {
            await updateColumn(col, tempBoard.id)
          } else {
            await addColumn(col, col.order, tempBoard)
          }
        })
      }

      return await updateTempColumns(deleteRemovedColumns(updateTempBoard))

    } catch (e) {
      return e;
    }

  }

  return (
    <>
      <div className={`${styles.darkBG} ${themeClass}`} onClick={() => setModalOpen("")} />
      <div className={`${styles.modal} ${themeClass}`}>
        <div className={styles.modalHeading}>Edit Board</div>
        <div className={styles.modalContent}>
          <form className={styles.modalForm} onSubmit={handleSubmit} autoComplete="off">
            <label className={styles.modalFormLabel}>
              Board Name
              <input
                type="text"
                placeholder="Board Name"
                className={styles.modalFormInput}
                name="boardName"
                value={tempBoard.name}
                onChange={handleChange}
              />
            </label>

            {tempColumns.length > 0
              ? <fieldset className={styles.modalFormFieldset}>
                <legend className={styles.modalFormLegend}>Columns</legend>
                {tempColumnInputs}
              </fieldset>
              : ""
            }
            <button className={`${styles.btn} ${styles.addBtn}`} onClick={(e) => handleNewColumn(e)}>+ Add New Column</button>
            <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  )
}
