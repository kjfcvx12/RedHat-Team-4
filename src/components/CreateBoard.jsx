import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCafe } from './context/CafeContext';
const CreateBoard = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    
    const { currentUser } = useCafe();
    useEffect(() => {
        if (!currentUser) {
            alert("로그인 후 다시 이용해 주세요!");
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const onSubmit1 = (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            alert("유저 정보가 없습니다. 다시 로그인 해주세요.");
            navigate('/login');
            return;
        }

        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        const newPost = {
            id: Date.now(),
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
        <div className="min-h-screen bg-white pt-20">
            <div className="container mx-auto px-4 max-w-7xl pb-16">
                
                <header className="flex justify-end py-10 border-b border-gray-100 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        카페 글쓰기
                    </h1>
                </header>

                <form onSubmit={onSubmit1} className="relative flex flex-col gap-8">
                    
                    <div className="border border-gray-200 shadow-sm rounded-lg bg-white overflow-hidden">
                        
                        <div className="bg-gray-50 border-b border-gray-100 p-6">
                            <input
                                type='text'
                                placeholder='제목을 입력해 주세요.'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full text-2xl font-medium text-gray-900 placeholder:text-gray-300 border-b-2 border-transparent focus:border-green-500 focus:outline-none pb-2 transition-colors duration-200"
                            />
                        </div>

                        <div className="p-8">
                            <textarea
                                placeholder='게시글을 입력해주세요'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-[600px] text-lg leading-relaxed text-gray-800 placeholder:text-gray-300 border-0 focus:ring-0 focus:outline-none resize-none"
                            />
                        </div>

                     

                    </div>

                    <div className="flex justify-end pt-4">
                        <button 
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-12 rounded-full text-xl shadow-md transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
                        >
                            게시글 등록
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default CreateBoard;
