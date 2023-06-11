import React from 'react'
import { useGlobalContext } from '../config/Context';
import { useNavigate } from 'react-router-dom';
import {AiFillGoogleCircle,AiFillLock} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa'
import {getAuth , GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {authProvider} from '../config/Auth'
import axios from 'axios';
import '../styles/login.css'
export const Login = () => {
    const {url} = useGlobalContext();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const Data = new FormData(e.currentTarget);
        const userData = {
            username: Data.get('username'),
            password: Data.get('password'),
        };
        const  headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
        }
        const {data} = await axios.post(url+'/login',userData,headers);
        if(data.status==400){
            alert(data.msg);
            return;
        }
        localStorage.setItem("username",data.user.username)
        navigate('/problem-set/all')
    };
    
      const googleAuth = async () => {
            const login = await authProvider.login();
            if(login=='login') navigate('/problem-set/all')
      }

  return (
    <section className='signup-wrapper login-wrapper'>
        <div className="signup-card login-card">
            <h2>Login</h2>
            <form className='signup-form login-form' onSubmit={handleSubmit}>
                <div className="form-control">
                    <span><FaUser/></span>
                    <input placeholder='Username' name='username' type="text" id='username'/>
                </div>
                <div className="form-control">
                    <span><AiFillLock/></span>
                    <input placeholder='Password' name='password' type="password" id='password'/>
                </div>
                <div className="form-control">
                    <input type="checkbox" name="remember" id="remember" />
                    <span>Remember me</span>
                </div>
                <button className='register-btn login-btn' type='submit'>login</button>
                <a onClick={()=>navigate(`/register`)} className='create-acc' href="#">Create an account</a>
                <div className="other-login" onClick={googleAuth}>
                   <AiFillGoogleCircle/>
                    <span id='signInDiv'>login withGoogle</span>
                </div>
            </form>
        </div>
    </section>
  )
}
