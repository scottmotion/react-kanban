import { useState, useEffect, createContext } from "react"
import { onSnapshot, addDoc, doc, deleteDoc, updateDoc, collection, query, where, getCountFromServer } from "firebase/firestore"
import { boardsCollection } from "./firebase"

import './App.css'
import AppHeader from './Components/AppHeader/AppHeader'
import BoardWrapper from './Components/Board/BoardWrapper'
import Sidebar from './Components/Sidebar/Sidebar'
import ThemeToggle from "./Components/Sidebar/ThemeToggle"
import Board from "./Components/Board/Board"
import BoardsDropdown from "./Components/Dropdowns/BoardsDropdown"
import MobileBoardsDropdown from "./Components/Dropdowns/MobileBoardsDropdown"
import AddBoardModal from "./Components/Modals/AddBoardModal"
import UpdateBoardModal from "./Components/Modals/UpdateBoardModal"
import AddTaskModal from "./Components/Modals/AddTaskModal"
import ShowTaskModal from "./Components/Modals/ShowTaskModal"
import UpdateTaskModal from "./Components/Modals/UpdateTaskModal"
import ConfirmDeleteModal from "./Components/Modals/ConfirmDeleteModal"

export const ThemeContext = createContext('dark');

function App() {

  const [theme, setTheme] = useState('dark');

  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [modalOpen, setModalOpen] = useState("")

  const [boards, setBoards] = useState([])
  const [currentBoardId, setCurrentBoardId] = useState(boards[0]?.id)

  const [columns, setColumns] = useState([])
  const [columnCount, setColumnCount] = useState(0)

  const [currentTask, setCurrentTask] = useState({})

  const [willDeleteId, setWillDeleteId] = useState({ type: "", id: "" })

  const currentBoard = boards.find(board => board.id === currentBoardId) || boards[0]

  // check if there is a currentBoardId before rendering child that needs currentBoardId as prop
  const loading = !currentBoardId;

  // supress animation until first load
  setTimeout(function () {
    document.body.className = "loaded";
  }, 1000);

  function toggleTheme(e, mode) {
    e.stopPropagation();
    if (mode) {
      // console.log("mode: ", mode)
      setTheme(mode)
    } else {
      if (theme === 'dark') {
        setTheme('light')
      } else if (theme === 'light') {
        setTheme('dark')
      }
    }

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


  //////////////////////
  // BOARDS GET & SET
  //////////////////////

  // get boards from firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(boardsCollection, function (snapshot) {
      const boardsArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      const sortedBoards = boardsArr.sort((a, b) => b.updatedAt - a.updatedAt)
      setBoards(sortedBoards)
    })
    return unsubscribe
  }, [])

  // set current board ID
  useEffect(() => {
    if (!currentBoardId) {
      setCurrentBoardId(boards[0]?.id)
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

    let docRef
    if (boardId) {
      docRef = doc(boardsCollection, boardId)
    } else {
      docRef = doc(boardsCollection, currentBoardId)
    }

    const newData = {
      name: data.name,
      updatedAt: Date.now()
    }
    setModalOpen("")
    return await updateDoc(docRef, newData)

  }

  //confirm before delete board
  function confirmDeleteBoard(boardId) {
    setModalOpen("confirmDelete")
    setCurrentBoardId(boardId)
    setWillDeleteId({ type: "board", id: boardId })
  }

  // delete board
  async function deleteBoard(boardId) {
    const docRef = doc(boardsCollection, boardId)
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
      columnsCollection = collection(boardsCollection, boardRef.id, "columns")
    } else {
      columnsCollection = collection(boardsCollection, currentBoardId, "columns")
    }
    const newColumnRef = await addDoc(columnsCollection, newColumn)
    setModalOpen("")
    return newColumnRef
  }

  // update column
  async function updateColumn(data, boardId) {
    let docRef

    if (boardId) {
      docRef = doc(boardsCollection, boardId, "columns", data.id)
    } else {
      docRef = doc(boardsCollection, currentBoardId, "columns", data.id)
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

    const docRef = doc(boardsCollection, boardId, "columns", columnId)
    await deleteDoc(docRef)
    setModalOpen("")
    // TODO: recursively delete tasks
  }

  //////////////////////
  // TASKS CRUD
  //////////////////////

  // add new task
  async function addTask(task, subtasks) {
    const tasksCollection = collection(boardsCollection, currentBoardId, "tasks")
    const q = query((tasksCollection), where("columnId", "==", task.columnId));
    const snapshot = await getCountFromServer(q);
    const taskCount = snapshot.data().count
    const newTask = {
      name: task.name,
      description: task.description,
      columnId: task.columnId,
      subtasks: subtasks,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      order: (taskCount)
    }
    setModalOpen("")
    return await addDoc(tasksCollection, newTask)
  }

  async function changeTaskColumn(taskId, columnId, boardId) {
    let docRef
    if (boardId) {
      docRef = doc(boardsCollection, boardId, "tasks", taskId)
    } else {
      docRef = doc(boardsCollection, currentBoardId, "tasks", taskId)
    }
    return await updateDoc(docRef, { columnId: columnId })
    // TODO: currentTask is still old task
  }

  // update task
  async function updateTask(data, boardId) {
    let docRef

    if (boardId) {
      docRef = doc(boardsCollection, boardId, "tasks", data.id)
    } else {
      docRef = doc(boardsCollection, currentBoardId, "tasks", data.id)
    }

    const newData = {
      name: data.name,
      description: data.description,
      columnId: data.columnId,
      subtasks: data.subtasks,
      updatedAt: Date.now()
    }

    setModalOpen("")
    return await updateDoc(docRef, newData)
  }

  //confirm before delete task
  function confirmDeleteTask(taskId) {
    setModalOpen("confirmDelete")
    // setCurrentTaskId(taskId)
    setWillDeleteId({ type: "task", id: taskId })
  }

  // delete task
  async function deleteTask(taskId) {
    const docRef = doc(boardsCollection, currentBoardId, "tasks", taskId)
    await deleteDoc(docRef)
    setModalOpen("")
    // setCurrentTaskId(false)
    setWillDeleteId(false)
    // TODO: recursively reorder tasks
  }

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <AppHeader
          setModalOpen={setModalOpen}
          currentBoard={currentBoard}
          columnCount={columnCount}
          confirmDelete={confirmDeleteBoard}
        >
          {/* <BoardsDropdown
            boards={boards}
            currentBoardId={currentBoardId}
            setCurrentBoardId={setCurrentBoardId}
          /> */}
          <MobileBoardsDropdown
            boards={boards}
            currentBoardId={currentBoardId}
            setCurrentBoardId={setCurrentBoardId}
          >
            <ThemeToggle
              toggleTheme={toggleTheme}
            />
          </MobileBoardsDropdown>
        </AppHeader>

        <BoardWrapper
          sidebarVisible={sidebarVisible}
          showSidebar={showSidebar}
        >
          <Sidebar
            sidebarVisible={sidebarVisible}
            hideSidebar={hideSidebar}
            setModalOpen={setModalOpen}
            boards={boards}
            currentBoardId={currentBoardId}
            setCurrentBoardId={setCurrentBoardId}
          >
            <ThemeToggle
              toggleTheme={toggleTheme}
            />
          </Sidebar>
          {loading
            ? null
            : <Board
              setModalOpen={setModalOpen}
              currentBoard={currentBoard}
              setColumns={setColumns}
              setColumnCount={setColumnCount}
              setCurrentTask={setCurrentTask}
            />
          }
        </BoardWrapper>

        {(modalOpen === "addBoard") &&
          <AddBoardModal
            setModalOpen={setModalOpen}
            addBoard={addBoard}
            addColumn={addColumn}
          />
        }
        {(modalOpen === "updateBoard") &&
          <UpdateBoardModal
            setModalOpen={setModalOpen}
            currentBoard={currentBoard}
            editItem={updateBoard}
            columns={columns}
            addColumn={addColumn}
            updateColumn={updateColumn}
            deleteColumn={deleteColumn}
          />
        }
        {(modalOpen === "addTask") &&
          <AddTaskModal
            setModalOpen={setModalOpen}
            columns={columns}
            addTask={addTask}
          />
        }
        {(modalOpen === "showTask") &&
          <ShowTaskModal
            setModalOpen={setModalOpen}
            currentBoardId={currentBoardId}
            columns={columns}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            confirmDelete={confirmDeleteTask}
            editItem={updateTask}
            changeTaskColumn={changeTaskColumn}
          />
        }
        {(modalOpen === "updateTask") &&
          <UpdateTaskModal
            setModalOpen={setModalOpen}
            columns={columns}
            currentTask={currentTask}
            editItem={updateTask}
          />
        }

        {(modalOpen === "confirmDelete") &&
          <ConfirmDeleteModal
            setModalOpen={setModalOpen}
            willDeleteId={willDeleteId}
            deleteBoard={deleteBoard}
            deleteTask={deleteTask}
          />
        }
      </ThemeContext.Provider>
    </>
  )
}

export default App
