import NewTaskButton from "../Buttons/NewTaskButton"
import EllipsisDropdown from "../Dropdowns/EllipsisDropdown"
import './AppHeader.css'

// export default function AppHeader(props) {
export default function AppHeader({children, darkMode, setModalOpen, currentBoard, columnCount, confirmDelete}) {

  // (darkMode, setModalOpen, boards, currentBoard, currentBoardId, setCurrentBoardId, columnCount, confirmDelete, editItem)

  // check if there is a currentBoard before rendering child that needs currentBoard as prop
  const loading = !currentBoard;

  let headerClassName = "header"
  if (darkMode) {
    headerClassName += " dark-mode"
  } else {
    headerClassName += " light-mode"
  }

  function handleNewTask() {
    if (currentBoard) {
      setModalOpen("addTask")
    }
  }

  return (
    <header className={headerClassName}>
      <div className="header__app-brand"><img className="header__app-logo" /></div>
      <div className="header__nav">

        <h1 className="header__board-title">{loading ? null : currentBoard.name}</h1>

        {loading
          ?
          null
          :
          children
        }

        <div className="header__button-wrapper">
          <NewTaskButton handleNewTask={handleNewTask} disabled={columnCount <= 0} />
          <EllipsisDropdown currentItem={currentBoard} confirmDelete={confirmDelete} itemType={"board"} setModalOpen={setModalOpen} />
        </div>

      </div>
    </header>
  )
}
