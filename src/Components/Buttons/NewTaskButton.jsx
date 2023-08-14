import { ReactComponent as PlusIcon } from "/src/assets/icons/icon-plus.svg"
import './NewTaskButton.css'

export default function NewTaskButton(props) {
    return (
        <button className="button button--new-task" onClick={props.handleNewTask} disabled={props.disabled}>
            <PlusIcon className='button__icon button__icon--new'/>
            <div className="button__text--new-task">Add New Task</div>
        </button>
    )
}