import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './SignUpPage.css'

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="home-page">
      <h2 className="page-title">SIGN UP</h2>
      <h3>Create an account</h3>
      <button onClick={() => navigate('/home')}>sign up</button>
    </section>
  );
};
export default SignUpPage;
