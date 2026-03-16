import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCafe } from './CafeContextPro';

const NavBar = () => {
    const {currentUser,logout}=useCafe();

    const navigator=useNavigate();

    const logout1=()=>{
        logout();
        navigator('/');
    }

    return (
        <div className='bg-orange-200 shadow-orange-600/50 p-4 flex items-center gap-6'>
            <>
                <Link to='/'>홈</Link>
                <Link to='/member'>회원목록</Link>
                <Link to='/list'>게시글 목록</Link>
                <div className='ml-auto flex items-center gap-4'>
                {!currentUser&&(
                    <>
                        <Link to='/login'>로그인</Link>
                        <Link to='/join'>회원가입</Link>
                    </>
                )}
                {currentUser&&(
                    <div>
                        <span>{currentUser.userId}님</span>
                        <button onClick={logout1}>로그아웃</button>
                    </div>
                )}    
                </div>
            </>
        </div>
    );
};

export default NavBar;