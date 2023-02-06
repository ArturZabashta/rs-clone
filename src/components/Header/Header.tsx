import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setIsMenuOn } from '../../store/uiSlice';
import GameMenu from '../GameMenu/GameMenu';
import MyButton from '../MyButton/MyButton';

import { ReactComponent as LogoSvg } from './HeaderLogo/logo.svg';

const Header: React.FC = () => {
  const location = useLocation().pathname;
  // Global State
  const { currentPage, isMenuOn } = useAppSelector((state) => state.ui);
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

  const menuHandler = () => {
    dispatch(setIsMenuOn(!menuOn));
  };

  const backHandler = () => {
    if (menuOn) {
      dispatch(setIsMenuOn(false));
    }
  };

  return (
    <header className="header" style={{ display: 'flex' }}>
      <h1>
        <LogoSvg />
      </h1>
      <h2 className="current-page">{pageName}</h2>
      <nav className="header_nav">
        {location === '/' ? (
          <MyButton className="login_btn f-bold" route="/login">
            ALREADY HAVE AN ACCOUNT?
          </MyButton>
        ) : (
          ''
        )}

        {location === '/home' || location === '/' ? (
          ''
        ) : (
          <MyButton className={menuOn ? 'menu_btn __menu-on' : 'menu_btn'} onClickButton={menuHandler}>
            Menu
          </MyButton>
        )}

        {location === '/home' || location === '/' ? (
          ''
        ) : (
          <MyButton className="prev-page_btn" route={path} onClickButton={backHandler}>
            Go Back
          </MyButton>
        )}
      </nav>
      <GameMenu menuOnProp={menuOn} onClickClose={backHandler} />
    </header>
  );
};
export default Header;
