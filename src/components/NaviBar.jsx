import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useCafe} from './CafeContextPro';

const NaviBar = () => {
    const {currentUser, logout} = useCafe();

    const navigator = useNavigate();

    const logout1 = () => {
        logout();
        navigator('/');
    }

    return (
        <nav>
            <ul className="flex list-none gap-4 items-center">
                <li><Link to="/" className="no-underline text-gray-600 text-sm">홈</Link></li>
                <li><Link to="/list" className="no-underline text-gray-600 text-sm">글목록</Link></li>
                <li><Link to="/board/create" className="no-underline text-gray-600 text-sm">글쓰기</Link></li>
                <li><Link to="/member" className="no-underline text-gray-600 text-sm">
                    {currentUser ? (
                        currentUser.userId === "admin" ? "회원 목록" : "마이페이지"
                    ) : "마이페이지"}</Link></li>
                <li><Link to='/mail' className="no-underline text-gray-600 text-sm">메일</Link></li>
                <div className="ml-auto flex items-center gap-4">
                    {!currentUser && (
                        <>
                            <li><Link to="/login" className="no-underline text-gray-600 text-sm">로그인</Link></li>
                            <li><Link to="/join" className="no-underline text-gray-600 text-sm">회원가입</Link></li>
                        </>
                    )}
                    {currentUser && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-bold">{currentUser.userId}님, 환영합니다.</span>
                            <button onClick={logout1}
                                    className="text-sm text-gray-400 cursor-pointer bg-transparent border-none">로그아웃
                            </button>
                        </div>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default NaviBar;