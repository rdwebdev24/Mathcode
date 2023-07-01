import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Nav } from "./main-web/Nav";
import { BsSearch } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { BsFillBarChartFill, BsCheck2Circle } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { BiLike } from "react-icons/bi";
import { BsCheck2All } from "react-icons/bs";
import "../styles/main-web/mainpage.css";
import { useGlobalContext } from "../config/Context";
import rohit from "../assets/rohit.jpeg";
export const Main = ({ setQuesId }) => {
  console.log("main");
  const navigate = useNavigate();
  const { url, topics, problems } = useGlobalContext();
  const [username, setUsername] = useState(
    localStorage.getItem("mathcode-username")
  );
  const [upcmTest , setUpcmTest] = useState([
    "upcoming test for class 9th",
    "upcoming test for class 11th",
    "upcoming jee mains mock test",
  ])
  let [filterarray, setFilterArray] = useState(problems);
  const [atmpQues, setAtmpQues] = useState([]);
  const [filters, setFilters] = useState({
    diff: JSON.parse(localStorage.getItem("filters"))
      ? JSON.parse(localStorage.getItem("filters")).diff
      : "",
    topic: JSON.parse(localStorage.getItem("filters"))
      ? JSON.parse(localStorage.getItem("filters")).topic
      : [],
    solved: JSON.parse(localStorage.getItem("filters"))
      ? JSON.parse(localStorage.getItem("filters")).solved
      : "",
    level: "",
  });

  const handleNavigate = (id) => {
    setQuesId(id);
    localStorage.setItem("mathcode-quesId", id);
    navigate(`/question`);
  };

  const handleTopicChange = (e) => {
    const exist = filters.topic.includes(e.target.value);
    const topics = filters.topic;
    if (!exist) setFilters({ ...filters, topic: [...topics, e.target.value] });
  };
  console.log({ filterarray, problems });
  const filterReq = async () => {
    try {
      const { data } = await axios.post(url + "/problem-set", {
        filters,
        username: localStorage.getItem("mathcode-username"),
      });
      setFilterArray(data.filterQues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(url + "/user", {
        params: { username: localStorage.getItem("mathcode-username") },
      });
      setAtmpQues(data.questions);
    };
    if (localStorage.getItem("mathcode-username")) getUser();
  }, []);

  useEffect(() => {
    filterReq();
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);
  return (
    <div>
      <Nav />
      <div className="main-wrp">
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
                <span className="title">Questions</span>
                <span className="difficulty">difficulty</span>
                <span className="likes">Likes</span>
              </div>
              {filterarray.map((item, index) => {
                const { desc, difficulty } = item.Ques;
                const id = item._id;
                // const a = atmpQues.includes(id);
                // console.log({a});
                return (
                  <div
                    style={{
                      borderLeft: `${
                        atmpQues.includes(id)
                          ? "3px solid #22c06f"
                          : "3px solid grey"
                      }`,
                    }}
                    className="problem-item"
                    key={id}
                    onClick={() => handleNavigate(id)}
                  >
                    <span
                      style={{
                        color: `${atmpQues.includes(id) ? "#22c06f" : "grey"}`,
                      }}
                      className="status"
                    >
                      <BsCheck2All />
                    </span>
                    <span className="title">
                      {String(desc).slice(0, 30)}...
                    </span>
                    <span className="difficulty">
                      <div className={`diff-circle ${difficulty}`}></div>
                    </span>
                    <span className="likes">
                      1.2k <BiLike />{" "}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="main-aside">
          <div className="pfl-wrp">
            <div className="pfl1">
              <div className="div1"></div>
              <div className="div2"></div>
              <div className="div3">
                <img src={rohit} alt="rohit" />
                <p>{username}</p>
              </div>
            </div>
            <div className="pfl2">
              <div className="pfl-ttl-prbl">
                <span>Total problem solved 126</span>
                <div className="ttl-icon">
                  <BsFillBarChartFill />
                </div>
              </div>
              <div className="pfl-acry">
                <span>Accuracy 86%</span>
                <div className="acry-icon">
                  <BsCheck2Circle />
                </div>
              </div>
            </div>
            <div className="pfl3">
              <div className="pfl-diff">
                <div className="pfl-diff-info">
                  <span>Easy</span>
                  <span>150/1200</span>
                </div>
                <div className="pfl-diff-pgrs">
                  <div className="pgs-wid pgs-esy-wid"></div>
                </div>
              </div>
              <div className="pfl-diff">
                <div className="pfl-diff-info">
                  <span>Medium</span>
                  <span>150/1200</span>
                </div>
                <div className="pfl-diff-pgrs">
                  <div className="pgs-wid pgs-mdm-wid"></div>
                </div>
              </div>
              <div className="pfl-diff">
                <div className="pfl-diff-info">
                  <span>Hard</span>
                  <span>150/1200</span>
                </div>
                <div className="pfl-diff-pgrs">
                  <div className="pgs-wid pgs-hrd-wid"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="test-wrp">
              {upcmTest.map((item)=>{
                return (
                  <div className="tst-info">
                    <FaTrophy/>
                    <span>{item}</span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
