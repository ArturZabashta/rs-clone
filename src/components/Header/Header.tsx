import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setCurrentPage, setLanguage } from '../../store/uiSlice';
import GameMenu from '../GameMenu/GameMenu';
import MyButton from '../MyButton/MyButton';
import UserLvl from '../UserLevel';

import { ReactComponent as LogoSvg } from './HeaderLogo/logo.svg';

const Header: React.FC = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // Global State
  const { currentPage, isMenuOn, isLogin, username, language } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  // Local State
  const [path, setPath] = useState(currentPage ?? location);
  const [pageName, setPageName] = useState('');
  const [menuOn, setMenuOn] = useState(isMenuOn);

  const setHeaderTitle = () => {
    switch (currentPage) {
      case '': {
        // setPath('/');
        setPageName('');
        break;
      }
      case '/': {
        // setPath('/');
        setPageName('');
        break;
      }
      case '/login': {
        // setPath('/');
        setPageName(language === 'en' ? 'LOG IN' : 'Авторизация');
        break;
      }
      case '/signup': {
        // setPath('/');
        setPageName(language === 'en' ? 'SIGN UP' : 'Регистрация');
        break;
      }
      case '/single-player': {
        // setPath('/home');
        setPageName(language === 'en' ? 'SINGLE PLAYER' : 'Одиночная игра');
        break;
      }
      case '/multi-player': {
        // setPath('/home');
        setPageName(language === 'en' ? 'MULTI PLAYER' : 'Мультиплэйер');
        break;
      }
      case '/constructor': {
        // setPath('/home');
        setPageName(language === 'en' ? 'Constructor' : 'Конструктор');
        break;
      }
      case '/score': {
        // setPath('/home');
        setPageName(language === 'en' ? 'LEADER BOARD' : 'Победители');
        break;
      }
      case '/home': {
        // setPath('/home');
        setPageName('');
        break;
      }
    }
  };

  // useEffect(() => {
  //   console.log('language from HEADER', language);
  //   if (sessionStorage.getItem('lng')) {
  //     dispatch(setLanguage(String(sessionStorage.getItem('lng'))));
  //     i18n.changeLanguage(language);
  //     setHeaderTitle();
  //   } else {
  //     dispatch(setLanguage('en'));
  //     sessionStorage.setItem('lng', 'en');
  //   }
  // }, [language]);

  useEffect(() => {
    setHeaderTitle();
    setMenuOn(isMenuOn);
  }, [currentPage, isMenuOn]);

  const logoOnClick = () => {
    dispatch(setCurrentPage(isLogin ? '/home' : '/'));
    navigate(isLogin ? '/home' : '/');
  };

  return (
    <header className="header" style={{ display: 'flex' }}>
      <h1 className="header_logo" onClick={logoOnClick}>
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
              {t('header.login_btn')}
            </MyButton>
            <MyButton className="login_btn f-bold btn_blue" route="/signup">
              {t('header.signup_btn')}
            </MyButton>
          </div>
        )}
        <GameMenu />
      </nav>
    </header>
  );
};
export default Header;
