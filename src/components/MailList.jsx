import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCafe } from './CafeContextPro';
import SendMail from './SendMail';

const MailList = () => {
    const { currentUser } = useCafe();
    const [mList, setMList] = useState([]);
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
            setMList(myMail.mail);
        }
    }, [currentUser, navigate]);
   

    return (
        
        <div>
            <div className="flex justify-end">
                <Link to={'/mail/send'}>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    메일 보내기
                    </button>
                </Link>
            </div>
            <ul>
                <li className="grid grid-cols-12 gap-2 py-4 px-6 bg-gray-50 font-bold text-gray-600 border-b border-gray-200 text-sm">
                    <span className="col-span-2 text-center">번호</span>
                    <span className="col-span-2 text-center">보낸 사람</span>
                    <span className="col-span-5 text-center">제목</span>
                    <span className="col-span-3 text-center">작성일</span>
                </li>
                {mList.length > 0 ? (
                    mList.map((i)=>(
                    <li key={i.id} className="grid grid-cols-12 gap-2 py-4 px-6 bg-gray-50 text-gray-600 border-b border-gray-200 text-sm items-center">
                        <span className="col-span-2 text-center truncate">{i.id}</span>
                        <span className="col-span-2 text-center truncate">{i.from}</span>
                        <div className="col-span-5 flex justify-center items-center"><Link to={`/mail/${i.id}`}><span>{i.title}</span></Link></div>
                        <span className="col-span-3 text-center text-gray-400 text-xs">{i.date}</span>
                    </li>
                ))):(<li>메일이 없습니다.</li>)}
            </ul>
        </div>
    );
};


export default MailList;

