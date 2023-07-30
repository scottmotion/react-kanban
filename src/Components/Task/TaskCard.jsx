import './TaskCard.css'

export default function TaskCard(props) {
    
    const subtaskCount  = props.task.subtasks?.length || 0
    let completedCount = 0
    props.task.subtasks?.forEach(subtask => {
        if (subtask.isCompleted === true) {
            completedCount++
        }
    })

    function handleClick() {
        // console.log("task.id: ", props.task.id)
        // console.log("task: ", props.task)
        props.setCurrentColumnId(props.columnId)
        props.setCurrentTask(props.task)
        props.setModalOpen("showTask")
    }

    return (
        <div className="task-card" onClick={handleClick}>
            <div className="task-card__name">{props.task.name}</div>
            <div className="task-card__subtasks">{completedCount} of {subtaskCount} subtasks</div>
        </div>
    )
}