import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCafe } from './CafeContextPro';

const CreateBoard = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

  
    const { currentUser, setCurrentUser } = useCafe();

  
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, [setCurrentUser]);

  
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser,navigate]);

    const onSubmit1 = (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            navigate('/login');
            return;
        }

        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(now.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;


        const newPost = {
            id: Date.now(),
            date:formattedDate,
            title: title.trim(),
            content: content.trim(),
            writerId: currentUser.userId,
        };

        if (newPost.title === "" || newPost.content === "") {
            alert("제목과 내용을 모두 입력해 주세요.");
            return;
        }

        posts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(posts));
        setTitle("");
        setContent("");
        navigate('/list');
    };

    return (
        <div className="min-h-screen max-w-6xl mx-auto p-6 bg-white rounded-xl mt-10 text-gray-800">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-black">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">카페 글쓰기</h1>
                <div className="flex justify-center items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/list')}
                        className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 font-bold transition-all active:scale-95"
                    >
                        작성 취소
                    </button>
                    <button
                        type="button" onClick={onSubmit1}
                        className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 font-bold transition-all active:scale-95"
                    >
                        게시글 등록
                    </button>
                </div>

            </div>

            <form className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 ml-1">제목</label>
                    <input
                        type='text'
                        placeholder='제목을 입력해 주세요.'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-5 py-3 text-base focus:ring-2 focus:ring-green-500 outline-none transition-shadow placeholder:text-gray-300"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-600 ml-1">내용</label>
                    <textarea
                        placeholder='내용을 상세히 입력해주세요...'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-[500px] border border-gray-300 rounded-lg px-5 py-4 text-base focus:ring-2 focus:ring-green-500 outline-none transition-shadow resize-none placeholder:text-gray-300 leading-relaxed"
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateBoard;
