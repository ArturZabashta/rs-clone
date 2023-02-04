import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/userHooks';
import GameMenu from '../GameMenu/GameMenu';

import { ReactComponent as LogoSvg } from './HeaderLogo/logo.svg';

const Header: React.FC = () => {
  const { currentPage } = useAppSelector((state) => state.ui);
  const navigate = useNavigate();
  return (
    <header className="header">
      <h1>
        <LogoSvg />
      </h1>
      <div className="current-page">{currentPage}</div>
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
