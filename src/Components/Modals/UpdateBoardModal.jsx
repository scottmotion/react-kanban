import { useState } from "react";
import styles from "./Modal.module.css"

export default function UpdateBoardModal(props) {

    const [tempBoard, setTempBoard] = useState({
        name: props.currentBoard.name
    })

    const [tempColumns, setTempColumns] = useState(props.columns)
    console.log("tempColumns: ", tempColumns)

    const [newColumns, setNewColumns] = useState([])

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
        <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={(e) => {handleRemoveColumn(e, index)}}>X</button>
      </div>
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

    function handleNewColumn(event) {
      event.preventDefault();
      console.log("New Column Clicked")
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
      // const columnId = event.target.id
      const tempColumn = {name: columnValue}

      console.log("tempColumn: ", tempColumn)
  
      setTempColumns(tempColumns.map((c, index) => {
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

    const handleSubmit = (event) => { //TODO: Check old columns against temp columns
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
              <button className={`${styles.btn} ${styles.addBtn}`} onClick={(e) => handleNewColumn(e)}>+ Add New Column</button>
              <button className={`${styles.btn} ${styles.saveBtn}`} type="submit">Save</button>
              {/* <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={(e) => {e.preventDefault(); props.setModalOpen("")}}>Cancel</button> */}
            </form>
          </div>
        </div>
      </>
    )
}
