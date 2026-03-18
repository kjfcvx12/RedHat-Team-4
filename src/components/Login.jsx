import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCafe } from './CafeContextPro';

const Login = () => {
    const {setCurrentUser}=useCafe();

    const [userId,setUserId]=useState('');
    const [pw,setPw]=useState('');
    const navigator=useNavigate();

    const onSubmit2=(e)=>{
        e.preventDefault();
        
        let users=JSON.parse(localStorage.getItem('users')) || [];

        const loginUser=users.find((i)=>i.userId===userId&&i.pw===pw);

        if(loginUser){
            setCurrentUser(loginUser);

            localStorage.setItem('currentUser',JSON.stringify(loginUser))

            setUserId('');
            setPw('');

            navigator('/list');
        }else{
            alert('아이디 또는 비밀번호 오류');
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit2}>
                <h1>로그인</h1>
                <p><input type='text' onChange={(e)=>setUserId(e.target.value)} value={userId} name='userId' placeholder='아이디'/></p>
                <p><input type='password' onChange={(e)=>setPw(e.target.value)} value={pw} name='password' placeholder='비밀번호'/></p>
                
                <button type='submit'>로그인</button>
            </form>
        </div>
    );
};

export default Login;