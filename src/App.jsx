// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navibar from './components/NaviBar.jsx';
import Home from './components/Home.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navibar />
        <Routes>
          {/* 메인 홈 */}
          <Route path="/" element={<Home />} />
          
          {/* 나머지 6개 페이지 (현재는 간단한 텍스트로 대체) */}
          <Route path="/neighbor" element={<div style={{padding:'20px'}}>이웃 페이지</div>} />
          <Route path="/joined-cafes" element={<div style={{padding:'20px'}}>가입카페 페이지</div>} />
          <Route path="/new-posts" element={<div style={{padding:'20px'}}>새글 페이지</div>} />
          <Route path="/notifications" element={<div style={{padding:'20px'}}>내소식 페이지</div>} />
          <Route path="/chat" element={<div style={{padding:'20px'}}>채팅 페이지</div>} />
          <Route path="/my-cafe" element={<div style={{padding:'20px'}}>마이카페 페이지</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;