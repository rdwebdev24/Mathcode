import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../config/Context";
import { AiOutlineLike, AiFillStar,AiOutlineDislike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { Nav } from "./Nav";
import axios from "axios";
import '../../styles/main-web/QuesPage.css'
import { useNavigate } from "react-router-dom";

export const Questionpage = () => {
  const navigate = useNavigate();
  const { url, problems ,setReload,reload} = useGlobalContext();
  const [corrans, setCorrAns] = useState("");
  const [isSelected,setIsSelected] = useState('')
  const [quesId,setQuesId] = useState(localStorage.getItem('mathcode-quesId'))
  const [singleQues, setSingleQues] = useState({
    desc: "ggdfgdf",
    options: [],
    corrAns: "",
    level: "",
    type: "",
    difficulty: "",
  });

  const optHandler = (e) => {
    const optionSpans = document.querySelectorAll('.opt')
    for (let i = 0; i < optionSpans.length; i++) {optionSpans[i].classList.remove('selected')}
    e.currentTarget.classList.add('selected');
    setCorrAns(e.target.innerText)
  }

  const submitHabdler = async (e) => {
    if(corrans==''){alert("please select an option");return}
    const user = localStorage.getItem('mathcode-username');
    if(!user){
      console.log('aaa');
      document.querySelector('.signup-popup').classList.add('show-signup')
      return;
    }
    e.preventDefault();
    const optionSpans = document.querySelectorAll('.opt')
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      mode: "no-cors",
    };
    const usrData = {
      username: localStorage.getItem("mathcode-username"),
      quesId,
    };
    if (singleQues.options[singleQues.corrAns] == corrans) {
      usrData.status = "solved"
      optionSpans[singleQues.corrAns].classList.add('correct')
      const isLogin = localStorage.getItem("mathcode-username");
      if (isLogin) {
        const { data } = await axios.post(url + "/userques", usrData, headers);
      }
    }
    else{
      usrData.status = "attempt"
      const { data } = await axios.post(url + "/userques", usrData, headers);
      const optionSpans = document.querySelectorAll('.opt');
      const idx = singleQues.options.indexOf(corrans)
      optionSpans[idx].classList.add('incorrect');
    }
    setReload(!reload)
  };
  useEffect(() => {
    if(problems.length!=0) {
      const {Ques} = problems.filter((item) => item._id == quesId)[0];
      Ques.options = Ques.options.map(item=>item.trim());
      setSingleQues(Ques);
    }
  },[problems]);

  return (
    <>
      <Nav />
    <div className="quespage-wrapper">

    <div className="signup-popup">
      <div onClick={()=>{
        document.querySelector('.signup-popup').classList.remove('show-signup');
      }} className="sgnup-cross"> <RxCross2/> </div>
      <div className="signup-info">
        <h4>Not a π/2 User ?</h4>
        <p>Please signup first to submit question</p>
      </div>
      <div className="signup-btn" onClick={()=>{
        document.querySelector('.signup-popup').remove('show-signup');
        navigate('/register');
      }}>signup</div>
    </div>

      {problems.length==0?"":
      <div className='quespage-card'>
        <h4 className="ques-type">{singleQues.type}</h4>
            <div className="tags-section">
                <span className={`${singleQues.difficulty} q-diff`}>{singleQues.difficulty}</span>
                <span className="q-like">{singleQues.likes} <AiOutlineLike/></span>
                <span className="q-dislike">{singleQues.dislikes}<BiDislike/></span>
                <span className="q-star"><AiFillStar/></span>
            </div>
            <p className="ques-desc">{singleQues.desc}</p>
              <div className="ques-opt" >
                  <div className="optcnt1">
                    <span value={0} onClick={optHandler} className="opt">{singleQues.options[0]}</span>
                    <span value={1} onClick={optHandler} className="opt">{singleQues.options[1]}</span>
                  </div>
                  <div className="optcnt2">
                    <span value={2} onClick={optHandler} className="opt">{singleQues.options[2]}</span>
                    <span value={3} onClick={optHandler} className="opt">{singleQues.options[3]}</span>
                  </div>
              </div>
            <button className="q-submit" onClick={submitHabdler} type='submit'>submit</button>
        </div>}
    </div>
    </>
  );
};
