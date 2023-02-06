import React from 'react';

import MyButton from '../../components/MyButton/MyButton';

const SignUpPage: React.FC = () => {
  return (
    <section className="signup-page">
      <h3>Create an account</h3>
      <span>Email</span>
      <input></input>
      <MyButton className="signup_btn" route="/home">
        sign up
      </MyButton>
    </section>
  );
};
export default SignUpPage;
