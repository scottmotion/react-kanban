import { useState } from "react"

import './App.css'
import Sidebar from './Components/Sidebar'
import SidebarButton from "./Components/SidebarButton"
import BoardWrapper from './Components/BoardWrapper'
import AppHeader from './Components/AppHeader'
import ColumnsWrapper from "./Components/ColumnsWrapper"

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

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
