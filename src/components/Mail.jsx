import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCafe } from './CafeContextPro';
import SendMail from './SendMail';

const Mail = () => {
    const { currentUser } = useCafe();
    const [mailList, setMailList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            alert("유저 정보가 없습니다. 로그인 해주세요.");
            navigate('/login');
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const myMail = users.find((i) => i.userId === currentUser.userId);

        if (myMail && myMail.mail) {
            setMailList(myMail.mail);
        }
    }, [currentUser, navigate]);
   

    return (
        
        <div>
            <Link to={'/mail/send'}><button>메일 보내기</button></Link>
            <ul>
                {mailList.length > 0 ? (
                    mailList.map((i)=>(
                    <li key={i.id}>
                        <div>보낸 사람 : {i.from}</div>
                        <div>제목 : {i.title}</div>
                        <div>{i.content}</div>
                        <div>보낸 날짜 : {i.date}</div>
                    </li>
                ))):(<li>메일이 없습니다.</li>)}
            </ul>
        </div>
    );
};


export default Mail;

