import React from 'react'
import '../styles/landing.css'
import {AiOutlineRight} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {
    const navigate = useNavigate();
  return (
    <section className='landing-wrapper'>
        <nav className='navbar'><h2>mathcode</h2></nav>
        <div className="landing-card">
            <h2>A new way to practise maths</h2>
            <p>mathcode is a platform to help you enhance your math skills, expand your knowledge, and engage with the mathematical community</p>
            <button onClick={()=>navigate('/register')}>Create Account<AiOutlineRight/></button>
        </div>
    </section>
  )
}
