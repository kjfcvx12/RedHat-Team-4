import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCafe } from './CafeContextPro';

const Login = () => {          
  const { setCurrentUser } = useCafe();  //로그인성공하면 저장
  const navigate = useNavigate(); //로그인 성공하면 페이지이동

  const [userId, setUserId] = useState(''); //아이디 저장state
  const [pw, setPw] = useState(''); // 비밀번호 저장 state

  const userLogin = (e) => {   //form제출시 새로고침 방지 
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem('users')) || []; 
    //로컬스토리지에 저장된 회원목록가져오고 문자열로바꾸기 없으면 비우기
    const loginUser = users.find(
      (user) => user.userId === userId && user.pw === pw
    ); //입력하 아이디 비번 일치하는사람 찾기 

    if (loginUser) {    //constext에 로그인정보 저장 
      setCurrentUser(loginUser);
      localStorage.setItem('currentUser', JSON.stringify(loginUser));
      //다른 컴포넌트에서 로그인상태공유 가능
      
      setUserId(''); //아이디 입력칸 비우기 
      setPw('');  //비번 입력칸 비우기 

      navigate('/list'); //로그인 성공하면 list로 이동
    } else {  
      alert('아이디 또는 비밀번호 오류'); // 로그인 실패 시 경고창
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-gray-50 to-white flex items-center justify-center px-4">
      <form
        onSubmit={userLogin}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 text-gray-800 border border-gray-100"
      >
        <div className="mb-8 pb-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-green-600 mb-2">WELCOME</p>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            로그인
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            아이디와 비밀번호를 입력해주세요.
          </p>
        </div>

        <div className="space-y-5">
          <p>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디 입력"
              className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
            />
          </p>

          <p>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
            />
          </p>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-sm"
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
