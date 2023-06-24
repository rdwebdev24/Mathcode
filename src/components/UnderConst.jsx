import React from 'react'
import '../styles/landing-web/underCnstrct.css'
import { useNavigate } from 'react-router-dom'
export const UnderConst = () => {
  const navigate = useNavigate();
  return (
    <div className='under-cnstrct'>
      <h1>Under Construction </h1>
      <button className='und-cnst-btn' onClick={()=>navigate('/')}>Go back</button>
    </div>
  )
}
