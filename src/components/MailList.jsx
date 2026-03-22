import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCafe } from './CafeContextPro';
import SendMail from './SendMail';

const MailList = () => {
    const { currentUser, selected, setSelected } = useCafe();
    const [mList, setMList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const myMail = users.find((i) => i.userId === currentUser.userId);

        if (myMail) {
            const mails = selected ? (myMail.sMail || []) : (myMail.rMail || []);
            setMList([...mails].reverse());
        } else {
            setMList([]);
        }
    }, [currentUser, navigate, selected]);
   

    return (
        
        <div>
            <div className="flex justify-end">
                <button 
                    className={`font-bold py-2 px-4 rounded transition-all border-2 
                        ${selected 
                            ? 'bg-green-700 text-white border-green-900 ring-2 ring-green-300' 
                            : 'bg-green-500 text-white border-transparent hover:bg-green-600'
                        }`}
                    onClick={() => setSelected(true)}
                >
                    보낸 편지함
                </button>

                <button 
                    className={`font-bold py-2 px-4 rounded transition-all border-2 
                        ${!selected 
                            ? 'bg-green-700 text-white border-green-900 ring-2 ring-green-300' 
                            : 'bg-green-500 text-white border-transparent hover:bg-green-600'
                        }`}
                    onClick={() => setSelected(false)}
                >
                    받은 편지함
                </button>
                <Link to={'/mail/send'}>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded border-2 border-transparent transition-all shadow-sm active:scale-95">
                        메일 보내기
                    </button>
                </Link>
            </div>
            
            <ul>
                <li className="grid grid-cols-12 gap-2 py-4 px-6 bg-gray-50 font-bold text-gray-600 border-b border-gray-200 text-sm">
                    <span className="col-span-2 text-center">번호</span>
                    <span className="col-span-2 text-center">{selected?'받은 사람':'보낸 사람'}</span>
                    <span className="col-span-5 text-center">제목</span>
                    <span className="col-span-3 text-center">작성일</span>
                </li>

                
                {mList.length > 0 ? (
                    mList.map((i)=>(
                    <li key={i.id} className="grid grid-cols-12 gap-2 py-4 px-6 bg-gray-50 text-gray-600 border-b border-gray-200 text-sm items-center">
                        <span className="col-span-2 text-center truncate">{i.id}</span>
                        <span className="col-span-2 text-center truncate">{selected ? i.to : i.from}</span>
                        <div className="col-span-5 flex justify-center items-center"><Link to={`/mail/${i.id}`}><span>{i.title}</span></Link></div>
                        <span className="col-span-3 text-center text-gray-400 text-xs">{i.date}</span>
                    </li>
                ))):(
                    <li className="py-20 text-center text-gray-500 bg-white">
                        {selected ? "보낸 편지가 없습니다." : "받은 편지가 없습니다."}
                     </li>
                )}

                
            </ul>
        </div>
    );
};


export default MailList;

