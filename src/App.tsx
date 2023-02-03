import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import LogInPage from './pages/LoginPage/LoginPage';
import MultiPlayer from './pages/MultiPlayer/MultiPlayer';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SinglePlayer from './pages/SinglePlayer/SinglePlayer';
import WelcomePage from './pages/WelcomePage/WelcomePage';

import './styles/App.scss';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/login" element={<LogInPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/single-player" element={<SinglePlayer />}></Route>
        <Route path="/multi-player" element={<MultiPlayer />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </Router>
  );
};
