import './BoardsDropdown.css'

export default function BoardsDropdown(props) {

    const projectsDropdownOptions = props.boards.map((board, index) => (
        <option className="dropdownOption" key={index} value={board.id}>{board.name}</option>
    )) 

    function handleChangeProject(event) {
    const {value} = event.target
    props.setCurrentBoardId(value)
    }

    return (
        <label className = "dropdownLabel">
            <select
                className="dropdownSelect"
                name="board"
                value={props.currentBoard.name}
                onChange={handleChangeProject}
            >
                {projectsDropdownOptions}
            </select>
        </label>
    )
}
