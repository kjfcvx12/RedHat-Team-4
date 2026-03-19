import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts")) || []);
    const [currentUser, setCurrnetUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);

    const [find, setFind] = useState('id');
    const [input, setInput] = useState('');
    const [findPost, setFindPost] = useState([]);
    const [findNum, setFindNum] = useState(false);

    const handleDelete = (id) => {
        const updated = posts.filter((i) => i.id !== id)
        localStorage.setItem('posts', JSON.stringify(updated));
        setPosts(updated);
    }

    const handleFind = () => {
        setFindNum(true);
        setFindPost(posts.filter((i) => {
            if (find === 'all') {
                return i.title.includes(input) || i.content.includes(input)
            } else {
                return String(i[find]).includes(input);
            }
        }) || []);
    }

    const handleCancel = () => {
        setFindNum(false);
        setFindPost([]);
        setInput('');
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl mt-10 text-gray-800">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">게시글 목록</h1>
                <Link to={'/board/create'}>
                    <button className="bg-gray-600 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-all shadow-md active:scale-95">
                        글쓰기
                    </button>
                </Link>
            </div>

            <ul className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
                {/* 헤더 영역: col-span 합을 12로 유지 */}
                <li className="grid grid-cols-12 gap-2 py-4 px-6 bg-gray-50 font-bold text-gray-600 text-center border-b border-gray-200 text-sm">
                    <span className="col-span-1">번호</span>
                    <span className="col-span-4 text-left px-2">제목</span>
                    <span className="col-span-1">좋아요</span>
                    <span className="col-span-1">싫어요</span>
                    <span className="col-span-2">작성자</span>
                    <span className="col-span-1.5 col-span-2">작성일</span>
                    <span className="col-span-1">관리</span>
                </li>
                
                {(findNum ? findPost : posts).length > 0 ? (
                    (findNum ? findPost : posts).map((i) => (
                        <li key={i.id} className="grid grid-cols-12 gap-2 py-4 px-6 items-center text-center border-b border-gray-50 hover:bg-blue-50/30 transition-colors last:border-0">
                            {/* 번호 */}
                            <span className="col-span-1 text-xs text-gray-400 font-mono truncate">
                                {i.id}
                            </span>
                            
                            {/* 제목 */}
                            <Link to={`/list/${i.id}`} className="col-span-4 text-left font-semibold text-gray-700 hover:text-blue-600 truncate px-2 transition-colors">
                                {i.title}
                            </Link>
                            
                            {/* 좋아요/싫어요 */}
                            <span className="col-span-1 text-blue-500 font-medium text-xs">👍 {i.like || 0}</span>
                            <span className="col-span-1 text-red-400 font-medium text-xs">👎 {i.hate || 0}</span>

                            {/* 작성자: 배지 스타일로 강조 */}
                            <span className="col-span-2 text-sm text-gray-600 font-medium truncate">
                                <span className="bg-gray-100 px-2 py-1 rounded text-[11px] text-gray-500 mr-1 hidden lg:inline">ID</span>
                                {i.writerId}
                            </span>
                            
                            {/* 작성일: 연/월/일만 나오도록 스타일링 */}
                            <span className="col-span-2 text-xs text-gray-400 font-mono">
                                {i.date}
                            </span>
                            
                            {/* 관리 버튼: 작성자 본인 혹은 관리자만 노출 */}
                            <div className="col-span-1 flex justify-center gap-1">
                                {currentUser && (currentUser.userId === i.writerId || currentUser.userId === 'admin') ? (
                                    <button 
                                        onClick={() => handleDelete(i.id)}
                                        className="text-red-400 hover:text-red-600 text-xs font-bold p-1 transition-colors"
                                        title="삭제"
                                    >
                                        삭제
                                    </button>
                                ) : (
                                    <span className="text-gray-200">-</span>
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="py-32 text-center text-gray-400 bg-gray-50">
                        {findNum ? `"${input}" 검색 결과가 없습니다.` : '첫 번째 게시물을 작성해 보세요!'}
                    </div>
                )}
            </ul>

            {/* 검색창 영역 (생략 없음) */}
            <div className="flex justify-center items-center gap-3 p-6 bg-gray-100 rounded-2xl shadow-inner">
                <select 
                    value={find}
                    onChange={(e) => setFind(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                >
                    <option value="id">ID</option>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                    <option value="all">제목+내용</option>
                </select>
                <input 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleFind()} 
                    value={input}
                    className="w-80 border border-gray-300 rounded-lg px-5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    placeholder="검색어를 입력하세요..."
                />
                <div className="flex gap-2">
                    <button onClick={handleFind} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 font-bold transition-all shadow-sm active:scale-95">
                        검색
                    </button>
                    <button onClick={handleCancel} className="bg-gray-400 text-white px-6 py-2.5 rounded-lg hover:bg-gray-500 transition-all shadow-sm active:scale-95">
                        초기화
                    </button>
                </div>
            </div>
        </div>
    );
};

export default List;
