import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState(
        JSON.parse(localStorage.getItem("posts")) || []
    );

    return (
        // 레이아웃 컨테이너: flex, 간격, 패딩, 최대너비, 중앙정렬
        <main className="min-h-screen max-w-6xl mx-auto p-6 bg-white rounded-xl mt-10 text-gray-800">
            {/* 오른쪽 메인 게시판 */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    전체글보기
                </h1>
            </div>
            <div className="mb-8 rounded-lg overflow-hidden border border-gray-200">
                <table className="w-full">
                    <thead
                        className="py-4 px-6 bg-gray-50 font-bold text-gray-600 text-center border-b border-gray-200 text-sm">
                        <tr className="border-b border-gray-200 bg-gray-50">
                            {/* 14자리 숫자를 수용하기 위해 너비를 w-40(160px)으로 대폭 확장 */}
                            <th className="w-40 py-3 text-center">번호</th>
                            {/* 제목: pl-4(왼쪽 간격)를 주어 번호와 시각적으로 분리 */}
                            <th className="py-3 text-center pl-4 pr-6">제목</th>
                            <th className="w-24 py-3 text-center">작성자</th>
                            <th className="w-28 py-3 text-center">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {posts.length > 0 ? (
                        posts.map((i) => (
                            <tr key={i.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                {/* 번호 영역: 14자리를 위해 충분한 너비 확보 */}
                                <td className="py-3 text-center text-gray-400 px-2 w-40 truncate">
                                    {i.id}
                                </td>

                                {/* 제목 영역: pl-20으로 왼쪽 간격을 크게 벌려 중앙 쪽으로 밀어줌 */}
                                <td className="py-3 pl-20 pr-6 truncate">
                                    <Link to={`/list/${i.id}`}
                                          className="hover:underline text-gray-800 font-medium inline-block">
                                        {i.title}
                                    </Link>
                                </td>

                                <td className="py-3 text-center text-gray-600 truncate">{i.writerId}</td>
                                <td className="py-3 text-center text-gray-400">{i.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-20 text-center text-gray-400">
                                작성된 게시글이 없습니다.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Home;