import './TaskCard.css'

export default function TaskCard({ task, columnId, setModalOpen, setCurrentColumnId, setCurrentTask }) {

    const subtaskCount = task.subtasks?.length || 0
    let completedCount = 0
    task.subtasks?.forEach(subtask => {
        if (subtask.isCompleted === true) {
            completedCount++
        }
    })

    function handleClick() {
        setCurrentColumnId(columnId)
        setCurrentTask(task)
        setModalOpen("showTask")
    }

    return (
        <div className="task-card" onClick={handleClick}>
            <div className="task-card__name">{task.name}</div>
            <div className="task-card__subtasks">{completedCount} of {subtaskCount} subtasks</div>
        </div>
    )
}