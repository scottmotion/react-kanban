import './BoardsDropdown.css'

export default function BoardsDropdown({boards, currentBoardId, setCurrentBoardId}) {

    const currentBoard = boards.find(board => board.id === currentBoardId) || boards[0]

    const boardsDropdownOptions = boards.map((board, index) => (
        <option className="dropdownOption" key={index} value={board.id}>{board.name}</option>
    )) 

    function handleChangeBoard(event) {
    const {value} = event.target
    setCurrentBoardId(value)
    }

    return (
        <label className = "dropdownLabel">
            <select
                className="dropdownSelect"
                name="board"
                value={currentBoard.name}
                onChange={handleChangeBoard}
            >
                {boardsDropdownOptions}
            </select>
        </label>
    )
}
