import { useState } from "react";
import styles from "./Modal.module.css"

export default function UpdateBoardModal(props) {
    const [tempBoard, setTempBoard] = useState({
        name: props.currentBoard.name
    })

    const [tempColumns, setTempColumns] = useState(props.columns)
    console.log("updateBoard columns: ", tempColumns)

    const tempColumnInputs = tempColumns.map((column, index) => (
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
  
    function handleChange(event) {
        const {value} = event.target
        setTempBoard(prevTempBoard => ({
            ...prevTempBoard,
            name: value
        }))
    }

    function handleChangeColumn(event) {
      const columnValue = event.target.value
      const columnId = event.target.id
      const tempColumn = {id:columnId, name: columnValue}

      console.log("tempColumn: ", tempColumn)
  
      setTempColumns(tempColumns.map(c => {
        if (c.id === columnId) {
          return tempColumn;
        } else {
          return c;
        }
      }));
    }

    function handleRemoveColumn(event, columnIndex) {
      event.preventDefault();
      console.log("Remove Column Clicked: ", columnIndex)
      // setNewColumns(
      //   newColumns.filter((c, index) =>
      //     index !== columnIndex
      //   )
      // );
    }

    const handleSubmit = (event) => { //TODO: Send temp columns
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

              <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Save</button>
              <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button>
            </form>
          </div>
        </div>
      </>
    )
}
