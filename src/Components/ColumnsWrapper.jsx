import { doc } from 'firebase/firestore'
import { db, boardsCollection } from '../firebase'
import './ColumnsWrapper.css'
import Column from "./Column"

export default function ColumnsWrapper(props) {
  const currentBoard = doc(boardsCollection, "6QJ0SAFB6NcdNOBS7gda")
  console.log("ColumnsWrapper.jsx: currentBoardId: ", props.currentBoardId)

  let sectionClassName = 'board__column-section'
  if (props.darkMode) {
    sectionClassName += " dark-mode"
  } else {
    sectionClassName += " light-mode"
  }

  return (
    <>
      <section className={sectionClassName}>
        <div className="board__column-single--wrapper">
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
        </div>

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
