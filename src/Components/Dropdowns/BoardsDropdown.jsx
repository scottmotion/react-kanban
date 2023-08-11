import './BoardsDropdown.css'

export default function BoardsDropdown(props) {

    const boardsDropdownOptions = props.boards.map((board, index) => (
        <option className="dropdownOption" key={index} value={board.id}>{board.name}</option>
    )) 

    function handleChangeBoard(event) {
    const {value} = event.target
    props.setCurrentBoardId(value)
    }

    return (
        <label className = "dropdownLabel">
            <select
                className="dropdownSelect"
                name="board"
                value={props.currentBoard.name}
                onChange={handleChangeBoard}
            >
                {boardsDropdownOptions}
            </select>
        </label>
    )
}
