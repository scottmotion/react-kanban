import { ReactComponent as PlusIcon } from "/src/assets/icons/icon-plus.svg"
import { ReactComponent as VerticalEllipsisIcon } from "/src/assets/icons/icon-ellipsis-vertical.svg"
import { useState } from "react"
import './AppHeader.css'

export default function AppHeader(props) {

  const [showBoardOptions, setShowBoardOptions] = useState(false)

  let headerClassName = "header"
  if (props.darkMode) {
    headerClassName += " dark-mode"
  } else {
    headerClassName += " light-mode"
  }

  function addNewTask() {

  }

  let boardOptionsClassName = "edit-board-menu"
  if (showBoardOptions) {
    boardOptionsClassName += " show"
  } else {
    boardOptionsClassName += " hide"
  }
  function toggleBoardOptions() {
    setShowBoardOptions(!showBoardOptions)
  }

  return (
    <header className={headerClassName}>
      <div className="header__app-brand"><img className="header__app-logo" /></div>
      <div className="header__nav">
        <h1 className="header__board-title">Board Title</h1>
        <div className="header__button-wrapper">
          <button className="button header-button header-button--new-task" onClick={addNewTask}>
            <PlusIcon className='header-button__icon header-button__icon--new'/>
            <div className="header-button__text--new-task">Add New Task</div>
          </button>
          <div className="edit-board-menu--wrapper">
            <button className="button header-button header-button--edit-board" onClick={toggleBoardOptions}>
              <VerticalEllipsisIcon className='header-button__icon header-button__icon--edit'/>
            </button>
            <div className={boardOptionsClassName}>
              <div className="button edit-board-menu--edit">Edit Board</div>
              <div className="button edit-board-menu--delete">Delete Board</div>
            </div>            
          </div>
        </div>
      </div>
    </header>
  )
}
