import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NaviBar from './components/NaviBar';
import Home from './components/Home';
import Login from './components/login'; // 명세서 기준 소문자 l
import Join from './components/Join'; // 명세서 기준 대문자 J
import CreateBoard from './components/CreateBoard';
import List from './components/List';
import Board from './components/Board';
import EditBoard from './components/EditBoard';
import Member from './components/Member';
import './App.css';

function App() {
  return (
    <Router>
      <div className="cafe-container">
        {/* 상단 네비게이션 */}
        <header className="cafe-header">
          <div className="logo">Biceps</div>
          <NaviBar />
        </header>

        <main className="cafe-main">
          {/* 왼쪽 사이드바 (사용자 정보/메뉴) */}
          <aside className="cafe-sidebar">
            <div className="user-profile">
              <div className="profile-img"></div>
              <p>사용자 님</p>
              <button>카페 글쓰기</button>
            </div>
            <ul className="menu-list">
              <li>전체글보기</li>
              <li>자유게시판</li>
            </ul>
          </aside>

          {/* 오른쪽 컨텐츠 영역 */}
          <section className="cafe-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/board/create" element={<CreateBoard />} />
              <Route path="/list" element={<List />} />
              <Route path="/list/:id" element={<Board />} />
              <Route path="/board/edit/:id" element={<EditBoard />} />
              <Route path="/member" element={<Member />} />
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;