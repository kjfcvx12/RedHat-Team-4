import React, { createContext, useContext, useState } from 'react';

const CafeContext=createContext();

const CafeContextPro = ({children}) => {

    const [like,setLike]=useState(0);
    const [hate,setHate]=useState(0);
    
    const [selected, setSelected]=useState(true);

    const [currentUser,setCurrentUser]=useState(
        JSON.parse(localStorage.getItem('currentUser'))||null,
    );

    const logout=()=>{
        setCurrentUser(null);

        localStorage.removeItem("currentUser");
    }
    
    return (
        <CafeContext value={{
            like,setLike,
            hate,setHate,
            selected, setSelected,
            currentUser,setCurrentUser,
            logout}}>
            {children}
        </CafeContext>
    );
};

export const useCafe=()=>useContext(CafeContext);

export default CafeContextPro;