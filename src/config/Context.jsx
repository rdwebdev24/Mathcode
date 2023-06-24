import axios from "axios";
import { useContext, useEffect } from "react";
import React, { useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const url = "http://localhost:5001";
 
  const [problems,setproblems] = useState([]);
  let [topics, setTopics] = useState([]);
  const fetch = async () => {
    try {
      const { data } = await axios.get(url + "/all");
      const array = [];
      data.map((item) => array.push(item.Ques.type));
      const uniqueArray = Array.from(new Set(array));
      setTopics(uniqueArray);
      setproblems(data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <AppContext.Provider
      value={{
        url,
        topics,
        problems,
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
