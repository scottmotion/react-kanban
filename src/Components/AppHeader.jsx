import { ReactComponent as PlusIcon } from "/src/assets/icons/icon-plus.svg"
import { ReactComponent as VerticalEllipsisIcon } from "/src/assets/icons/icon-ellipsis-vertical.svg"
import { useState, useRef, useEffect } from "react"
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal"
import './AppHeader.css'

export default function AppHeader(props) {

  const [showBoardOptions, setShowBoardOptions] = useState(false)

  // check if there is a currentBoard before rendering child that needs currentBoard as prop
  const loading = !props.currentBoard;
  
  let headerClassName = "header"
  if (props.darkMode) {
    headerClassName += " dark-mode"
  } else {
    headerClassName += " light-mode"
  }

  function addNewTask() {
    console.log("New Task Click")
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

  /**
   * Hook that fires on clicks outside of the passed ref
   */
  function boardOptionsClickOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowBoardOptions(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const boardOptionsWrapperRef = useRef(null);
  boardOptionsClickOutside(boardOptionsWrapperRef);

  function handleDelete() {
    if (props.currentBoard) {
      setShowBoardOptions(false)
      props.confirmDeleteBoard(props.currentBoard.id)
    }
  }

  function handleEdit() {
    if (props.currentBoard) {
      setShowBoardOptions(false)
      props.setModalOpen("updateBoard")
    }
  }


  return (
    <header className={headerClassName}>
      <div className="header__app-brand"><img className="header__app-logo" /></div>
      <div className="header__nav">
        <h1 className="header__board-title">{loading ? null : props.currentBoard.name}</h1>

        <div className="header__button-wrapper">
          <button className="button header-button header-button--new-task" onClick={addNewTask}>
            <PlusIcon className='header-button__icon header-button__icon--new'/>
            <div className="header-button__text--new-task">Add New Task</div>
          </button>
          <div className="edit-board-menu--wrapper" ref={boardOptionsWrapperRef}>
            <button className="button header-button header-button--edit-board" onClick={toggleBoardOptions}>
              <VerticalEllipsisIcon className='header-button__icon header-button__icon--edit'/>
            </button>
            <div className={boardOptionsClassName}>
              <div className="button edit-board-menu--edit" onClick={handleEdit}>Edit Board</div>
              <div className="button edit-board-menu--delete" onClick={handleDelete}>Delete Board</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
