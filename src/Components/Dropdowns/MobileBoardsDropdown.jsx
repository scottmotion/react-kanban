import { useEffect, useState } from 'react'
import { ReactComponent as ChevronDownIcon } from "/src/assets/icons/icon-chevron-down.svg"

import './MobileBoardsDropdown.css'

export default function MobileBoardsDropdown({ boards, currentBoardId, setCurrentBoardId }) {

    const [currentBoard, setCurrentBoard] = useState(boards[0])

    useEffect(() => {
        setCurrentBoard(boards.find(board => board.id === currentBoardId) || boards[0])
    }, [currentBoardId])

    const boardsDropdownOptions = boards.map((board, index) => (
        <option className="dropdownOption" key={index} value={board.id}>{board.name}</option>
    ))

    function handleChangeBoard(event) {
        const { value } = event.target
        setCurrentBoardId(value)
    }

    return (
        <>
            {/* <label className="dropdownLabel">
                <select
                    className="dropdownSelect"
                    name="board"
                    value={currentBoard.id}
                    onChange={handleChangeBoard}
                >
                    {boardsDropdownOptions}
                </select>
            </label> */}




            <button className="button button--select-board">
                <div className="button__text--select-board">Boards</div>
                <ChevronDownIcon className='button__icon button__icon--chevron-down' />
            </button>
        </>

    )
}
