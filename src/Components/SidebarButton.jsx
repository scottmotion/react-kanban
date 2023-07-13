export default function SidebarButton(props) {

    let className = "button sidebar-button sidebar-button--board-select"

    if (props.active) {
        className += " active"
    }
    const boardIcon =  (
        <svg className='sidebar-button__icon sidebar-button__icon--board' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h6v14H5zm14 0h-6v-7h6v7zm0-9h-6V5h6v5z"></path>
        </svg>
    )

    const boardTitle = "Board Title"
  
    return (
        <button className={className}>
        {boardIcon}
        <div className="sidebar-button__text">{boardTitle}</div>
      </button>
    )
  }
  