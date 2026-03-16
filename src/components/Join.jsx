import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {

    const [userId,setUserId]=useState('');
    const [password,setPassword]=useState('');
    const navigator=useNavigate();
    
    const onSubmit1=(e)=>{
        e.preventDefault();

        const user={userId,password}; 
        let users=JSON.parse(localStorage.getItem('users')) || [];
        users.push(user); 
        localStorage.setItem('users',JSON.stringify(users))
      
        setUserId('');
        setPassword('');

        navigator('/login')
    }

    

    return (
        <div>
            <form onSubmit={onSubmit1}>
                <h1>회원가입</h1>
                <p><input type='text' onChange={(e)=>setUserId(e.target.value)} value={userId} name='userId' placeholder='아이디'/></p>
                <p><input type='password' onChange={(e)=>setPassword(e.target.value)} value={password} name='password' placeholder='비밀번호'/></p>
                <button type='submit'>회원가입</button>
            </form>
        </div>
    );
};

export default Join;