import React, { useEffect, useState } from "react";
import { AiFillHome,AiOutlinePoweroff } from "react-icons/ai";
import { FaGraduationCap, FaUserGraduate } from "react-icons/fa";
import { BsSunFill, BsFillBellFill, BsCheck2All, BsChevronDown, BsChevronUp, BsCheck2, BsDashLg } from "react-icons/bs";
import { BiLogOutCircle, BiSearch,BiLogInCircle } from "react-icons/bi";
import { GiTrophy } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useGlobalContext } from "../../config/Context";
import { useNavigate } from "react-router-dom";
import rohit from "../../assets/rohit.jpeg";
import axios from "axios";
import "../../styles/main-web/mainpage.css";


export const Main = () => {

  // For navigation between the pages 
  const navigate = useNavigate();
  // Getting all the required states from Context 
  const { url, topics, problems , atmpQues ,setReload,reload, solvedQues ,  totalEasy, totalMedium, totalHard } = useGlobalContext();
  
  const [filterQues, setFilterQues] = useState(problems);

  // states for showing the filters dropdown  
  const [showDiff, setShowDiff] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [showTopic, setShowTopic] = useState(false);

  // state for showing logout popup
  const [showlogout,setShowLogout] = useState(false)

  // states for e storing asy medium hard ques count done by user 
  const [userEasy,setUserEasy] = useState(0)
  const [userMedium,setUserMedium] = useState(0)
  const [userHard,setUserHard] = useState(0)

  // for staring the filters values
  const ffls = JSON.parse(localStorage.getItem("filters")); // ffls -> Filters from local storage ( an object ex : ffls =  {diff:"",class:"",topic:""})
  const [filters, setFilters] = useState({ diff:ffls?ffls.diff:"", class: ffls?ffls.class:"", topic: ffls?ffls.topic:[] });
  // getting the user from localStorage
  const user = localStorage.getItem("mathcode-username");

  // for displaying and hiding the left sidebar
  const showProfile = () => document.querySelector(".l-sidebar").classList.toggle("profile-toggle")

  // setting the difficulty values in the filter object
  const handleDiff = (e) => setFilters({ ...filters, diff: e.target.innerText });

  // setting the class values in the filter object
  const handleClass = (e) => {
    var str = e.target.innerText;
    var modifiedStr = str.replace(/class\s*/, "");
    setFilters({ ...filters, class: modifiedStr });
  };

  // setting the topic values in the filter object
  const handleTopic = (e) => {
    const exist = filters.topic.includes(e.target.innerText);
    const topics = filters.topic;
    if (!exist) setFilters({ ...filters, topic: [...topics, e.target.innerText] });
  };

  // filtering the todo questions
  const handleTodo = () => {
    const user = localStorage.getItem('mathcode-username');4
    if(!user){setFilterQues(problems);return;}
    const todoQues = problems.filter((item) => {
      return (!solvedQues.includes(item._id) && !atmpQues.includes(item._id))
    });
    setFilterQues(todoQues)
  }

  // filtering all questions
  const handleAll = () => {setFilterQues(problems)}

  // filtering Attempted questions
  const handleAttemped = () => {
    const user = localStorage.getItem('mathcode-username');4
    if(!user){setFilterQues([]);return;}
    var solved = [];
    problems.forEach((item)=>{
      atmpQues.includes(item._id)?solved.push(item):""
    })
    setFilterQues(solved)
  }

  // filtering solved questions
  const handleSolved = () => {
    const user = localStorage.getItem('mathcode-username');4
    if(!user){setFilterQues([]);return;}
    var solved = [];
    problems.forEach((item)=>{
      solvedQues.includes(item._id)?solved.push(item):""
    })
    setFilterQues(solved)
  }

  // sending the filter object to the backend for filter problems
  const filterReq = async () => {
    try {
      const { data } = await axios.post(url + "/problems", {filters,username: user ? user : "user",});
      setFilterQues(data.filterQues);
    } 
    catch (error) {console.log(error);}
  };

  
  
  useEffect(() => {

    // setting filter object to the localstorage ( in order to retain the set filters )
    localStorage.setItem("filters", JSON.stringify(filters));

    // calling for filter function when filter object changes
    filterReq();
    
    console.log("useEffect");
    var easy = 0;
    var medium = 0;
    var hard = 0;
    problems.forEach((item)=>{
      if(solvedQues.includes(item._id)){
        if(item.Ques.difficulty=="easy") easy++;
        if(item.Ques.difficulty=="medium") medium++;
        if(item.Ques.difficulty=="hard") hard++;

      }
    })
    setUserEasy(easy)
    setUserMedium(medium)
    setUserHard(hard)

    const logoutBtn = document.querySelector('.logout');
    const cancelBtn = document.querySelector('.cancel');
    const backgroundDiv = document.querySelector('.background');
  
    logoutBtn.addEventListener('mouseover',(e)=>{
      backgroundDiv.style.left = `${0}%`
    })
    
    cancelBtn.addEventListener('mouseover',()=>{
      backgroundDiv.style.left = `${50}%`
    })

    const navlist = document.querySelectorAll('.r-sdbr-icon');

    const dim = navlist[0].getBoundingClientRect();
    const overlay = document.querySelector('.overlay');
    overlay.style.width = dim.width+'px'
    overlay.style.height = dim.height+'px'
    overlay.style.top = dim.y+'px'

    navlist.forEach((item)=>{
      item.addEventListener('mouseover',(e)=>{
        overlay.style.top = item.getBoundingClientRect().y+'px'
        overlay.style.opacity = 1;
      })
      item.addEventListener('mouseout',(e)=>{
        overlay.style.opacity = 0;
      })
    })
    
    
    document.body.addEventListener('mousemove',(e)=>{
      const mx = e.clientX;
      const rSidebar = document.querySelector('.r-sidebar');
      if(rSidebar!=null){
        const wid = rSidebar.getBoundingClientRect().width;
        if(mx == 0) rSidebar.style.transform = 'translate(0)'
        if(mx>wid) rSidebar.style.transform = 'translate(-100%,0)'
      }
    })
      

  }, [filters,solvedQues]);
 

  return (
    <div className="main-wrapper">

      <div className="logout-popup">
        <p className="logout-txt">Are you sure you want to logout ? </p>
        <div className="logout-btn">
          <div className="logout" onClick={()=>{
            localStorage.removeItem("mathcode-token");
            localStorage.removeItem("mathcode-username");
            localStorage.removeItem("filters");
            navigate("/login")
            setReload(!reload)
          }}>logout <AiOutlinePoweroff/></div>
          <div className="cancel" onClick={()=>{
             document.querySelector('.logout-popup').classList.remove('show-logout')
          }}>cancel</div>
          <div className="background"></div>
        </div>
      </div>

      <div className="r-sidebar">
        <div className="overlay"></div>
          <div className="r-sidebar-logo"><h2 >π/2</h2></div>
        <div title="Home" onClick={()=>navigate('/')} className="r-sdbr-icon">
          <span> <AiFillHome /></span>
          <span> Home </span>
        </div>
        <div onClick={()=>{navigate('/underconstruction')}} title="learn" className="r-sdbr-icon">
          <span> <FaGraduationCap /></span>
          <span>learn</span>
        </div>
        <div title="dark mode" className="r-sdbr-icon">
         <span> <BsSunFill /> </span>
          <span>dark Mode</span>
        </div>
        <div title={`${user?"Logout":"sign up"}`}
          className="r-sdbr-icon"
          onClick={() => {
            user?document.querySelector('.logout-popup').classList.add('show-logout'):navigate("/register");
          }}
        >
         <span>{user?<BiLogOutCircle />:<BiLogInCircle/>}</span>
          <span>{user?"logout":"sign up"}</span>
        </div>
      </div>

      <div className="mid-wrapper">
        <div className="mid-top-cont">
          <div className="mid-top-left">
            <div className="nav">
              <div className="logo">
                <h1>π/2</h1>
              </div>
              <ul>
                <li onClick={()=>{navigate('/underconstruction')}}>test</li>
                <li onClick={()=>{navigate('/underconstruction')}}>courses</li>
                <li className="notify">
                  <BsFillBellFill />
                </li>
              </ul>
            </div>
            <div className="hello-wrp">
              <h1>Hii...</h1>
              <h2>Welcome {user?user:"user"}</h2>
            </div>
          </div>
          <div className="mid-top-right">
            <div className="streak">
              <p>Streak</p>
              <h1>69</h1>
            </div>
            <div className="credit">
              <p>Credit</p>
              <h1>696</h1>
            </div>
          </div>
        </div>

        <div className="tags-wrp">
          <div
            className="diff"
            onClick={() => {
              document.querySelector(".diff-ls").classList.toggle("active");
              document.querySelector(".class-ls").classList.remove("active");
              document.querySelector(".topic-ls").classList.remove("active");
              setShowDiff(!showDiff);
              if (showClass || showTopic) {
                setShowClass(false);
                setShowTopic(false);
              }
            }}
          >
            <span>difficulty</span>{" "}
            {showDiff ? <BsChevronUp /> : <BsChevronDown />}
            <div className="diff-ls" onClick={(e) => e.stopPropagation()}>
              <div onClick={handleDiff} className="ls">
                easy
              </div>
              <div onClick={handleDiff} className="ls">
                medium
              </div>
              <div onClick={handleDiff} className="ls">
                hard
              </div>
            </div>
          </div>
          <div
            className="class"
            onClick={() => {
              document.querySelector(".diff-ls").classList.remove("active");
              document.querySelector(".class-ls").classList.toggle("active");
              document.querySelector(".topic-ls").classList.remove("active");
              setShowClass(!showClass);
              if (showDiff || showTopic) {
                setShowDiff(false);
                setShowTopic(false);
              }
            }}
          >
            <span>class</span>
            {showClass ? <BsChevronUp /> : <BsChevronDown />}
            <div className="class-ls" onClick={(e) => e.stopPropagation()}>
              <div onClick={handleClass} className="ls">
                class 9th
              </div>
              <div onClick={handleClass} className="ls">
                class 10th
              </div>
              <div onClick={handleClass} className="ls">
                class 11th
              </div>
              <div onClick={handleClass} className="ls">
                class 12th
              </div>
            </div>
          </div>
          <div
            className="topic"
            onClick={() => {
              document.querySelector(".diff-ls").classList.remove("active");
              document.querySelector(".class-ls").classList.remove("active");
              document.querySelector(".topic-ls").classList.toggle("active");
              setShowTopic(!showTopic);
              if (showClass || showDiff) {
                setShowClass(false);
                setShowDiff(false);
              }
            }}
          >
            <span>topics</span>
            {showTopic ? <BsChevronUp /> : <BsChevronDown />}
            <div className="topic-ls" onClick={(e) => e.stopPropagation()}>
              {topics.length == 0
                ? "laoding..."
                : topics.map((item) => (
                    <div onClick={handleTopic} key={item} className="ls">
                      {item}
                    </div>
                  ))}
            </div>
          </div>
          <div className="search">
            {" "}
            <BiSearch />{" "}
            <input type="search" placeholder="Search topics here" />
          </div>
        </div>

        <div className="filter-tags">
          {filters.diff != "" ? (
            <span className="tags">
              {filters.diff}{" "}
              <span onClick={() => setFilters({ ...filters, diff: "" })}>
                {" "}
                <RxCross2 />{" "}
              </span>
            </span>
          ) : (
            ""
          )}
          {filters.class != "" ? (
            <span className="tags">
              {filters.class}{" "}
              <span onClick={() => setFilters({ ...filters, class: "" })}>
                {" "}
                <RxCross2 />{" "}
              </span>
            </span>
          ) : (
            ""
          )}
          {filters.topic.length != 0
            ? filters.topic.map((item) => (
                <span className="tags" key={item}>
                  {item}{" "}
                  <span
                    onClick={() => {
                      const topics = filters.topic.filter(
                        (item2) => item != item2
                      );
                      setFilters({ ...filters, topic: topics });
                    }}
                  >
                    <RxCross2 />
                  </span>
                </span>
              ))
            : ""}
        </div>

        <div className="todo-atmp-slvd-wrp">
          <div onClick={handleAll} className="todo">
            <span>All</span>
          </div>
          <div onClick={handleTodo} className="todo">
            <span>Todo</span>
          </div>
          <div onClick={handleAttemped} className="attmp">
            <span>Attempted</span>
          </div>
          <div onClick={handleSolved} className="slvd">
            <span>Solved</span>
          </div>
        </div>

        <div className="prblm-wrapper">
          {/* STATUS   qUESTION    DIFFICULTY  SUBMISSIONS   DIFFICULTY  LIKES */}
          <div className="prblm-info">
            <div className="status">status</div>
            <div className="title">Question</div>
            <div className="submission">Submissions</div>
            <div className="difficulty">difficulty</div>
            <div className="likes">likes</div>
          </div>
          {/* MAPPING OUT THE PROBLEMS INTO A DIV PRBLM-CARD */}
          {filterQues.length == 0 ? (
            ""
          ) : (
            filterQues.map((item) => {
              const { desc, difficulty, likes, dislikes, submissions } =
                item.Ques;
              const id = item._id;
              return (
                <div
                  style={{
                    borderLeft: `${
                      solvedQues.some((ques)=>ques==id)
                        ? "3px solid #22c06f"
                        : "3px solid grey"
                    }`,
                  }}
                  key={item._id}
                  className="prblm-card"
                  onClick={() => {
                    localStorage.setItem("mathcode-quesId", item._id);
                    navigate("/question");
                  }}
                >
                  <div
                    style={{
                      color: `${ solvedQues.some((ques)=>ques==id) ? "#22c06f" : "grey"}`,
                    }}
                    className="status"
                  >
                    {solvedQues.some((ques)=>ques==id)?<BsCheck2All /> :""}
                    {atmpQues.some((ques)=>ques==id)?<BsCheck2 /> : ""}
                    
                  </div>
                  <div className="title">{desc.slice(0, 30)}...</div>
                  <div className="submission">{submissions}</div>
                  <div className="difficulty">{difficulty}</div>
                  <div className="likes">{likes}</div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="l-sidebar profile-wrapper">
        <div className="user-img-name">
          <img src={rohit} alt="user image" />
          <p>{user ? user : "user"}</p>
        </div>
        <div className="ttl-acry-wrp">
          <div className="ttl">
            <h2>Total solved</h2>
            <h1>{userEasy+userHard+userMedium}</h1>
          </div>
          <div className="acry">
            <h2>Your Accuracy</h2>
            <h1>69%</h1>
          </div>
        </div>
        <div className="esy-mdm-hrd">
          <div className="emh">
            <div className="emh-dtl">
              <span>easy</span>
              <span>{userEasy}/{totalEasy}</span>
            </div>
            <div className="emh-pgrs">
              <div style={{width:`${userEasy*100/totalEasy}%`}} className="pgrs"></div>
            </div>
          </div>
          <div className="emh">
            <div className="emh-dtl">
              <span>medium</span>
              <span>{userMedium}/{totalMedium}</span>
            </div>
            <div className="emh-pgrs">
              <div style={{width:`${userMedium*100/totalMedium}%`}} className="pgrs"></div>
            </div>
          </div>
          <div className="emh">
            <div className="emh-dtl">
              <span>hard</span>
              <span>{userHard}/{totalHard}</span>
            </div>
            <div className="emh-pgrs">
              <div style={{width:`${userHard*100/totalHard}%`}} className="pgrs"></div>
            </div>
          </div>
        </div>
        <div className="tst-ntfy-wrp">
          <div>
            {" "}
            <GiTrophy /> <span>upcoming test for class 9th</span>{" "}
          </div>
          <div>
            {" "}
            <GiTrophy /> <span>upcoming test for class 11th</span>{" "}
          </div>
          <div>
            {" "}
            <GiTrophy /> <span>upcoming test for class 10th</span>{" "}
          </div>
          <div>
            {" "}
            <GiTrophy /> <span>upcoming test for class 10th</span>{" "}
          </div>
          <div>
            {" "}
            <GiTrophy /> <span>upcoming test for class 10th</span>{" "}
          </div>
          <div>
            {" "}
            <GiTrophy /> <span>upcoming test for class 10th</span>{" "}
          </div>
          <div>
            {" "}
            <GiTrophy /> <span>upcoming test for class 10th</span>{" "}
          </div>
          <div>
            {" "}
            <GiTrophy /> <span>upcoming test for class 10th</span>{" "}
          </div>
        </div>
      </div>

      {/* position absolute profile btn when screen size <= 1024px */}
      <div onClick={showProfile} className="profile-icon-div">
        <span>Rohit</span>
        <FaUserGraduate />
      </div>
    </div>
  );
};
