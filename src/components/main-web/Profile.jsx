import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
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
    token?<div className='profile-wrapper'>
        <p>{username?username:'user'}</p>
        <button onClick={handleLogout}>logout</button>
    </div>:''
  )
}
