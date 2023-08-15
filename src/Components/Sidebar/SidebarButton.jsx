import { ReactComponent as BoardIcon } from "/src/assets/icons/icon-board.svg";
import './SidebarButton.css'

export default function SidebarButton({ board, active, onClick }) {

    let className = "button sidebar-button sidebar-button--board-select"

    if (active === "true") {
        className += " active"
    }

    const boardTitle = board.name

    return (
        <button className={className} onClick={onClick}>
            <BoardIcon className='sidebar-button__icon sidebar-button__icon--board' />
            <div className="sidebar-button__text">{boardTitle}</div>
        </button>
    )
}
