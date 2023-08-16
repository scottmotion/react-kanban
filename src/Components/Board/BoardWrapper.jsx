import { useContext } from "react"
import { ThemeContext } from "../../App"
import ShowSidebar from "./ShowSidebar"
import './BoardWrapper.css'

export default function BoardWrapper({ children, sidebarVisible, showSidebar }) {

  const theme = useContext(ThemeContext);

  let mainClassName = 'main board-wrapper'
  if (sidebarVisible) {
    mainClassName += ' animate-boardThin'
  } else {
    mainClassName += ' animate-boardWide'
  }

  if (theme === 'dark') {
    mainClassName += " dark-mode"
  } else if (theme === 'light') {
    mainClassName += " light-mode"
  }

  return (
    <>
      <main className={mainClassName}>
        {children}
        <ShowSidebar showSidebar={showSidebar} sidebarVisible={sidebarVisible} />
      </main>
    </>
  )
}
