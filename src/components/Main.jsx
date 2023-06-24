import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Nav } from "./main-web/Nav";
import { BsSearch } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import "../styles/main-web/mainpage.css";
import { useGlobalContext } from "../config/Context";

export const Main = ({ setQuesId }) => {
  const navigate = useNavigate();
  const { url, topics, problems } = useGlobalContext();
  let [filterarray, setFilterArray] = useState(problems);
  const [atmpQues,setAtmpQues] = useState([]);
  const [filters, setFilters] = useState({diff:JSON.parse(localStorage.getItem('filters'))?JSON.parse(localStorage.getItem('filters')).diff:'',
  topic:JSON.parse(localStorage.getItem('filters'))?JSON.parse(localStorage.getItem('filters')).topic:[],
  solved:JSON.parse(localStorage.getItem('filters'))?JSON.parse(localStorage.getItem('filters')).solved:"",
  level:''});
console.log(filters);
  const handleNavigate = (id) => {
    setQuesId(id);
    navigate(`/question`);
  };

  const handleTopicChange = (e) => {
    const exist = filters.topic.includes(e.target.value);
    const topics = filters.topic;
    if (!exist) setFilters({ ...filters, topic: [...topics, e.target.value] });
  };
console.log({filterarray,problems});
  const filterReq = async () => {
    try {
      const { data } = await axios.post(url + "/problem-set", {filters,username:localStorage.getItem('mathcode-username')});
      setFilterArray(data.filterQues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    const getUser = async () => {
      const {data} = await axios.get(url+'/user',{ params: {username:localStorage.getItem('mathcode-username')} })
      setAtmpQues(data.questions)
    }
    if(localStorage.getItem('mathcode-username')) getUser();
  },[])

  useEffect(() => {
    filterReq()
    localStorage.setItem('filters',JSON.stringify(filters))
  }, [filters]);

  return (
    <div>
      <Nav />

      <div className="problem-tags-wrapper">
        <div className="tags-wrapper1">
          <div className="ques-level" >
            <button>class 9th</button>
            <button>class 10th</button>
            <button>class 11th</button>
            <button>class 12th</button>
          </div>
        </div>

        <div className="tags-wrapper2">
          <div className="tag2 diff">
            <select
              onChange={(e) => {
                setFilters({ ...filters, diff: e.target.value });
              }}
            >
              <option value="" disabled selected>
                difficulty
              </option>
              <option value="easy">Easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          <div className="tag2 status">
            <select
              onChange={(e) =>
                setFilters({ ...filters, solved: e.target.value })
              }
            >
              <option value="" disabled selected>
                status
              </option>
              <option value="solved">solved</option>
              <option value="attempted">attempted</option>
            </select>
          </div>

          <div className="tag2 tags">
            <select onChange={handleTopicChange}>
              <option value="" disabled selected>
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

        <div className="filters-div">
          {filters.diff ? (
            <p className="tags">
              {filters.diff}
              <span onClick={() => setFilters({ ...filters, diff: "" })}>
                
                <RxCross1 />
              </span>
            </p>
          ) : (
            ""
          )}
          {filters.solved ? (
            <p className="tags">
              {filters.solved}
              <span onClick={() => setFilters({ ...filters, solved: "" })}>
               
                <RxCross1 />
              </span>
            </p>
          ) : (
            ""
          )}
          {filters.topic.map((item, index) => {
            return (
              <p key={item} className="tags">
                {item}
                <span
                  onClick={() => {
                    const topics = filters.topic.filter(
                      (item2) => item != item2
                    );
                    setFilters({ ...filters, topic: topics });
                  }}
                >
                 
                  <RxCross1 />
                </span>
              </p>
            );
          })}
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
              // const a = atmpQues.includes(id);
              // console.log({a});
              return (
                <div
                  className="problem-item"
                  key={id}
                  onClick={() => handleNavigate(id)}
                >
                  <span className="status" >
                    <FiCheckCircle style={{color:`${atmpQues.includes(id)?'#22c06f':'grey'}`}}/>
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
