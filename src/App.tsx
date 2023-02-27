import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import PopUp from './components/PopUp';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Settings from './components/Settings/Settings';
import { useAppDispatch, useAppSelector } from './hooks/userHooks';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import GameConstructor from './pages/GameConstructor/GameConstructor';
import HomePage from './pages/HomePage/HomePage';
import LogInPage from './pages/LoginPage/LoginPage';
import MultiGamePage from './pages/MultiPlayer/MultiGamePage/MultiGamePage';
import MultiPlayer from './pages/MultiPlayer/MultiPlayer';
import ScorePage from './pages/ScorePage/ScorePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SinglePlayer from './pages/SinglePlayer/SinglePlayer';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import { setTotalScore } from './store/gameSlice';
import { setIsLogin, setLanguage, setUsername, setUserToken } from './store/uiSlice';
import { LSData } from './types/uiInterface';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = sessionStorage.getItem('userData');
  const { t, i18n } = useTranslation();
  const { language } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (userData) {
      try {
        const data: LSData = JSON.parse(userData);

        dispatch(setTotalScore(data.totalScore));
        dispatch(setIsLogin(true));
        dispatch(setUsername(data.username));
        dispatch(setUserToken(data.token));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    // When Render component
    if (sessionStorage.getItem('lng') && sessionStorage.getItem('lng') !== '') {
      dispatch(setLanguage(String(sessionStorage.getItem('lng'))));
      i18n.changeLanguage(String(sessionStorage.getItem('lng')));
    } else {
      dispatch(setLanguage('en'));
      sessionStorage.setItem('lng', 'en');
      i18n.changeLanguage('en');
    }
    // When Unmount component
    return () => {
      sessionStorage.setItem('lng', language);
    };
  }, []);

  return (
    <Router>
      <Header />
      <PopUp />
      <main className="main">
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route
            path="/home"
            element={
              <PrivateRoute route={'/home'}>
                <HomePage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<LogInPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/single-player" element={<SinglePlayer />}></Route>
          <Route
            path="/multi-player"
            element={
              <PrivateRoute route={'/multi-player'}>
                <MultiPlayer />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/score"
            element={
              <PrivateRoute route={'/score'}>
                <ScorePage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/game"
            element={
              <PrivateRoute route={'/game'}>
                <MultiGamePage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/constructor"
            element={
              <PrivateRoute route={'/constructor'}>
                <GameConstructor />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </main>
      <Settings />
      <Footer />
    </Router>
  );
};
