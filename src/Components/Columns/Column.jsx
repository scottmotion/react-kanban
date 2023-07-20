import TaskCard from '../Task/TaskCard'
import './Column.css'

export default function Column(props) {
    return (
        <div className="board__column-single--wrapper">

            <div className="board__column-title">
                <span className="board__column-indicator"></span>
                {props.name}
            </div>
            
            <div className="board__column-single">

                <TaskCard />

            </div>
        </div>
    )
}