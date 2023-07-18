import { useState, useEffect } from "react"

import './App.css'
import Sidebar from './Components/Sidebar'
import BoardWrapper from './Components/BoardWrapper'
import AppHeader from './Components/AppHeader'
import ColumnsWrapper from "./Components/ColumnsWrapper"
import NewBoardModal from "./Components/Modals/NewBoardModal"

import { onSnapshot, addDoc, doc, deleteDoc, setDoc, collection } from "firebase/firestore"
import { boardsCollection, db } from "./firebase"

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [boards, setBoards] = useState([])
  const [currentBoardId, setCurrentBoardId] = useState("")

  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);

  const currentBoard = boards.find(board => board.id === currentBoardId) || boards[0]
  const sortedBoards = boards.sort((a,b) => b.updatedAt - a.updatedAt)

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

  useEffect(() => {
    const unsubscribe = onSnapshot(boardsCollection, function(snapshot) {
        // Sync up our local notes array with the snapshot data
        const boardsArr = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        setBoards(boardsArr)
        // console.log(boardsArr)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!currentBoardId) {
        setCurrentBoardId(boards[0]?.id)
    }
  }, [boards])

  // check if there is a currentBoardId before rendering child that needs currentBoardId as prop
  const loading = !currentBoardId;
  console.log("loading: ", loading)

  return (
    <>
      <AppHeader darkMode={darkMode} currentBoard={currentBoard}/>
      <BoardWrapper sidebarVisible={sidebarVisible} showSidebar={showSidebar} darkMode={darkMode}>
        <Sidebar
          sidebarVisible={sidebarVisible}
          hideSidebar={hideSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          boards={boards}
          currentBoardId={currentBoardId}
          setCurrentBoardId={setCurrentBoardId}
          setNewBoardModalOpen={setNewBoardModalOpen}
        />
        {loading
          ? null
          : <ColumnsWrapper darkMode={darkMode} currentBoard={currentBoard} />
        }
      </BoardWrapper>
      {newBoardModalOpen && <NewBoardModal setNewBoardModalOpen={setNewBoardModalOpen} />}
      {/* <NewBoardModal /> */}
    </>
  )
}

export default App
