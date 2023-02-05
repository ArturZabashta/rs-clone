import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/LoginPage.scss';

const LogInPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="login-page">
      <h2 className="page-title">LOG IN</h2>
      <form>
        <span>Email</span>
        <input type={'email'}></input>
        <span>Password</span>
        <input type={'password'}></input>
        <button onClick={() => navigate('/home')} className="btn_blue">
          log in
        </button>
      </form>
    </section>
  );
};
export default LogInPage;
