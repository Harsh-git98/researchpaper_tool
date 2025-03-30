import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import {
  BrowserRouter,
  Routes,
  Route
 } from "react-router-dom";
import Schedule from './Schedule'

import Analytics from './Analytics'
import { HiLogin } from 'react-icons/hi'


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  

  return (
    
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>} ></Route>



      <Route path="/History" element={<div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Schedule/>
    </div>} ></Route>
    <Route path="/Info" element={<div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Analytics/>
    </div>} ></Route>

    

    

    <Route path='/*' element={<div><hr></hr><h1>Error:404</h1> Page not Found!!<hr></hr></div>}></Route>



    </Routes>
  </BrowserRouter>

    
  )
}

export default App