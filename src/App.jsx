import { useState } from "react"

import './App.css'
import Sidebar from './Components/Sidebar'
import SidebarButton from "./Components/SidebarButton"
import BoardWrapper from './Components/BoardWrapper'
import AppHeader from './Components/AppHeader'
import BoardColumns from './Components/BoardColumns'

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  // allow animation after load
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
      <AppHeader />
      <BoardWrapper sidebarVisible={sidebarVisible} showSidebar={showSidebar}>
        <Sidebar sidebarVisible={sidebarVisible} hideSidebar={hideSidebar}>
          <SidebarButton active="true"/>
          <SidebarButton />
          <SidebarButton />
        </Sidebar>
        <BoardColumns />
      </BoardWrapper>
    </>
  )
}

export default App
