import React, { useState } from 'react'
import { useGlobalContext } from '../config/Context';
import { useNavigate } from 'react-router-dom';
import {AiFillGoogleCircle,AiFillLock} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa'
import {getAuth , GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {authProvider} from '../config/Auth'
import axios from 'axios';
import '../styles/landing-web/login.css'
import { Loader } from './main-web/Loader';
export const Login = () => {
    const [loading,setLoading] = useState(false)
    const {url} = useGlobalContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Data = new FormData(e.currentTarget);
        const userData = {
            email: Data.get('email'),
            password: Data.get('password'),
        };
        if(userData.email=='' || userData.password==''){alert('all inputs are required');return}
        const  headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'mode': 'no-cors',
        }
        setLoading(true);
        const {data} = await axios.post(url+'/login',userData,headers);
        console.log(data);
        setLoading(false);
        if(data.status==400){
            alert(data.msg);
            return;
        }
        setLoading(false);
        localStorage.setItem("mathcode-token",data.user.token)
        localStorage.setItem("mathcode-username",data.user.username)
        navigate('/problem-set/all')
    };
    
      const googleAuth = async () => {
            const login = await authProvider.login();
            console.log({login});
            if(login=='login') navigate('/problem-set/all')
      }

  return (
    <section className='signup-wrapper login-wrapper'>
        <div className="signup-card login-card">
            <h2>Login</h2>
            <form className='signup-form login-form' onSubmit={handleSubmit}>
                <div className="form-control">
                    <span><FaUser/></span>
                    <input placeholder='Email' name='email' type="text" id='Email'/>
                </div>
                <div className="form-control">
                    <span><AiFillLock/></span>
                    <input placeholder='Password' name='password' type="password" id='password'/>
                </div>
                <div className="form-control">
                    <input type="checkbox" name="remember" id="remember" />
                    <span>Remember me</span>
                </div>
                <button className='register-btn login-btn' disabled={loading} type='submit'>{loading?<>login <Loader/></>:'login'}</button>
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
