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

        if (!currentUser || !mUser || !mTitle || !mContent) {
            let msg='';
            if(!currentUser){msg="유저 정보가 없습니다. 로그인 해주세요.";}
            else if(!mUser){msg="수신자를 적어주세요."}
            else if(!mTitle){msg="제목을 작성해 주세요."}
            else if(!mContent){msg="내용을 작성해 주세요."}
            alert(msg);

            if(!currentUser)navigate('/login');
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
        <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <form onSubmit={onSubmit} class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="text-sm font-semibold text-gray-700">받는 사람</label>
                    <input type='text'
                        value={mUser}
                        onChange={(e) => setMUser(e.target.value)}
                        class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-sm font-semibold text-gray-700">제목</label>
                    <input type='text'
                        value={mTitle}
                        onChange={(e) => setMTitle(e.target.value)}
                        class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-sm font-semibold text-gray-700">내용</label>
                    <textarea
                            rows="7"
                            value={mContent}
                            onChange={(e) => setMContent(e.target.value)}
                            class="border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>

                <button type='submit' 
                        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
                    전송
                </button>
            </form>
        </div>
    );
};

export default SendMail;