import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {AiFillLock,AiOutlineUnlock} from 'react-icons/ai'
import {GrMail} from 'react-icons/gr'
import {FaUser} from 'react-icons/fa'
import '../../styles/landing-web/signup.css'
import { useGlobalContext } from '../../config/Context';
import { Loader } from '.././main-web/Loader';

export const Register = () => {
    const [loading,setLoading] = useState(false)
    const {url,reload,setReload} = useGlobalContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Data = new FormData(e.currentTarget);
        const userData = {
            username: Data.get('username'),
            email: Data.get('email'),
            password: Data.get('password'),
            confirmpassword: Data.get('confirmpassword'),
        };
        if(userData.username=='' || userData.email=='' || userData.password=='' || userData.confirmpassword==''){alert('all inputs are required');return}
        if(userData.password!=userData.confirmpassword) {
            alert("password did not match")
            return;
        }
        const  headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'mode': 'no-cors',
        }
        setLoading(true)
        const {data} = await axios.post(`${url}/register`,userData,headers);
        setLoading(false)
        console.log(data);
        if(data.status==400){alert(data.msg);setLoading(false);return};
        localStorage.setItem("mathcode-token",data.user.token)
        localStorage.setItem("mathcode-username",data.user.username)
        setReload(!reload)
        navigate('/problems/all')
      };
  return (
    <section className='signup-wrapper'>
        <div className="signup-card">
            <h2>Sign up</h2>
            <form className='signup-form' onSubmit={handleSubmit}>
                <div className="form-control">
                    <span><FaUser/></span>
                    <input placeholder='Username' name='username' type="text" id='username'/>
                </div>
                <div className="form-control">
                    <span><GrMail/></span>
                    <input placeholder='Your Email' name='email' type="email" id='email'/>
                </div>
                <div className="form-control">
                    <span><AiOutlineUnlock/></span>
                    <input placeholder='Password' name='password' type="password" id='password'/>
                </div>
                <div className="form-control">
                    <span><AiFillLock/></span>
                    <input placeholder='Confirm Password' name='confirmpassword' type="password" id='confirmpassword'/>
                </div>
                <button className='register-btn' type='submit' disabled={loading}>{loading?<>Register <Loader/></>:'Register'}</button>
                <a onClick={()=>navigate(`/login`)} className='already-member' href="#">I am already a member</a>
            </form>
        </div>
    </section>
  )
}
