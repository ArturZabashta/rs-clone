import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import GameMenu from '../GameMenu/GameMenu';

import { ReactComponent as LogoSvg } from './HeaderLogo/logo.svg';
const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <h1>
        <LogoSvg />
      </h1>
      <div className="current-page"></div>
      <nav className="header_nav">
        <button>Menu</button>
        <button onClick={() => navigate('/home')}>Back</button>
      </nav>
      <GameMenu />
      <Link to="/login">ALREADY HAVE AN ACCOUNT?</Link>
    </header>
  );
};
export default Header;
