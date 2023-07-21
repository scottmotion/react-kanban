import ShowSidebar from "./ShowSidebar"
import './BoardWrapper.css'

export default function BoardWrapper(props) {

  let mainClassName = 'main board-wrapper'
  if (props.sidebarVisible) {
    mainClassName += ' animate-boardThin'
  } else {
    mainClassName += ' animate-boardWide'
  }

  if (props.darkMode) {
    mainClassName += " dark-mode"
  } else {
    mainClassName += " light-mode"
  }

  return (
    <>
      <main className={mainClassName}>
        {props.children}
        <ShowSidebar showSidebar={props.showSidebar} sidebarVisible={props.sidebarVisible}/>
      </main>
    </>
  )
}
  