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
      alert('아이디 또는 비밀번호 오류'); // 성공 아닐경우 오류페이지 
    }
  };

  return (
    <div>
      <form onSubmit={userLogin}>    {/*form제출시 userlogin 함수실행 */}
        <h1>로그인</h1>

        <p>
          <input type="text" value={userId} onChange={(e) =>
           setUserId(e.target.value)} placeholder="아이디 입력"/>
        </p>

        <p>
          <input type="password" value={pw}onChange={(e) => 
            setPw(e.target.value)}placeholder="비밀번호 입력" />
        </p>

        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
