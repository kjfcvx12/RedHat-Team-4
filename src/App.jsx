import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NaviBar from './components/NaviBar';
import Home from './components/Home';
import Login from './components/Login'; // 명세서 기준 소문자 l
import Join from './components/Join'; // 명세서 기준 대문자 J
import CreateBoard from './components/CreateBoard';
import List from './components/List';
import Board from './components/Board';
import EditBoard from './components/EditBoard';
import Member from './components/Member';
import SendMail from './components/SendMail';
import Mail from './components/Mail';
import './App.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="max-w-[1080px] mx-auto border border-gray-300">
        {/* 상단 네비게이션 */}
        <header className="flex justify-between items-center px-5 py-5 bg-white border-b border-gray-300">
          <Link to="/"><div className="text-2xl font-bold text-[#2db44b]">Biceps</div></Link>
          <NaviBar />
        </header>

          {/* 오른쪽 컨텐츠 영역 */}
          <section className="bg-white p-5 min-h-[500px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/join" element={<Join />} />
              <Route path="/login" element={<Login />} />
              <Route path="/board/create" element={<CreateBoard />} />
              <Route path="/list" element={<List />} />
              <Route path="/list/:id" element={<Board />} />
              <Route path="/board/edit/:id" element={<EditBoard />} />
              <Route path="/member" element={<Member />} />
              <Route path='/mail/send' element={<SendMail />}/>
              <Route path='/mail' element={<Mail />}/>
              
            </Routes>
          </section>
      </div>
    </Router>
  );
}

export default App;