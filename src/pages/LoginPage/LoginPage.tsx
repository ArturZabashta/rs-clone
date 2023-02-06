import React from 'react';

import MyButton from '../../components/MyButton/MyButton';

import '../../styles/LoginPage.scss';
const LogInPage: React.FC = () => {
  return (
    <section className="login-page">
      <form>
        <span>Email</span>
        <input type={'email'}></input>
        <span>Password</span>
        <input type={'password'}></input>
        <MyButton className="login_btn btn_blue" route="/home">
          log in
        </MyButton>
      </form>
    </section>
  );
};
export default LogInPage;
