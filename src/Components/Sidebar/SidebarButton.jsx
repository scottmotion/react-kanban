import { ReactComponent as BoardIcon } from "/src/assets/icons/icon-board.svg";

export default function SidebarButton(props) {

    let className = "button sidebar-button sidebar-button--board-select"

    if (props.active === "true") {
        className += " active"
    }

    const boardTitle = props.board.name
  
    return (
        <button className={className} onClick={props.onClick}>
            <BoardIcon className='sidebar-button__icon sidebar-button__icon--board'/>
            <div className="sidebar-button__text">{boardTitle}</div>
        </button>
    )
  }
  