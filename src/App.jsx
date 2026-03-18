import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// [공통 컴포넌트]
import Navibar from './components/NaviBar.jsx';
import Home from './components/Home.jsx';

// [명세서 규칙 적용: Description = 컴포넌트 이름 / 파일위치주소 반영]
// 팀원들이 실제 파일을 만들면 아래 "() => <div>...</div>" 부분을 
// "import CafeHome from './components/CafeHome.jsx'" 형태로 바꾸면 됩니다.

const CafeHome = () => <div style={{padding:'20px'}}>CafeHome 페이지 (파일위치: ./components/CafeHome.jsx)</div>;
const Neighbor = () => <div style={{padding:'20px'}}>Neighbor 페이지 (파일위치: ./components/Neighbor.jsx)</div>;
const JoinedCafes = () => <div style={{padding:'20px'}}>JoinedCafes 페이지 (파일위치: ./components/JoinedCafes.jsx)</div>;
const NewPosts = () => <div style={{padding:'20px'}}>NewPosts 페이지 (파일위치: ./components/NewPosts.jsx)</div>;
const Notifications = () => <div style={{padding:'20px'}}>Notifications 페이지 (파일위치: ./components/Notifications.jsx)</div>;
const Chat = () => <div style={{padding:'20px'}}>Chat 페이지 (파일위치: ./components/Chat.jsx)</div>;
const MyCafe = () => <div style={{padding:'20px'}}>MyCafe 페이지 (파일위치: ./components/MyCafe.jsx)</div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* 상단 네비게이션 */}
        <Navibar />
        
        <Routes>
          {/* URL = path / element = Description 명칭 매칭 */}
          <Route path="/" element={<Home />} />
          
          <Route path="/cafe-home" element={<CafeHome />} />
          <Route path="/neighbor" element={<Neighbor />} />
          <Route path="/joined-cafes" element={<JoinedCafes />} />
          <Route path="/new-posts" element={<NewPosts />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/my-cafe" element={<MyCafe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;