import { ReactComponent as ShowIcon } from "/src/assets/icons/icon-show.svg"

export default function BoardWrapper(props) {

  let className = 'main board-wrapper'
  if (props.sidebarVisible) {
    className += ' animate-boardThin'
  } else {
    className += ' animate-boardWide'
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
      <main className={className}>{props.children}</main>
      <button className={buttonClassName} onClick={props.showSidebar} disabled={buttonDisabled}>
        <ShowIcon className="button__icon--show" stroke="currentColor"/>
      </button>
    </>
  )
}
  