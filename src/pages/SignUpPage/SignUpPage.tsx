import React from 'react';

import MyButton from '../../components/MyButton/MyButton';

import '../../styles/SingUpPage.scss';

const SignUpPage: React.FC = () => {
  return (
    <section className="signup-page">
      <h3>Create an account</h3>
      <form>
        <span>Email</span>
        <input></input>
        <MyButton className="signup_btn btn_blue" route="/home">
          sign up
        </MyButton>
      </form>
    </section>
  );
};
export default SignUpPage;
