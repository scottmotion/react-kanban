import { useState, useEffect, useContext } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { boardsCollection } from '../../firebase'
import { ThemeContext } from '../../App'
import './Board.css'
import Column from "../Columns/Column"
import ColumnNew from '../Columns/ColumnNew'

export default function Board({ setModalOpen, currentBoard, setColumns, setColumnCount, setCurrentTask }) {

  const theme = useContext(ThemeContext);

  const [currentColumns, setCurrentColumns] = useState([])

  const columnsCollection = collection(boardsCollection, currentBoard.id, "columns")
  const tasksCollection = collection(boardsCollection, currentBoard.id, "tasks")

  let sectionClassName = 'board__column-section'

  if (theme === 'dark') {
    sectionClassName += " dark-mode"
  } else if (theme === 'light') {
    sectionClassName += " light-mode"
  }

  //////////////////////
  // COLUMNS GET & SET
  //////////////////////

  useEffect(() => {
    const unsubscribe = onSnapshot(columnsCollection, function (snapshot) {
      // Sync up our local notes array with the snapshot data
      const columnsArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      const sortedColumns = columnsArr.sort((a, b) => a.order - b.order)
      setCurrentColumns(sortedColumns)
      setColumns(sortedColumns)
      setColumnCount(columnsArr.length)
    })
    return unsubscribe
  }, [currentBoard.id])

  const columnElements = currentColumns.map((column, index) => (
    <Column
      key={column.id}
      columnName={column.name}
      columnId={column.id}
      tasksCollection={tasksCollection}
      setModalOpen={setModalOpen}
      setCurrentTask={setCurrentTask}
    />
  ))

  // check if there is are columns before rendering child that needs columns as prop
  const loading = (currentColumns.length === null);

  return (
    <>
      <section className={sectionClassName}>

        {columnElements}

        {loading
          ? null
          : <ColumnNew setModalOpen={setModalOpen} />
        }

      </section>
    </>
  )
}
