import { useEffect, useState } from 'react'

import './BoardsDropdown.css'

export default function BoardsDropdown({ boards, currentBoardId, setCurrentBoardId }) {

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
        <label className="dropdownLabel">
            <select
                className="dropdownSelect"
                name="board"
                value={currentBoard.id}
                onChange={handleChangeBoard}
            >
                {boardsDropdownOptions}
            </select>
        </label>
    )
}
