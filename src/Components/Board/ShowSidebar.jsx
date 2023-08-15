import { ReactComponent as ShowIcon } from "/src/assets/icons/icon-show.svg"
import './ShowSidebar.css'

export default function ShowSidebar({showSidebar, sidebarVisible}) {

  let buttonClassName = 'button button--show-sidebar'
  let buttonDisabled = ''
  if (sidebarVisible) {
    buttonClassName += ' animate-buttonHide'
    buttonDisabled = 'disabled'
  } else {
    buttonClassName += ' animate-buttonShow'
    buttonDisabled = ''
  }
  
  return (
    <button className={buttonClassName} onClick={showSidebar} disabled={buttonDisabled}>
        <ShowIcon className="button__icon--show" stroke="currentColor"/>
    </button>
  )
}
  