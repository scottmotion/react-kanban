import './Sidebar.css'
import SidebarButton from "./SidebarButton"
import NewBoardButton from "./NewBoardButton"
import HideSidebarButton from "./HideSidebarButton"
import ThemeToggle from "./ThemeToggle"

export default function Sidebar({ sidebarVisible, hideSidebar, darkMode, toggleDarkMode, setModalOpen, boards, currentBoardId, setCurrentBoardId }) {

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

  if (darkMode) {
    navClassName += " dark-mode"
  } else {
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

        <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <HideSidebarButton onClick={hideSidebar} />

      </div>

    </nav>
  )
}
