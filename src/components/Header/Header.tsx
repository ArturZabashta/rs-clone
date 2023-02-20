import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import GameMenu from '../GameMenu/GameMenu';
import MyButton from '../MyButton/MyButton';
import UserLvl from '../UserLevel';

import { ReactComponent as LogoSvg } from './HeaderLogo/logo.svg';

const Header: React.FC = () => {
  const location = useLocation().pathname;
  // Global State
  const { currentPage, isMenuOn, isLogin, username } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  // Local State
  const [path, setPath] = useState(currentPage ?? location);
  const [pageName, setPageName] = useState('');
  const [menuOn, setMenuOn] = useState(isMenuOn);

  useEffect(() => {
    switch (currentPage) {
      case '': {
        setPath('/');
        setPageName('');
        break;
      }
      case '/': {
        setPath('/');
        setPageName('');
        break;
      }
      case '/login': {
        setPath('/');
        setPageName('LOG IN');
        break;
      }
      case '/signup': {
        setPath('/');
        setPageName('SIGN UP');
        break;
      }
      case '/single-player': {
        setPath('/home');
        setPageName('SINGLE PLAYER');
        break;
      }
      case '/multi-player': {
        setPath('/home');
        setPageName('MULTI PLAYER');
        break;
      }
      case '/score': {
        setPath('/home');
        setPageName('LEADER BOARD');
        break;
      }
      case '/home': {
        setPath('/home');
        setPageName('');
        break;
      }
    }
    setMenuOn(isMenuOn);
  }, [currentPage, isMenuOn]);

  return (
    <header className="header" style={{ display: 'flex' }}>
      <h1 className="header_logo">
        <LogoSvg />
      </h1>
      <h2 className="current-page">{pageName}</h2>
      <nav className="header_nav">
        {isLogin ? (
          <div className="header_welcome">
            <span className="header_username">{username}</span>
            <UserLvl />
          </div>
        ) : (
          <div className="d-f">
            <MyButton className="login_btn f-bold" route="/login">
              Log In
            </MyButton>
            <MyButton className="login_btn f-bold btn_blue" route="/signup">
              Sign Up
            </MyButton>
          </div>
        )}
        <GameMenu />
      </nav>
    </header>
  );
};
export default Header;
