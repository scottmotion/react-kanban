import { useState } from "react"

import './App.css'
import PageLayout from './Components/PageLayout'
import Sidebar from './Components/Sidebar'
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
    // <PageLayout>
    <>
      <AppHeader />
      <BoardWrapper sidebarVisible={sidebarVisible} showSidebar={showSidebar}>
        <Sidebar sidebarVisible={sidebarVisible} hideSidebar={hideSidebar} />
        <BoardColumns sidebarVisible={sidebarVisible}/>
      </BoardWrapper>
    </>
    // </PageLayout>
  )
}

export default App
