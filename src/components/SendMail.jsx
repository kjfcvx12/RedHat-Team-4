import React, { useState } from 'react';
import { useCafe } from './CafeContextPro';
import { useNavigate } from 'react-router-dom';

const SendMail = () => {
    const {currentUser}=useCafe();

    const [mUser,setMUser]=useState('');
    const [mTitle,setMTitle]=useState('');
    const [mContent,setMContent]=useState('');

    const navigate = useNavigate();



    const onSubmit=(e)=>{
        e.preventDefault();

        if (!currentUser) {
            alert("유저 정보가 없습니다. 로그인 해주세요.");
            navigate('/login');
            return;
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const users=JSON.parse(localStorage.getItem("users"))||[];
        
        const newMail={
            id:Date.now(),
            from:currentUser.userId,
            to:mUser,
            title:mTitle,
            content:mContent,
            date:formattedDate,

        };


        const newSend = users.map((p) => {
            if (p.userId === mUser) {
                const updatedMail = p.mail ? [...p.mail, newMail] : [newMail];
                return { ...p, mail: updatedMail };
            }
        return p;
    });


        localStorage.setItem("users",JSON.stringify(newSend));

        alert('메일이 전송되었습니다.')
        navigate('/Home');
    }   

    return (
        <div>
            <form onSubmit={onSubmit}>
                받는 사람 <input type='text'
                        value={mUser}
                        onChange={(e) => setMUser(e.target.value)}/>

                제목 <input type='text'
                        value={mTitle}
                        onChange={(e) => setMTitle(e.target.value)}/>

                <textarea
                        value={mContent}
                        onChange={(e) => setMContent(e.target.value)}/>
                

                <button type='submit'>전송</button>
            </form>
            
        </div>
    );
};

export default SendMail;