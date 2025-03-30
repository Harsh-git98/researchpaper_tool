import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import './App.css'

function Header({OpenSidebar}){
  return (
   
        <header className="header">
            <div className="menu-icon">
                <BsJustify className='icon big'onClick={OpenSidebar}/>
            </div>
            <div className="header-left">
                {/* <BsSearch className='icon'/> */}
            </div>
            <div className="header-right">
                <h4>#IT ROCKS</h4>
            </div>
        </header>
      
    
  )
}

export default Header
