import { useContext } from 'react'
import { ThemeContext } from '../../App'
import './Sidebar.css'
import SidebarButton from "./SidebarButton"
import NewBoardButton from "./NewBoardButton"
import HideSidebarButton from "./HideSidebarButton"

export default function Sidebar({ children, sidebarVisible, hideSidebar, darkMode, setModalOpen, boards, currentBoardId, setCurrentBoardId }) {
  const theme = useContext(ThemeContext);
  console.log("AppHeader theme: ", theme)

  const boardButtonElements = [].concat(boards)
    // .sort((a,b) => b.updatedAt - a.updatedAt)
    .map((board) => (
      <SidebarButton
        key={board.id}
        board={board}
        active={board.id === currentBoardId ? "true" : "false"}
        onClick={() => setCurrentBoardId(board.id)}
      />
    ))

  let navClassName = 'nav section sidebar'

  if (sidebarVisible) {
    navClassName += ' animate-sidebarOpen'
  } else {
    navClassName += ' animate-sidebarClose'
  }

  if (theme === 'dark') {
    navClassName += " dark-mode"
  } else if (theme === 'light') {
    navClassName += " light-mode"
  }

  return (
    <nav className={navClassName}>

      <div className="sidebar__nav-wrapper">
        <div className="sidebar__heading">All Boards</div>
        {boardButtonElements}
        <NewBoardButton onClick={() => setModalOpen("addBoard")} />
      </div>

      <div className="sidebar__options-wrapper">

        {children}

        <HideSidebarButton onClick={hideSidebar} />

      </div>

    </nav>
  )
}
