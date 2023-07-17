import { useState, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebase'
import './ColumnsWrapper.css'
import Column from "./Column"

export default function ColumnsWrapper(props) {
  const [columns, setColumns] = useState([
    {"name": "Todo", "id": 246670584801596},
    {"name": "Doing", "id": 377964764281209},
    {"name": "Done", "id": 537301857666471},
  ])
  // const columnsCollection = collection(db, "boards", "6QJ0SAFB6NcdNOBS7gda", "columns")

  console.log("ColumnsWrapper.jsx: currentBoardId: ", props.currentBoardId)

  let sectionClassName = 'board__column-section'
  if (props.darkMode) {
    sectionClassName += " dark-mode"
  } else {
    sectionClassName += " light-mode"
  }


  // useEffect(() => {
  //   const unsubscribe = onSnapshot(columnsCollection, function(snapshot) {
  //       // Sync up our local notes array with the snapshot data
  //       const columnsArr = snapshot.docs.map(doc => ({
  //           ...doc.data(),
  //           id: doc.id
  //       }))
  //       setColumns(columnsArr)
  //   })
  //   return unsubscribe
  // }, [])

  const columnElements = columns.map((column, index) => (
    <Column
      key={column.id}
      name={column.name}
    />
  ))


  return (
    <>
      <section className={sectionClassName}>
        {columnElements}

        {/* <div className="board__column-single--wrapper">
          <div className="board__column-title"><span className="board__column-indicator"></span>Board Column 1</div>
          <div className="board__column-single">

            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>

          </div>
        </div>

        <div className="board__column-single--wrapper">
        <div className="board__column-title"><span className="board__column-indicator"></span>Board Column 2</div>
          <div className="board__column-single">

            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>

          </div>
        </div>

        <div className="board__column-single--wrapper">
        <div className="board__column-title"><span className="board__column-indicator"></span>Board Column 3</div>
          <div className="board__column-single">

            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>
            <div className="task-card">
              <div className="task-card__title">Task Card</div>
              <div className="task-card__subtasks">1 of 3 subtasks</div>
            </div>

          </div>
        </div> */}

        <div className="board__column-single--wrapper">
          <div className="board__column-title"> </div>
          <div className="board__column-single board__column-new">
            <button className="button button--new-column">+ New Column</button>
          </div>
        </div>

      </section>
    </>
  )
}
