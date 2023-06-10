import React from 'react'
import { useNavigate } from 'react-router-dom';
import {AiFillGoogleCircle,AiFillLock} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa'
import axios from 'axios';
import '../styles/login.css'
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
export const Login = () => {

    const url = 'http://localhost:5000/login';
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
        const {data} = await axios.post(url,userData,headers);
        if(data.status==400){
            alert(data.msg);
            return;
        }
        localStorage.setItem("username",data.user.username)
        navigate('/problem-set/all')
    };

    async function handleCallbackResponse(response) {
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        const email = userObject.email;
        const {data} = await axios.post('http://localhost:5000/userlogin',  {email} )
        if(data.status == 200){
            localStorage.setItem("username",data.user_[0].username)
            navigate("/problem-set/all")
        }
        console.log(data," data");
      
      }
      useEffect(() => {
    
        /* global google */  
    
        google.accounts.id.initialize({
         client_id: "289351533564-jlscrklfq9ppjjk4kt5gdvjufl8guml3.apps.googleusercontent.com",
         callback: handleCallbackResponse
        })
    
        google.accounts.id.renderButton(
         document.getElementById("signInDiv"),
          { theme: "outline", size: "large" }
        );
    
        return () => {
        }
      }, [])

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
                <div className="other-login">
                   <AiFillGoogleCircle/>
                    <span id='signInDiv'>login withGoogle</span>
                </div>
            </form>
        </div>
    </section>
  )
}
