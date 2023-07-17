import { useState, useEffect } from "react"

import './App.css'
import Sidebar from './Components/Sidebar'
import SidebarButton from "./Components/SidebarButton"
import BoardWrapper from './Components/BoardWrapper'
import AppHeader from './Components/AppHeader'
import ColumnsWrapper from "./Components/ColumnsWrapper"

import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { boardsCollection, db } from "./firebase"

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [boards, setBoards] = useState([])

  function toggleDarkMode() {
    setDarkMode(prevMode => !prevMode)
  }
  // console.log("Toggle Mode: ", darkMode)

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
    })
    return unsubscribe
  }, [])

  return (
    <>
      <AppHeader darkMode={darkMode}/>
      <BoardWrapper sidebarVisible={sidebarVisible} showSidebar={showSidebar} darkMode={darkMode}>
        <Sidebar sidebarVisible={sidebarVisible} hideSidebar={hideSidebar} darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
          <SidebarButton active="true"/>
          <SidebarButton />
          <SidebarButton />
        </Sidebar>
        <ColumnsWrapper darkMode={darkMode}/>
      </BoardWrapper>
    </>
  )
}

export default App
