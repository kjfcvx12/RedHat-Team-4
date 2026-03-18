import React from 'react';
import { Link } from 'react-router-dom';

const NaviBar = () => {
  return (
    <nav className="top-nav">
      <ul>
        <li><Link to="/">홈</Link></li>
        <li><Link to="/list">글목록</Link></li>
        <li><Link to="/board/create">글쓰기</Link></li>
        <li><Link to="/member">회원목록</Link></li>
        <li><Link to="/login">로그인</Link></li>
        <li><Link to="/join">회원가입</Link></li>
      </ul>
    </nav>
  );
};

export default NaviBar;