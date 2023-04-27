import React from "react";
import { createContext, useState } from "react";

export const StateContext = createContext({});

export const StateContextProvider = ({children})=>{
    const[status, setStatus]=useState({state:false, user:{}})
    return(
    <StateContext.Provider value={{status, setStatus}}>
     {children}
     </StateContext.Provider>
     )
}