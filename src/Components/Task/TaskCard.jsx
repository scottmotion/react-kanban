import './TaskCard.css'

export default function TaskCard(props) {
    return (
        <div className="task-card">
            <div className="task-card__title">{props.name}</div>
            <div className="task-card__subtasks">1 of 3 subtasks</div>
        </div>
    )
}