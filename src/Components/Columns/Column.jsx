import { useState, useEffect } from 'react'
import { onSnapshot, query, where } from 'firebase/firestore'
import TaskCard from '../Task/TaskCard'
import './Column.css'

export default function Column({ columnName, columnId, tasksCollection, setModalOpen, setCurrentTask, setCurrentColumnId }) {

    const [tasks, setTasks] = useState([])

    //////////////////////
    // TASKS GET & SET
    //////////////////////

    const q = query((tasksCollection), where("columnId", "==", columnId));
    useEffect(() => {
        const unsubscribe = onSnapshot(q, function (snapshot) {
            // Sync up our local notes array with the snapshot data
            const tasksArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            const sortedTasks = tasksArr.sort((a, b) => a.order - b.order)
            setTasks(sortedTasks)
        })
        return unsubscribe
    }, [columnId])

    const taskElements = tasks.map((task, index) => (
        <TaskCard
            key={task.id}
            task={task}
            columnId={columnId}
            setModalOpen={setModalOpen}
            setCurrentColumnId={setCurrentColumnId}
            setCurrentTask={setCurrentTask}
        />
    ))

    return (
        <div className="board__column-single--wrapper" id={columnId}>

            <div className="board__column-title">
                <span className="board__column-indicator"></span>
                {columnName}
                <span className="board__column-task-count">({tasks.length})</span>
            </div>

            <div className="board__column-single">
                {taskElements}
            </div>
        </div>
    )
}