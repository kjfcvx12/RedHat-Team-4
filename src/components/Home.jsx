// src/components/Home.jsx
import React, { useState } from 'react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="main-layout" style={{ display: 'flex', gap: '20px', padding: '20px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* 왼쪽 사이드바 */}
      <aside style={{ width: '200px', flexShrink: 0 }}>
        <div style={{ backgroundColor: '#fff', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
          
          {isLoggedIn ? (
            /* 로그인 후 화면 */
            <div className="profile-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#f3f4f6', borderRadius: '50%', border: '1px solid #eee' }}></div>
                <div>
                  <strong style={{ fontSize: '14px' }}>님</strong>
                  <p style={{ fontSize: '11px', color: '#00c73c', margin: 0 }}>내 소식 0 </p>
                </div>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                style={{ width: '100%', padding: '5px', backgroundColor: '#fff', border: '1px solid #ddd', fontSize: '12px', cursor: 'pointer', marginBottom: '10px' }}
              >
                로그아웃
              </button>
              <button style={{ width: '100%', padding: '8px', backgroundColor: '#00c73c', color: '#fff', border: 'none', borderRadius: '2px', cursor: 'pointer', fontWeight: 'bold' }}>
                카페 글쓰기
              </button>
            </div>
          ) : (
            /* 로그인 전 화면 */
            <div className="login-box">
              <p style={{ fontSize: '11px', marginBottom: '10px', color: '#666' }}>네이버 카페를 더 편리하게 이용하세요.</p>
              <button 
                onClick={() => setIsLoggedIn(true)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#00c73c', color: '#fff', border: 'none', borderRadius: '2px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                NAVER 로그인
              </button>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888' }}>
                <span>아이디 찾기</span>
                <span style={{ fontWeight: 'bold' }}>회원가입</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* 오른쪽 메인 게시판 */}
      <main style={{ flexGrow: 1, backgroundColor: '#fff', padding: '20px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>전체글보기</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee', color: '#888' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>제목</th>
              <th style={{ width: '80px' }}>작성자</th>
              <th style={{ width: '100px' }}>작성일</th>
            </tr>
          </thead>
      
        </table>
      </main>
    </div>
  );
};

export default Home;