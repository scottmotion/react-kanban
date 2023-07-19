import { useState, useEffect } from "react"

import './App.css'
import Sidebar from './Components/Sidebar'
import BoardWrapper from './Components/BoardWrapper'
import AppHeader from './Components/AppHeader'
import ColumnsWrapper from "./Components/ColumnsWrapper"
import AddBoardModal from "./Components/Modals/AddBoardModal"
import UpdateBoardModal from "./Components/Modals/UpdateBoardModal"
import ConfirmDeleteModal from "./Components/Modals/ConfirmDeleteModal"

import { onSnapshot, addDoc, doc, deleteDoc, setDoc, collection } from "firebase/firestore"
import { boardsCollection, db } from "./firebase"

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [boards, setBoards] = useState([])
  const [currentBoardId, setCurrentBoardId] = useState("")

  const [modalOpen, setModalOpen] = useState("")

  // const [currentBoard, setCurrentBoard] = useState({})

  const currentBoard = boards.find(board => board.id === currentBoardId) || boards[0]
  // const sortedBoards = boards.sort((a,b) => b.updatedAt - a.updatedAt)

  // check if there is a currentBoardId before rendering child that needs currentBoardId as prop
  const loading = !currentBoardId;

  function toggleDarkMode() {
    setDarkMode(prevMode => !prevMode)
  }

  // supress animation until first load
  setTimeout(function(){
    document.body.className="loaded";
  },1000);

  function hideSidebar() {
    setSidebarVisible(false)
  }
  function showSidebar() {
    setSidebarVisible(true)
  }

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

  // add new board
  async function addBoard(data) {
    setModalOpen("")
    const newBoard = {
        name: data.name,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    const newBoardRef = await addDoc(boardsCollection, newBoard)
    setCurrentBoardId(newBoardRef.id)
  }

  async function updateBoard(data) {
      const docRef =  doc(db, "boards", currentBoardId)
      const newData = {
        name: data.name,
        updatedAt: Date.now()
      }
      const options = {merge: true}
      await setDoc(docRef, newData, options)
      setModalOpen("")
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
  }

  return (
    <>
      <AppHeader darkMode={darkMode} currentBoard={currentBoard} setModalOpen={setModalOpen} confirmDeleteBoard={confirmDeleteBoard}/>
      <BoardWrapper sidebarVisible={sidebarVisible} showSidebar={showSidebar} darkMode={darkMode}>
        <Sidebar
          sidebarVisible={sidebarVisible}
          hideSidebar={hideSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          boards={boards}
          currentBoardId={currentBoardId}
          setCurrentBoardId={setCurrentBoardId}
          setModalOpen={setModalOpen}
        />
        {loading
          ? null
          : <ColumnsWrapper darkMode={darkMode} currentBoard={currentBoard} />
        }
      </BoardWrapper>
      {(modalOpen === "addBoard") && <AddBoardModal setModalOpen={setModalOpen} addBoard={addBoard} darkMode={darkMode} />}
      {(modalOpen === "updateBoard") && <UpdateBoardModal setModalOpen={setModalOpen} updateBoard={updateBoard} currentBoard={currentBoard} darkMode={darkMode} />}
      {(modalOpen === "confirmDeleteBoard") && <ConfirmDeleteModal setModalOpen={setModalOpen} deleteBoard={deleteBoard} currentBoardId={currentBoardId} darkMode={darkMode} />}
    </>
  )
}

export default App
