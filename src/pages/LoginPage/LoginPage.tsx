import React from 'react';

import MyButton from '../../components/MyButton/MyButton';

const LogInPage: React.FC = () => {
  return (
    <section className="login-page">
      <span>Email</span>
      <input></input>
      <span>Password</span>
      <input></input>
      <MyButton className="login_btn" route="/home">
        log in
      </MyButton>
    </section>
  );
};
export default LogInPage;
