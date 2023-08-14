import { ReactComponent as BoardIcon } from "/src/assets/icons/icon-board.svg"
import { ReactComponent as LightModeIcon } from "/src/assets/icons/icon-light-mode.svg"
import { ReactComponent as DarkModeIcon } from "/src/assets/icons/icon-dark-mode.svg"
import { ReactComponent as HideIcon } from "/src/assets/icons/icon-hide.svg"
import './Sidebar.css'
import SidebarButton from "./SidebarButton"
import HideSidebarButton from "./HideSidebarButton"

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

  let toggleIndicatorClass = "theme-switcher__toggle-indicator"
  if (props.darkMode) {
    toggleIndicatorClass += " dark-mode"
    navClassName += " dark-mode"
  } else {
    toggleIndicatorClass += " light-mode"
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

        <div className="theme-switcher">
          <LightModeIcon className='theme-switcher__icon theme-switcher__icon--light'/>
          <button className="button theme-switcher__toggle" type="button" role="switch" onClick={props.toggleDarkMode}></button>
          <span className={toggleIndicatorClass} data-state="checked" onClick={props.toggleDarkMode}></span>
          <DarkModeIcon className='theme-switcher__icon theme-switcher__icon--dark'/>
        </div>

        <HideSidebarButton onClick={props.hideSidebar}/>
        
      </div>

    </nav>
  )
}
