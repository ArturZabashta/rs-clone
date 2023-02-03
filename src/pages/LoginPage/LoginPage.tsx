import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './LogInPage.css'

const LogInPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="login-page">
      <h2 className="page-title">LOG IN</h2>
      <span>Email</span>
      <input></input>
      <span>Password</span>
      <input></input>
      <button onClick={() => navigate('/home')}>log in</button>
    </section>
  );
};
export default LogInPage;
