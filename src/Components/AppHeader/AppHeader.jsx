import BoardsDropdown from "../Dropdowns/BoardsDropdown"
import NewTaskButton from "../Buttons/NewTaskButton"
import EllipsisDropdown from "../Dropdowns/EllipsisDropdown"
import './AppHeader.css'

export default function AppHeader(props) {

// (darkMode, setModalOpen, boards, currentBoard, currentBoardId, setCurrentBoardId, columnCount, confirmDelete, editItem)

  // check if there is a currentBoard before rendering child that needs currentBoard as prop
  const loading = !props.currentBoard;
  
  let headerClassName = "header"
  if (props.darkMode) {
    headerClassName += " dark-mode"
  } else {
    headerClassName += " light-mode"
  }

  function handleNewTask() {
    if (props.currentBoard) {
      props.setModalOpen("addTask")
    }
  }

  return (
    <header className={headerClassName}>
      <div className="header__app-brand"><img className="header__app-logo" /></div>
      <div className="header__nav">

        <h1 className="header__board-title">{loading ? null : props.currentBoard.name}</h1>

        {loading
        ?
        null
        : 
        <BoardsDropdown boards={props.boards} currentBoard={props.currentBoard} setCurrentBoardId={props.setCurrentBoardId} />
        }

        <div className="header__button-wrapper">
          <NewTaskButton handleNewTask={handleNewTask} columnCount={props.columnCount} disabled={props.columnCount <= 0}/>
          <EllipsisDropdown currentItem={props.currentBoard} confirmDelete={props.confirmDelete} itemType={"board"} setModalOpen={props.setModalOpen}/>
        </div>

      </div>
    </header>
  )
}
