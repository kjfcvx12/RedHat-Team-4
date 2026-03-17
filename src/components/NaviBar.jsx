// src/components/Navibar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // 링크 기능을 불러옵니다

const Navibar = () => {
  // 각 메뉴와 이동할 주소를 연결합니다
  const navItems = [
    { name: '카페홈', path: '/cafe-home' },
    { name: '이웃', path: '/neighbor' },
    { name: '가입카페', path: '/my-cafes' },
    { name: '새글', path: '/new-posts' },
    { name: '내소식', path: '/notifications' },
    { name: '채팅', path: '/chat' }
  ];

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px 20px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #eee',
      fontSize: '12px'
    }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '15px', margin: 0 }}>
        {navItems.map((item) => (
          <li key={item.name}>
            {/* Link 태그를 사용하여 새로고침 없이 페이지 이동 */}
            <Link 
              to={item.path} 
              style={{ textDecoration: 'none', color: '#666', cursor: 'pointer' }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navibar;