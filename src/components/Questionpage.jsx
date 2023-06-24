import React, { useState } from 'react'
import axios from  'axios';
import { useGlobalContext } from '../config/Context';

export const Questionpage = ({quesId}) => {
    const {url , problems} = useGlobalContext();
    console.log({quesId});
    const {Ques}  = problems.filter(item=>item._id==quesId)[0]
    const {desc,options,difficulty,type,level}  = Ques
    const [corrans,setCorrAns] = useState('');

    const changeHandler = (e) => {
        setCorrAns(e.target.value)
    }
    const submitHabdler = async (e) => {
        e.preventDefault();
        if(options[Ques.corrAns]==corrans) {
            alert('correct');
            const isLogin = localStorage.getItem('mathcode-username');
            if(isLogin){
                const  headers = {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'application/json',
                    'mode':'no-cors'
                }
                const usrData = {username:localStorage.getItem('mathcode-username'),quesId}
                const {data} = await axios.post(url+'/userques',usrData,headers)
                console.log(data);
            }

        }
        else alert('incorrect')
    }
  return (
    <div>
        <h4>{desc}</h4> 
        {options.map((item)=>{
            return (
                <div onChange={changeHandler} key={item}>
                    <input type="radio" name='opt' value={item}/>
                    <span>{item}</span>
                    <br/>
                </div>
            )
        })}
        <button onClick={submitHabdler} type='submit'>submit</button>
        <br/>
        <span>difficulty : {difficulty}</span>
        <span> type : {type}</span>
    </div>
  )
}
