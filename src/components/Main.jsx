import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export const Main = ({setQuesId,problems,setproblems}) => {
    const navigate = useNavigate();
    const url = 'http://localhost:5000/all'

    const handleNavigate = (id) => {
        setQuesId(id)
        navigate(`/question`);
    }

    const fetch = async () => {
        const {data} = await axios.get(url);
        setproblems(data)
    }

    useEffect(()=>{
        fetch();
    },[])
  return (
    <div>
        <div  className="ques-level">
            <button>class 9th</button>
            <button>class 10th</button>
            <button>class 11th</button>
            <button>class 12th</button>
        </div>
        <div className="diff">
            <select>
                <option value="easy">Easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
            </select>
        </div>
        <div className="tags">
            <select >
                <option value="trigo">trigo</option>
                <option value="function">function</option>
                <option value="limit">limit</option>
                <option value="probability">probability</option>
            </select>
        </div>
        <h3>problems</h3>
        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
        {problems.map((item,index)=>{
            const {id,desc,difficulty} = item
            return (
                <div key={id} onClick={()=>handleNavigate(id)} style={{display:"flex",gap:"2rem",cursor:"pointer"}}>
                   <span>{id}</span>
                   <span>{desc}</span>
                   <span>{difficulty}</span>
                   <br/>
                </div>
            )
        })}
        </div>
    </div>
  )
}
