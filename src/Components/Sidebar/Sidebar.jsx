import { ReactComponent as BoardIcon } from "/src/assets/icons/icon-board.svg"
import './Sidebar.css'
import SidebarButton from "./SidebarButton"
import HideSidebarButton from "./HideSidebarButton"
import ThemeToggle from "./ThemeToggle"

export default function Sidebar(props) {

  const boardButtonElements = [].concat(props.boards)
    // .sort((a,b) => b.updatedAt - a.updatedAt)
    .map((board) => (
      <SidebarButton
        key={board.id}
        board={board}
        active={board.id === props.currentBoardId ? "true" : "false" }
        onClick={() => props.setCurrentBoardId(board.id)}
      />
    ))

  let navClassName = 'nav section sidebar'

  if (props.sidebarVisible) {
    navClassName += ' animate-sidebarOpen'
  } else {
    navClassName += ' animate-sidebarClose'
  }

  if (props.darkMode) {
    navClassName += " dark-mode"
  } else {
    navClassName += " light-mode"
  }

  return (
    <nav className={navClassName}>

      <div className="sidebar__nav-wrapper">
        <div className="sidebar__heading">All Boards</div>
        {boardButtonElements}
        <button className="button sidebar-button sidebar-button--new-board" onClick={() => props.setModalOpen("addBoard")}>
          <BoardIcon className='sidebar-button__icon sidebar-button__icon--board'/>
          <div className="sidebar-button__text">+ New Board</div>
        </button>
      </div>

      <div className="sidebar__options-wrapper">

        <ThemeToggle darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode}/>

        <HideSidebarButton onClick={props.hideSidebar}/>
        
      </div>

    </nav>
  )
}
