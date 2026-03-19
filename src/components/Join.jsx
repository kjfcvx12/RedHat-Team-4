import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {

    const [userId,setUserId]=useState('');
    const [pw,setPw]=useState('');
    const [email,setEmail]=useState(null);
    const navigator=useNavigate();

    const onJoin=(e)=>{
        e.preventDefault();

        const user={userId, pw, email};

        if (userId.length<5){
            alert('아이디를 5자 이상 입력하세요!');
            return;
        }
        
        if (pw.length<8){
            alert('비밀번호를 8자 이상 입력하세요!');
            return;
        }

        if (email===null){
            alert('이메일 입력해주세요!!!')
            return;
            
        }

        let users=JSON.parse(localStorage.getItem("users")) || [];
        
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form 
                onSubmit={onJoin}
                className="w-96 bg-white p-10 rounded-2xl shadow-lg"
            >
                <h1 className="text-2xl font-bold text-green-500 text-center mb-8">
                    회원가입
                </h1>

                <input
                    type='text'
                    value={userId}
                    onChange={(e)=>setUserId(e.target.value)}
                    placeholder='아이디 5자 이상 입력'
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />

                <input
                    type='password'
                    value={pw}
                    onChange={(e)=>setPw(e.target.value)}
                    placeholder='비밀번호 8자 이상 입력'
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />

                <input
                    type='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='이메일 @ 포함 입력'
                    className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                />

                <button
                    className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-sky-400 transition"
                >
                    가입
                </button>
            </form>
        </div>
    );
};

export default Join;