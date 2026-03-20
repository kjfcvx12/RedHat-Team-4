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
                <li className="grid grid-cols-12 gap-2 py-4 px-6 bg-gray-50 font-bold text-gray-600 border-b border-gray-200 text-sm">
                    <span className="col-span-2 text-center">번호</span>
                    <span className="col-span-2 text-center">보낸 사람</span>
                    <span className="col-span-5 text-center">제목</span>
                    <span className="col-span-3 text-center">작성일</span>
                </li>
                {mailList.length > 0 ? (
                    mailList.map((i)=>(
                    <li key={i.id} className="grid grid-cols-12 gap-2 py-4 px-6 bg-gray-50 text-gray-600 border-b border-gray-200 text-sm items-center">
                        <span className="col-span-2 text-center truncate">{i.id}</span>
                        <span className="col-span-2 text-center truncate">{i.from}</span>
                        <div className="col-span-5 flex justify-center items-center"><Link to={`/mail/${i.title}`}><span>{i.title}</span></Link></div>
                        <span className="col-span-3 text-center text-gray-400 text-xs">{i.date}</span>
                    </li>
                ))):(<li>메일이 없습니다.</li>)}
            </ul>
        </div>
    );
};


export default Mail;

