import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs';
 import { Link } from 'react-router-dom';
 import { HiAcademicCap } from "react-icons/hi";
 import { HiCalendar } from "react-icons/hi";


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <HiAcademicCap className='icon_header'/> IT 2022-26
            </div>
            <span className='card_icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
        <div className="sidebarflex">

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/History">
                    <BsMenuButtonWideFill className='icon'/> History
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Info">
                    <HiCalendar className='icon'/> Info
                </Link>
            </li>
           

            
            
        </ul>
        <footer>
               <a href='https://www.linkedin.com/in/harshrjn/'>Built with &#10084; by Harsh Ranjan</a>
        </footer>

        </div>
        
        
    </aside>
    
  )
}

export default Sidebar