import { useState, useEffect } from "react"

import './App.css'
import AppHeader from './Components/AppHeader/AppHeader'
import BoardWrapper from './Components/Board/BoardWrapper'
import Sidebar from './Components/Sidebar/Sidebar'
import Board from "./Components/Board/Board"

import AddBoardModal from "./Components/Modals/AddBoardModal"
import UpdateBoardModal from "./Components/Modals/UpdateBoardModal"
import ConfirmDeleteModal from "./Components/Modals/ConfirmDeleteModal"
import AddColumnModal from "./Components/Modals/AddColumnModal"
import AddTaskModal from "./Components/Modals/AddTaskModal"

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
    console.log("updateBoard(data, boardId) ", data, boardId)

    // const docRef =  doc(db, "boards", currentBoardId)

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
    // const options = {merge: true}

    // await setDoc(docRef, newData, options)
    // .then(() => {
    //   console.log("Successful")})
    // .catch((error) => {
    //   console.log(`Unsuccessful returned error ${error}`)});
    // setModalOpen("")
  
    return await updateDoc(docRef, newData)
    // .then(() => {
    //   console.log("updateDoc Successful")
    //   setModalOpen("")
    // })
    // .catch((error) => {
    //   console.log(`Unsuccessful returned error ${error}`)
    // });

  }

  //confirm before delete board
  function confirmDeleteBoard(boardId) {
    setModalOpen("confirmDeleteBoard")
    setCurrentBoardId(boardId)
  }

  // delete board
  async function deleteBoard(boardId) {
    const docRef = doc(db, "boards", boardId)
    await deleteDoc(docRef)
    setModalOpen("")
    setCurrentBoardId(false)
    // TODO: recursively delete columns and tasks
  }


  //////////////////////
  // COLUMNS GET & SET
  //////////////////////

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(columnsCollection, function(snapshot) {
  //     // Sync up our local notes array with the snapshot data
  //     const columnsArr = snapshot.docs.map(doc => ({
  //         ...doc.data(),
  //         id: doc.id
  //     }))
  //     const sortedColumns = columnsArr.sort((a,b) => a.order - b.order)
  //     setColumns(sortedColumns)
  //     setColumnCount(columnsArr.length)
  //   })
  //   return unsubscribe
  // }, [currentBoard])


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
    console.log("updateColumn(data, boardId) ", data, boardId)
    let docRef
    if (boardId) {
      docRef = doc(db, "boards", boardId, "columns", data.id)
    } else {
      docRef = doc(db, "boards", currentBoardId, "columns", data.id)
    }


    // let columnsCollection
    // if (boardId) {
    //   console.log("boardId: ", boardId)
    //   columnsCollection = collection(db, "boards", boardId, "columns" )
    //   console.log("columnsCollection: ", columnsCollection)
    // } else {
    //   columnsCollection = collection(db, "boards", currentBoardId, "columns" )
    //   console.log("columnsCollection: ", columnsCollection)
    // }

    // const docRef = doc(columnsCollection, data.columnId)

    // let docRef
    // if (boardId) {
    //   docRef = doc(db, "boards", boardId, "columns", data.columnId )
    // } else {
    //   docRef = doc(db, "boards", currentBoardId, "columns", data.columnId )
    // }

    const newData = {
      name: data.name,
      updatedAt: Date.now()
    }
    // const options = {merge: true}
    // await setDoc(docRef, newData, options)
    // setModalOpen("")
    return await updateDoc(docRef, newData)
    // await updateDoc(docRef, newData)
    // .then((success) => {
    //   console.log("Successful")
    //   setModalOpen("")
    // })
    // .catch((error) => {
    //   console.log(`Unsuccessful returned error ${error}`)
    // });

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
    // console.log("Task Added: ", task)
    // console.log("data.columnId: ", task.columnId)
    // console.log("tasksCollection: ", tasksCollection)
    // console.log("Columns: ", columns)
    setModalOpen("")
  }

  return (
    <>
      <AppHeader
        darkMode={darkMode}
        setModalOpen={setModalOpen}
        currentBoard={currentBoard}
        columnCount={columnCount}
        confirmDeleteBoard={confirmDeleteBoard}
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
          columns={columns}
          updateBoard={updateBoard}
          updateColumn={updateColumn}
        />
      }
      {(modalOpen === "confirmDeleteBoard") &&
        <ConfirmDeleteModal
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
        <AddTaskModal
          darkMode={darkMode}
          setModalOpen={setModalOpen}
          currentBoardId={currentBoardId}
          columns={columns}
          addTask={addTask}
        />
      }

    </>
  )
}

export default App
