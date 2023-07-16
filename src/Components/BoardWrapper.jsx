import { ReactComponent as ShowIcon } from "/src/assets/icons/icon-show.svg"
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


  let buttonClassName = 'button button--show-sidebar'
  let buttonDisabled = ''
  if (props.sidebarVisible) {
    buttonClassName += ' animate-buttonHide'
    buttonDisabled = 'disabled'
  } else {
    buttonClassName += ' animate-buttonShow'
    buttonDisabled = ''
  }
  
  return (
    <>
      <main className={mainClassName}>{props.children}</main>
      <button className={buttonClassName} onClick={props.showSidebar} disabled={buttonDisabled}>
        <ShowIcon className="button__icon--show" stroke="currentColor"/>
      </button>
    </>
  )
}
  