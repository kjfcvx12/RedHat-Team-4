import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {

    const [userId,setUserId]=useState('');
    const [pw,setPw]=useState('');
    const [email,setEmail]=useState('');
    const navigator=useNavigate();

    const onJoin=(e)=>{
        e.preventDefault();

        const user={userId, pw, email};

        if (userId.length<5){
            alert('5자 이상 입력하세요');
            return;
        }
        
        if (pw.length<8){
            alert('8자 이상 입력하세요');
            return;
        }

        let users=JSON.parse(localStorage.getItem("users")) || [];
        
        //아이디 중복 체크
        if (users.some((e)=> e.userId === userId)){
            alert('중복된 아이디입니다. 다시 입력하세요.')
            return;
        }
        
        users.push(user);

        localStorage.setItem("users",JSON.stringify(users))

        setUserId("");
        setPw("");
        setEmail("");

        navigator('/login')
    }


    return (
        <div>
            <form onSubmit={onJoin}>
                <h1>회원 가입</h1>
                ID : <input type='text' value={userId} onChange={(e)=>setUserId(e.target.value)} placeholder='아이디 5자 이상 입력' /><br></br>
                PW : <input type='password' value={pw} onChange={(e)=>setPw(e.target.value)} placeholder='비밀번호 8자 이상 입력' /><br></br>
                e-mail : <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='@포함 입력' /><br></br>

                <button>가입</button>
            </form>
            
        </div>
    );
};

export default Join;