import { useContext } from "react";
import React, { useState } from 'react'

const AppContext = React.createContext();

const AppProvider = ({children}) =>{
        const url = 'http://localhost:5001'

       return <AppContext.Provider value={{
            url,
       }}>
            {children}
       </AppContext.Provider>
  }
  
  const useGlobalContext = () =>{
       return useContext(AppContext)
  }
  
  export {AppContext,AppProvider, useGlobalContext}
  