import ShowSidebar from "./ShowSidebar"
import './BoardWrapper.css'

export default function BoardWrapper({children, sidebarVisible, showSidebar, darkMode}) {

  let mainClassName = 'main board-wrapper'
  if (sidebarVisible) {
    mainClassName += ' animate-boardThin'
  } else {
    mainClassName += ' animate-boardWide'
  }

  if (darkMode) {
    mainClassName += " dark-mode"
  } else {
    mainClassName += " light-mode"
  }

  return (
    <>
      <main className={mainClassName}>
        {children}
        <ShowSidebar showSidebar={showSidebar} sidebarVisible={sidebarVisible}/>
      </main>
    </>
  )
}
  