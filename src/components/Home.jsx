import React from 'react';

const Home = () => {

  return (
    <main className="main-layout flex gap-5 p-5 max-w-[1080px] mx-auto">
      <div className="grow bg-white p-5 border border-gray-200">
        <h3 className="border-b-2 border-gray-800 pb-[10px] mb-[15px]">전체글보기</h3>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400">
              <th className="p-[10px] text-left">제목</th>
              <th className="w-20">작성자</th>
              <th className="w-[100px]">작성일</th>
            </tr>
          </thead>
        </table>
      </div>
    </main>
  );
};

export default Home;