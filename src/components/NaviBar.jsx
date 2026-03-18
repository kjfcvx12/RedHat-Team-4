import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCafe } from './CafeContextPro';

const NaviBar = () => {
    const {currentUser,logout}=useCafe();

    const navigator=useNavigate();

    const logout1=()=>{
        logout();
        navigator('/');
    }

    return (
      <nav className="top-nav">
            <ul>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/list">글목록</Link></li>
                <li><Link to="/board/create">글쓰기</Link></li>
                <li><Link to="/member">회원목록</Link></li>
                <div className='ml-auto flex items-center gap-4'>
                {!currentUser&&(
                    <>
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/join">회원가입</Link></li>
                    </>
                )}
                {currentUser&&(
                    <div>
                        <span>{currentUser.userId}님</span>
                        <button onClick={logout1}>로그아웃</button>
                    </div>
                )}    
                </div>
            </ul>
          </nav>
    );
};

export default NaviBar;