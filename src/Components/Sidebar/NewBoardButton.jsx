import { ReactComponent as BoardIcon } from "/src/assets/icons/icon-board.svg"
import './NewBoardButton.css'

export default function NewBoardButton({ onClick }) {
    return (
        <button className="button sidebar-button sidebar-button--new-board" onClick={onClick}>
            <BoardIcon className='sidebar-button__icon sidebar-button__icon--board' />
            <div className="sidebar-button__text">+ New Board</div>
        </button>
    )
}