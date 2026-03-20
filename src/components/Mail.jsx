import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCafe } from './CafeContextPro';

const Mail = () => {
    const { currentUser } = useCafe();
    const {id}=useParams();

    const [sMail, setSmail] = useState(null);
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
            const foundMail = myMail.mail.find((i) => i.id === Number(id));
            setSmail(foundMail);
        }
    }, [currentUser, navigate]);
   

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200">
            {sMail ? (
                <div className="flex flex-col gap-2">
                    <span className="text-xl font-bold text-gray-800">{sMail.title}</span>
                    <div className="flex gap-4 text-sm text-gray-600">
                        <span>보낸 사람: <span className="font-medium">{sMail.from}</span></span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600 border-b pb-2">
                        <span>{sMail.date}</span>
                    </div>
                    <div className="text-gray-800 leading-8 min-h-[200px] whitespace-pre-wrap">
                        {sMail.content}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-20 text-gray-400 italic">
                    메일이 없습니다.
                </div>
            )}
    </div>
    );
};

export default Mail;