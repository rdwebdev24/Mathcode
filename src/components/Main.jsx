import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Nav } from "./main-web/Nav";
import {BsSearch} from 'react-icons/bs'
import {FiCheckCircle} from 'react-icons/fi'
import '../styles/main-web/mainpage.css'
import { useGlobalContext } from "../config/Context";

export const Main = ({ setQuesId, problems, setproblems }) => {
  const navigate = useNavigate();
  const {url} = useGlobalContext();

  const handleNavigate = (id) => {
    setQuesId(id);
    navigate(`/question`);
  };

  const fetch = async () => {
    const { data } = await axios.get(url+'/all');
    setproblems(data);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <Nav />

      <div className="problem-tags-wrapper">

        <div className="tags-wrapper1">

          <div className="ques-level">
            <button>class 9th</button>
            <button>class 10th</button>
            <button>class 11th</button>
            <button>class 12th</button>
          </div>

        </div>

        <div className="tags-wrapper2">

          <div className="tag2 diff">
            <select>
              <option value="" disabled>difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          <div className="tag2 status">
            <select>
              <option value="" disabled>
                status
              </option>
              <option value="solved">solved</option>
              <option value="attempted">attempted</option>
            </select>
          </div>

          <div className="tag2 tags">
            <select>
              <option value="" disabled>
                topics
              </option>
              <option value="trigo">trigo</option>
              <option value="function">function</option>
              <option value="limit">limit</option>
              <option value="probability">probability</option>
            </select>
          </div>
            
            <div className="search-topic">
                <BsSearch/>
                <input id="search-inp" type="saerch" placeholder="Search"/>
            </div>

        </div>

        <div className="problem-wrapper">

            <h3>problems</h3>

            <div className="problem-cont" >
            <div className="problem-title">
                <span>status</span>
                <span>title</span>
                <span>difficulty</span>
            </div>
            {problems.map((item,index)=>{
                const {id,desc,difficulty} = item
                return (
                    <div className="problem-item" key={id} onClick={()=>handleNavigate(id)} >
                    <span style={{color:"#22c06f"}}><FiCheckCircle/></span>
                    <span>{desc}</span>
                    <span>{difficulty}</span>
                    <br/>
                    </div>
                )
            })}
            </div>

        </div>

      </div>

    </div>
  );
};
