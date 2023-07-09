import axios from "axios";
import { useContext, useEffect } from "react";
import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  console.log('ctx');
  const url = "http://localhost:5001";
  // const url = "https://mathcode-admin.onrender.com";
  const [problems,setproblems] = useState([]);
  const [totalEasy,setTotalEasy] = useState(0);
  const [totalMedium,setTotalMedium] = useState(0);
  const [totalHard,setTotalHard] = useState(0);
  const [solvedQues, setsolvedQues] = useState([]);
  const [atmpQues, setAtmpQues] = useState([]);
  const [reload,setReload] = useState(false);
  var [topics, setTopics] = useState([]);
  
  
  // for getting attemp question //
  const getUser = async () => {
    const { data } = await axios.get(url + "/getSingleUser", {
      params: { username: localStorage.getItem("mathcode-username") },
    });
    setAtmpQues(data.data.attempted)
    setsolvedQues(data.data.solved)
  };

  // fetching all question //
  const fetch = async () => {
    try {
      const { data } = await axios.get(url + "/all");
      const array = [];
      data.map((item) => array.push(item.Ques.type));
      const uniqueArray = Array.from(new Set(array));
      setTopics(uniqueArray);
      setproblems(data)

      const easy = data.filter((item)=>item.Ques.difficulty=="easy");
      const medium = data.filter((item)=>item.Ques.difficulty=="medium");
      const hard = data.filter((item)=>item.Ques.difficulty=="hard");
      setTotalEasy(easy.length)
      setTotalMedium(medium.length)
      setTotalHard(hard.length)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
    if (localStorage.getItem("mathcode-username")) getUser();
  }, [reload]);

  return (
    <AppContext.Provider
      value={{
        url,
        topics,
        problems,
        totalEasy,
        totalMedium,
        totalHard,
        atmpQues,
        solvedQues,
        setReload,
        reload
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
