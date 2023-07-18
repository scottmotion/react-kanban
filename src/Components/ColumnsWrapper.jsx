import { useState, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebase'
import './ColumnsWrapper.css'
import Column from "./Column"
import NewColumn from './NewColumn'

export default function ColumnsWrapper(props) {
  // console.log("columnsWrapper loaded")
  // const [columns, setColumns] = useState([
  //   {"name": "Todo", "id": 246670584801596},
  //   {"name": "Doing", "id": 377964764281209},
  //   {"name": "Done", "id": 537301857666471},
  // ])
  const [columns, setColumns] = useState([])
  const sortedColumns = columns.sort((a,b) => a.order - b.order)

  // const columnsCollection = collection(db, "boards", "jZ0b9MvVW9lOVIEOQ9He", "columns")
  const columnsCollection = collection(db, "boards", props.currentBoard.id, "columns")

  let sectionClassName = 'board__column-section'
  if (props.darkMode) {
    sectionClassName += " dark-mode"
  } else {
    sectionClassName += " light-mode"
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(columnsCollection, function(snapshot) {
        // Sync up our local notes array with the snapshot data
        const columnsArr = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        setColumns(columnsArr)
        console.log(columnsArr)
    })
    return unsubscribe
  }, [props.currentBoard.id])

  const columnElements = columns.map((column, index) => (
    <Column
      key={column.id}
      name={column.name}
    />
  ))
  const loading = columns.length === 0;

  return (
    <>
      <section className={sectionClassName}>
        
        {columnElements}

        {loading
          ? null
          : <NewColumn />
        }

      </section>
    </>
  )
}
