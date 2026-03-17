// src/components/Navibar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navibar = () => {
  // 사진 속 7개 메뉴 구성을 그대로 반영
  const navItems = [
    { name: '카페홈', path: '/' },
    { name: '이웃', path: '/neighbor' },
    { name: '가입카페', path: '/joined-cafes' },
    { name: '새글', path: '/new-posts' },
    { name: '내소식', path: '/notifications' },
    { name: '채팅', path: '/chat' },
    { name: '마이카페', path: '/my-cafe' }
  ];

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '12px 20px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #eee',
      fontSize: '13px',
      fontWeight: '500'
    }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '18px', margin: 0, padding: 0 }}>
        {navItems.map((item) => (
          <li key={item.name}>
            <Link 
              to={item.path} 
              style={{ 
                textDecoration: 'none', 
                color: '#333', 
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              // 마우스 올렸을 때 색상 변화를 주고 싶다면 추가 스타일링 가능
              onMouseOver={(e) => e.target.style.color = '#00c73c'}
              onMouseOut={(e) => e.target.style.color = '#333'}
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