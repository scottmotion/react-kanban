import { useState, useEffect } from "react"

import './App.css'
import AppHeader from './Components/AppHeader/AppHeader'
import BoardWrapper from './Components/Board/BoardWrapper'
import Sidebar from './Components/Sidebar/Sidebar'
import Board from "./Components/Board/Board"

import AddBoardModal from "./Components/Modals/AddBoardModal"
import UpdateBoardModal from "./Components/Modals/UpdateBoardModal"
import ConfirmDeleteBoardModal from "./Components/Modals/ConfirmDeleteBoardModal"
import AddColumnModal from "./Components/Modals/AddColumnModal"
import AddTaskModal from "./Components/Modals/AddTaskModal"
import ShowTaskModal from "./Components/Modals/ShowTaskModal"
import ConfirmDeleteModal from "./Components/Modals/ConfirmDeleteModal"

import { onSnapshot, addDoc, doc, deleteDoc, setDoc, updateDoc, collection } from "firebase/firestore"
import { boardsCollection, db } from "./firebase"

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [modalOpen, setModalOpen] = useState("")

  const [boards, setBoards] = useState([])
  const [currentBoardId, setCurrentBoardId] = useState(boards[0]?.id)
  
  const [columns, setColumns] = useState([])
  const [columnCount, setColumnCount] = useState(0)
  const [currentColumnId, setCurrentColumnId] = useState("")

  const [currentTask, setCurrentTask] = useState({})
  const [currentTaskId, setCurrentTaskId] = useState("")

  const [willDeleteId, setWillDeleteId] = useState({type: "", id: ""})


  const currentBoard = boards.find(board => board.id === currentBoardId) || boards[0]

  // check if there is a currentBoardId before rendering child that needs currentBoardId as prop
  const loading = !currentBoardId;

  // supress animation until first load
  setTimeout(function(){
    document.body.className="loaded";
  },1000);

  function toggleDarkMode() {
    setDarkMode(prevMode => !prevMode)
  }

  function hideSidebar() {
    setSidebarVisible(false)
  }
  function showSidebar() {
    setSidebarVisible(true)
  }

  //////////////////////
  // GENERAL CRUD
  //////////////////////

  //confirm before delete
  function confirmDelete(itemId) {
    // setModalOpen("confirmDeleteBoard")
    // setCurrentBoardId(boardId)
  }

  //////////////////////
  // BOARDS GET & SET
  //////////////////////

  // get boards from firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(boardsCollection, function(snapshot) {
      const boardsArr = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
      }))
      const sortedBoards = boardsArr.sort((a,b) => b.updatedAt - a.updatedAt)
      setBoards(sortedBoards)
    })
    return unsubscribe
  }, [])

  // set current board ID
  useEffect(() => {
    if (!currentBoardId) {
      setCurrentBoardId(boards[0]?.id)
      console.log("currentBoardId: ", currentBoardId)
    }
  }, [boards, currentBoardId])

  //////////////////////
  // BOARDS CRUD
  //////////////////////

  // add new board
  async function addBoard(data) {
    const newBoard = {
      name: data.name,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const newBoardRef = await addDoc(boardsCollection, newBoard)
    setCurrentBoardId(newBoardRef.id)
    setModalOpen("")
    return newBoardRef
  }
  
  // update board
  async function updateBoard(data, boardId) {
    // console.log("updateBoard(data, boardId) ", data, boardId)

    let docRef
    if (boardId) {
      docRef = doc(db, "boards", boardId)
    } else {
      docRef = doc(db, "boards", currentBoardId)
    }

    const newData = {
      name: data.name,
      updatedAt: Date.now()
    }
  
    return await updateDoc(docRef, newData)

  }

  //confirm before delete board
  function confirmDeleteBoard(boardId) {
    setModalOpen("confirmDelete")
    setCurrentBoardId(boardId)
    setWillDeleteId({type: "board", id: boardId})
  }

  // delete board
  async function deleteBoard(boardId) {
    const docRef = doc(db, "boards", boardId)
    await deleteDoc(docRef)
    setModalOpen("")
    setCurrentBoardId(false)
    setWillDeleteId(false)
    // TODO: recursively delete columns and tasks
  }


  //////////////////////
  // COLUMNS CRUD
  //////////////////////

  // add new column
  async function addColumn(data, columnIndex, boardRef) {
    const newColumn = {
      name: data.name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      order: columnIndex
    }
    let columnsCollection
    if (boardRef) {
      columnsCollection = collection(db, "boards", boardRef.id, "columns" )
    } else {
      columnsCollection = collection(db, "boards", currentBoardId, "columns" )
    }
    const newColumnRef = await addDoc(columnsCollection, newColumn)
    console.log("newColumnRef: ", newColumnRef)
    setModalOpen("")
    return newColumnRef
  }

  // update column
  async function updateColumn(data, boardId) {
    // console.log("updateColumn(data, boardId) ", data, boardId)
    let docRef

    if (boardId) {
      docRef = doc(db, "boards", boardId, "columns", data.id)
    } else {
      docRef = doc(db, "boards", currentBoardId, "columns", data.id)
    }

    const newData = {
      name: data.name,
      order: data.order,
      updatedAt: Date.now()
    }

    return await updateDoc(docRef, newData)
  }


  // delete column
  async function deleteColumn(boardId, columnId) {
    // console.log("deleteColumn(boardId, columnId) ", boardId, columnId)

    const docRef = doc(db, "boards", boardId, "columns", columnId)
    await deleteDoc(docRef)
    setModalOpen("")
    // TODO: recursively delete tasks
  }
  //////////////////////
  // TASKS CRUD
  //////////////////////

  // add new task
  async function addTask(task, subtasks) {
    const newTask = {
      title: task.name,
      description: task.description,
      status: task.columnId,
      subtasks: subtasks,
      createdAt: Date.now(),
      updatedAt: Date.now()
      // order: (taskCount + 1)
    }
    const tasksCollection = collection(boardsCollection, currentBoardId, "columns", task.columnId, "tasks" )
    await addDoc(tasksCollection, newTask)
    setModalOpen("")
  }

  //confirm before delete task
  function confirmDeleteTask(taskId) {
    setModalOpen("confirmDelete")
    setCurrentTaskId(taskId)
    setWillDeleteId({type: "task", id: taskId})
  }

  // delete task
  async function deleteTask(taskId) {
    const docRef = doc(db, "boards", currentBoardId, "columns", currentColumnId, "tasks", taskId)
    await deleteDoc(docRef)
    setModalOpen("")
    setCurrentTaskId(false)
    setWillDeleteId(false)
    // TODO: recursively delete columns and tasks
  }







  return (
    <>
      <AppHeader
        darkMode={darkMode}
        setModalOpen={setModalOpen}
        currentBoard={currentBoard}
        columnCount={columnCount}
        // confirmDeleteBoard={confirmDeleteBoard}
        confirmDelete={confirmDeleteBoard}
      />
      
      <BoardWrapper sidebarVisible={sidebarVisible} showSidebar={showSidebar} darkMode={darkMode}>
        <Sidebar
          sidebarVisible={sidebarVisible}
          hideSidebar={hideSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          setModalOpen={setModalOpen}
          boards={boards}
          currentBoardId={currentBoardId}
          setCurrentBoardId={setCurrentBoardId}
        />
        {loading
          ? null
          : <Board
              darkMode={darkMode}
              setModalOpen={setModalOpen}
              currentBoard={currentBoard}
              setColumns={setColumns}
              setColumnCount={setColumnCount}
              setCurrentColumnId={setCurrentColumnId}
              setCurrentTask={setCurrentTask}
            />
        }
      </BoardWrapper>
      
      {(modalOpen === "addBoard") &&
        <AddBoardModal
          darkMode={darkMode}
          setModalOpen={setModalOpen}
          addBoard={addBoard}
          addColumn={addColumn}
        />
      }
      {(modalOpen === "updateBoard") &&
        <UpdateBoardModal
          darkMode={darkMode}
          setModalOpen={setModalOpen}
          currentBoard={currentBoard}
          updateBoard={updateBoard}
          columns={columns}
          addColumn={addColumn}
          updateColumn={updateColumn}
          deleteColumn={deleteColumn}
        />
      }
      {(modalOpen === "confirmDeleteBoard") &&
        <ConfirmDeleteBoardModal
          darkMode={darkMode}
          setModalOpen={setModalOpen}
          currentBoardId={currentBoardId}
          deleteBoard={deleteBoard}
        />
      }
      {(modalOpen === "addColumn") &&
        <AddColumnModal
          darkMode={darkMode}
          setModalOpen={setModalOpen}
          currentBoardId={currentBoardId}
          addColumn={addColumn}
        />
      }
      {(modalOpen === "addTask") &&
        <AddTaskModal
          darkMode={darkMode}
          setModalOpen={setModalOpen}
          currentBoardId={currentBoardId}
          columns={columns}
          addTask={addTask}
        />
      }
      {(modalOpen === "showTask") &&
        <ShowTaskModal
          darkMode={darkMode}
          setModalOpen={setModalOpen}
          currentBoardId={currentBoardId}
          columns={columns}
          currentColumnId={currentColumnId}
          addTask={addTask}
          currentTask={currentTask}
          confirmDelete={confirmDeleteTask}
        />
      }
      {(modalOpen === "confirmDelete") &&
        <ConfirmDeleteModal
          darkMode={darkMode}
          setModalOpen={setModalOpen}
          willDeleteId={willDeleteId}
          deleteBoard={deleteBoard}
          deleteTask={deleteTask}
        />
      }

    </>
  )
}

export default App
