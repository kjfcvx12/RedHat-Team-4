// src/components/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );

  return (
    // 레이아웃 컨테이너: flex, 간격, 패딩, 최대너비, 중앙정렬
    <div className="flex gap-5 p-5 max-w-[1080px] mx-auto bg-gray-50 min-h-screen">
      
      {/* 오른쪽 메인 게시판 */}
      <main className="flex-grow bg-white p-5 border border-gray-200 shadow-sm rounded-sm">
        <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-3 mb-4">
          전체글보기
        </h3>
        
        <table className="w-full border-collapse text-[13px] table-fixed">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 bg-gray-50">
              {/* 14자리 숫자를 수용하기 위해 너비를 w-40(160px)으로 대폭 확장 */}
              <th className="w-40 py-3 font-semibold text-center">번호</th>
              {/* 제목: pl-4(왼쪽 간격)를 주어 번호와 시각적으로 분리 */}
              <th className="py-3 font-semibold text-center pl-4 pr-6">제목</th>
              <th className="w-24 py-3 font-semibold text-center">작성자</th>
              <th className="w-28 py-3 font-semibold text-center">작성일</th>
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
                    <Link to={`/list/${i.id}`} className="hover:underline text-gray-800 font-medium inline-block">
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
      </main>
    </div>
  );
};

export default Home;
