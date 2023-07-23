import './TaskCard.css'

export default function TaskCard(props) {
    const subtaskCount  = props.task.subtasks?.length
    let completedCount = 0
    props.task.subtasks?.forEach(subtask => {
        if (subtask.isCompleted = true) {
            completedCount++
        }
    })
    // console.log(subtaskCount)
    // console.log(completedCount)

    return (
        <div className="task-card" onClick={() => props.setModalOpen("showTask")}>
            <div className="task-card__title">{props.task.title}</div>
            <div className="task-card__subtasks">{completedCount} of {subtaskCount} subtasks</div>
        </div>
    )
}