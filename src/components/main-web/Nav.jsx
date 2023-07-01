import React, { useState } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import "../../styles/main-web/nav.css";
import { useNavigate } from "react-router-dom";

export const Nav = () => {

  const navigate = useNavigate()
  const [username,setUsername] = useState(localStorage.getItem('mathcode-username'))
  const [token,setToken] = useState(localStorage.getItem('mathcode-token'));

  const handleLogout = () => {
      localStorage.removeItem('mathcode-token');
      localStorage.removeItem('mathcode-username');
      localStorage.removeItem('filters');
      navigate('/login')
  }

  return (
    <nav className="navbar-main">
      <div className="nav-list nav-list1">
        <a href="/">mathcode</a>
        <a href="/problem-set/all">practise</a>
        <a href="/test">test</a>
      </div>
      <div className="nav-list nav-list2">
        <div className="streak">
          <span>Streak</span>
          <div className="streak-child">
            <AiOutlineFire />
            <span>69</span>
          </div>
        </div>
        <div className="credits">
          <span>Your Credits</span>
          <div className="credits-child">
            <AiFillThunderbolt />
            <span>64</span>
          </div>
        </div>
        <div onClick={()=>{
          document.querySelector('.user-profile').classList.toggle('show-profile')
        }} className="user-div">
          <FaRegUserCircle />
          <div  onClick={handleLogout} className="user-profile">
            <span>Logout</span>
            <BiLogOutCircle/>
          </div>
        </div>
        {/* <Profile/> */}
      </div>
    </nav>
  );
};
