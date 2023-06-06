import React, { useState } from 'react'
import axios from  'axios';

export const Questionpage = ({quesId,problems}) => {
    const {desc,opt,difficulty,type} = problems[quesId-1]
    const [corrans,setCorrAns] = useState('');
    const url = 'http://localhost:5000/addques';
    console.log(problems[quesId-1]);

    const changeHandler = (e) => {
        console.log(e.target.value);
        setCorrAns(e.target.value)
    }
    const submitHabdler = async (e) => {
        e.preventDefault();
        console.log('aaa');
        console.log(corrans);
        if(problems[quesId-1].corrAns==corrans) {
            alert('correct');
            const  headers = {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
            }
            const usrData = {username:localStorage.getItem('username'),quesId:quesId}
            const {data} = await axios.post(url,usrData,headers)
            console.log(data);

        }
        else alert('incorrect')
    }
  return (
    <div>
        <h4>{desc}</h4> 
        {opt.map((item)=>{
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
