import { ReactComponent as BoardIcon } from "/src/assets/icons/icon-board.svg"
import './Sidebar.css'
import SidebarButton from "./SidebarButton"
import NewBoardButton from "../Buttons/NewBoardButton"
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
        <NewBoardButton onClick={() => props.setModalOpen("addBoard")} />
      </div>

      <div className="sidebar__options-wrapper">

        <ThemeToggle darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode}/>

        <HideSidebarButton onClick={props.hideSidebar}/>
        
      </div>

    </nav>
  )
}
