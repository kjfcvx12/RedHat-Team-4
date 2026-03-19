import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCafe } from './CafeContextPro';

const Board = () => {
    const { like, setLike, hate, setHate } = useCafe();
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLike, setIsLike] = useState(false);
    const [isHate, setIsHate] = useState(false);
    const [numL,setNumL]=useState(1);
    const [numH,setNumH]=useState(1);

    const [currentUser,setCurrnetUser]=useState(
            JSON.parse(localStorage.getItem("currentUser"))||null
    );

    useEffect(() => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const currentPost = posts.find((i) => i.id === parseInt(id));
        if (currentPost) {
            setPost(currentPost);
            setLike(currentPost.like || 0);
            setHate(currentPost.hate || 0);
        }
    }, [id, setLike, setHate]);

    useEffect(() => {
        if (!post.id) return;
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const uppost = posts.map((p) => p.id === parseInt(id) ? { ...post, like: like, hate: hate } : p);
        localStorage.setItem('posts', JSON.stringify(uppost));
    }, [like, hate, id, post]);

    const onLike=()=>{
        setIsLike(!isLike);
        isLike?setNumL(1):setNumL(-1);
        setLike((i) => i + numL); 
    }

    const onHate=()=>{
        setIsHate(!isHate);
        isHate?setNumH(1):setNumH(-1);
        setHate((i) => i + numH); 
    }



    return (
        /* 전체 화면 중앙 정렬 */
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-2xl bg-white rounded-xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">게시글</h2>
                
                {/* 제목 섹션: 둥근 테두리 */}
                <div className="mb-4 p-4 border-2 border-gray-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">제목</h3>
                    <p className="text-lg text-gray-900">{post.title}</p>
                </div>

                {/* 내용 섹션: 둥근 테두리 + 하단 7줄 여유(pb-28) */}
                <div className="mb-6 p-4 border-2 border-gray-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">내용</h3>
                    <div className="text-base text-gray-700 pb-28">
                        {post.content}
                    </div>
                </div>

                {/* 좋아요/싫어요 버튼: 왼쪽 정렬 */}
                <div className="flex items-center gap-4 mt-4">
                    <button 
                        onClick={() => onLike()}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isLike ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>
                        <span className="font-bold">{like}</span>
                    </button>

                    <button 
                        onClick={() => onHate()}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isHate ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
                        </svg>
                        <span className="font-bold">{hate}</span>
                    </button>

                    <div className="ml-auto">
                            {currentUser&&currentUser.userId=== post.writerId && (
                                <Link to={`/board/edit/${id}`}>
                                    <button className="flex items-center justify-center px-6 py-2 bg-gray-800 text-white text-sm font-bold rounded-full hover:bg-gray-700 transition-all shadow-sm active:scale-95 border border-transparent">
                                        수정
                                    </button>
                                </Link>
                            )}

                    </div>
                    <Link to={'/list'}>
                        <button className="flex items-center justify-center px-6 py-2 bg-gray-800 text-white text-sm font-bold rounded-full hover:bg-gray-700 transition-all shadow-sm active:scale-95 border border-transparent">
                            글 목록
                        </button>
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default Board;
