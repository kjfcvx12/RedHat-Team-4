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
          {/* path="/"는 홈 화면을 의미합니다 */}
          <Route path="/" element={<Home />} />
          {/* 다른 페이지들도 이런 식으로 추가할 수 있습니다 */}
          <Route path="/cafe-home" element={<div>카페 홈 페이지 준비 중...</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;