import React from 'react';
import CSS from 'csstype';

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <h1>Video Tracking</h1>
    </header>
  )
}

const headerStyle: CSS.Properties = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

export default Header;