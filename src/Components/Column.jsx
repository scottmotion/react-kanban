import './Column.css'
import './TaskCard.css'

export default function Column(props) {
    return (
        <div className="board__column-single--wrapper">

            <div className="board__column-title"><span className="board__column-indicator"></span>Board Column 1</div>
            
            <div className="board__column-single">

                <div className="task-card">
                    <div className="task-card__title">Task Card</div>
                    <div className="task-card__subtasks">1 of 3 subtasks</div>
                </div>

            </div>
        </div>

    )
}