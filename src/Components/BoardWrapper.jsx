export default function BoardWrapper(props) {

  let className = 'section board-wrapper'
  if (props.sidebarVisible) {
    className += ' animate-boardThin'
  } else {
    className += ' animate-boardWide'
  }

  let buttonClassName = 'button show-sidebar'
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
      <section className={className}>{props.children}</section>
      <button className={buttonClassName} onClick={props.showSidebar} disabled={buttonDisabled}>Show Sidebar</button>
    </>
  )
}
  