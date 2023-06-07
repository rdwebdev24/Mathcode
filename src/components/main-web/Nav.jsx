import React from 'react'
import {AiOutlineFire} from 'react-icons/ai'
import {BsBell} from 'react-icons/bs'
import {FaRegUserCircle} from 'react-icons/fa'
import '../../styles/main-web/nav.css'

export const Nav = () => {
  return (
    <nav className='navbar-main'>
        <div className="nav-list nav-list1">
            <a href="/">mathcode</a>
            <a href="/problem-set/all">problems</a>
            <a href="/learn">learn</a>
            <a href="/test">test</a>
        </div>
        <div className="nav-list nav-list2">
            <a href='#'><BsBell/></a>
            <div className='streak'><AiOutlineFire/> <span>0</span></div>
            <a href='#'><FaRegUserCircle/></a>
        </div>
    </nav>
  )
}
