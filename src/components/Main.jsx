import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Nav } from "./main-web/Nav";
import { BsSearch } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import "../styles/main-web/mainpage.css";
import { useGlobalContext } from "../config/Context";

export const Main = ({ setQuesId, problems, setproblems }) => {
  const [filters, setFilters] = useState({
    classLevel: "",
    difficulty: "",
    topic: "",
  });

  const navigate = useNavigate();
  const { url } = useGlobalContext();
  let [topics, setTopics] = useState([]);
  let [filterarray, setFilterArray] = useState([]);
  

  const handleNavigate = (id) => {
    setQuesId(id);
    navigate(`/question`);
  };

  const fetch = async () => {
    const { data } = await axios.get(url + "/all");
    const array = [];
    data.map((item) => {
      array.push(item.Ques.type);
    });
    const uniqueArray = Array.from(new Set(array));
    setTopics(uniqueArray);
    // console.log(data," aaa");
    setproblems(data);
    setFilterArray(data)
  };

  useEffect(() => {
    fetch();
    console.log('ppp');
  }, []);

  const handleTopicChange = (event) => {
    setFilters({ ...filters, topic: event.target.value });
    console.log(filters);
    let newArray = []
    if(event.target.value!='') newArray = problems.filter((item)=>{return item.Ques.type == filters.topic});
    
    setFilterArray(newArray)
    console.log(filterarray,'yifif');
    console.log(newArray,'jjjjj');
    
  };
  const handleClassLevelChange = (event) => {
    setFilters({ ...filters, classLevel: event.target.innerText });
    console.log(filters);
  };
  const handleDifficultyChange = (event) => {
    setFilters({ ...filters, difficulty: event.target.value });
    console.log(filters);
  };
  return (
    <div>
      <Nav />

      <div className="problem-tags-wrapper">
        <div className="tags-wrapper1">
          <div className="ques-level" onClick={handleClassLevelChange}>
            <button>class 9th</button>
            <button>class 10th</button>
            <button>class 11th</button>
            <button>class 12th</button>
          </div>
        </div>

        <div className="tags-wrapper2">
          <div className="tag2 diff">
            <select onClick={handleDifficultyChange}>
              <option value="" disabled>
                difficulty
              </option>
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
            <select onClick={handleTopicChange}>
              <option value="" disabled>
                topics
              </option>
              {topics.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="search-topic">
            <BsSearch />
            <input id="search-inp" type="saerch" placeholder="Search" />
          </div>
        </div>

        <div className="problem-wrapper">
          <h3>problems</h3>

          <div className="problem-cont">
            <div className="problem-title">
              <span className="status">status</span>
              <span className="title">title</span>
              <span className="difficulty">difficulty</span>
            </div>
            {filterarray.map((item, index) => {
              const { desc, difficulty } = item.Ques;
              const id = item._id;
              return (
                <div
                  className="problem-item"
                  key={id}
                  onClick={() => handleNavigate(index)}
                >
                  <span className="status" style={{ color: "#22c06f" }}>
                    <FiCheckCircle />
                  </span>
                  <span className="title">{String(desc).slice(0, 30)}...</span>
                  <span className="difficulty">{difficulty}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
