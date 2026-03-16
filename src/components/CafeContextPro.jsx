import React, { createContext, useContext, useState } from 'react';

const CafeContext=createContext();

const CafeContextPro = ({children}) => {

    const [currentUser,setCurrentUser]=useState(
        JSON.parse(localStorage.getItem("currentUser"))||null,
    );

    const logout=()=>{

        setCurrentUser(null);

        localStorage.removeItem("currentUser");
    }

    return (
        <CafeContext.Provider value={{currentUser,setCurrentUser,logout}}>
            {children}
        </CafeContext.Provider>
    );
};

export const useCafe=()=>useContext(CafeContext);

export default CafeContextPro;