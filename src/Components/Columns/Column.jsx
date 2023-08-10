import { useState, useEffect } from 'react'
import { onSnapshot, query, where } from 'firebase/firestore'
import TaskCard from '../Task/TaskCard'
import './Column.css'

export default function Column(props) {
    const [tasks, setTasks] = useState([])
    const tasksCollection = props.tasksCollection

    //////////////////////
    // TASKS GET & SET
    //////////////////////

    const q = query((tasksCollection), where("columnId", "==", props.id));
    useEffect(() => {
        const unsubscribe = onSnapshot(q, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const tasksArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            const sortedTasks = tasksArr.sort((a,b) => a.order - b.order)
            setTasks(sortedTasks)
        })
        return unsubscribe
    }, [props.id])

    const taskElements = tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          columnId={props.id}
          tasksCollection={tasksCollection}
          setModalOpen={props.setModalOpen}
          setCurrentColumnId={props.setCurrentColumnId}
          setCurrentTask={props.setCurrentTask}
        />
    ))
    
    return (
        <div className="board__column-single--wrapper" id={props.id}>

            <div className="board__column-title">
                <span className="board__column-indicator"></span>
                {props.name}
                <span className="board__column-task-count">({tasks.length})</span>
            </div>
            
            <div className="board__column-single">
                {taskElements}
            </div>
        </div>
    )
}