import React, { createContext, useContext, useState } from 'react';

const CafeContext=createContext();

const CafeContextPro = ({children}) => {
    
    const [user,setUser]=useState('');
    const [pw,setPw]=useState('');
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [like,setLike]=useState(0);
    const [hate,setHate]=useState(0);

    const [currentUser,setCurrentUser]=useState(
        JSON.parse(localStorage.getItem('currentUser'))||null,
    );

    const logout=()=>{
        setCurrentUser(null);

        localStorage.removeItem("currentUser");
    }
    
    return (
        <CafeContext value={{
            user,setUser,
            pw,setPw,
            title,setTitle,
            content,setContent,
            like,setLike,
            hate,setHate,
            currentUser,setCurrentUser,
            logout}}>
            {children}
        </CafeContext>
    );
};

export const useCafe=()=>useContext(CafeContext);

export default CafeContextPro;