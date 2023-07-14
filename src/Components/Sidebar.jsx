import { ReactComponent as BoardIcon } from "/src/assets/icons/icon-board.svg"
import { ReactComponent as LightModeIcon } from "/src/assets/icons/icon-light-mode.svg"
import { ReactComponent as DarkModeIcon } from "/src/assets/icons/icon-dark-mode.svg"
import { ReactComponent as HideIcon } from "/src/assets/icons/icon-hide.svg"


export default function Sidebar(props) {

  let navClassName = 'nav section sidebar'
  if (props.sidebarVisible) {
    navClassName += ' animate-sidebarOpen'
  } else {
    navClassName += ' animate-sidebarClose'
  }

  let toggleIndicatorClass = "theme-switcher__toggle-indicator"
  if (props.darkMode) {
    toggleIndicatorClass += " dark-mode"
    navClassName += "dark-mode"
  } else {
    toggleIndicatorClass += " light-mode"
    navClassName += " light-mode"
  }

  return (
    <nav className={navClassName}>

      <div className="sidebar__nav-wrapper">
        <div className="sidebar__heading">All Boards</div>
        {props.children}
        <button className="button sidebar-button sidebar-button--new-board">
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

        <button className="button sidebar-button sidebar-button--hide-sidebar" onClick={props.hideSidebar}>
          <HideIcon className='sidebar-button__icon sidebar-button__icon--hide'/>
          Hide Sidebar
        </button>
        
      </div>

    </nav>
  )
}
