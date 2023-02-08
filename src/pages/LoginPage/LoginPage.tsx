import React, { useEffect, useState } from 'react';

import MyButton from '../../components/MyButton/MyButton';
import { useAppDispatch } from '../../hooks/userHooks';
import { setIsLogin, setPopUpMsg, setTopScores } from '../../store/uiSlice';

import '../../styles/LoginPage.scss';
const LogInPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('https://rsclone-server.onrender.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const { message, token, topScores } = await res.json();
    if (res.status === 200) {
      dispatch(setTopScores(topScores));
      dispatch(setIsLogin(true));
      sessionStorage.setItem('auth_token', token);
      //TODO move to home page
    } else {
      dispatch(setPopUpMsg(message));
    }
    setUsername('');
    setPassword('');
  };

  const formValidator = (...args: string[]) => {
    return !args.every((item) => item.length >= 4 && !item.includes(' '));
  };

  useEffect(() => {
    setIsDisabled(formValidator(username, password));
  }, [username, password]);

  return (
    <section className="login-page">
      <form onSubmit={(e) => submitHandler(e)}>
        <span>Username</span>
        <input type={'text'} onChange={(e) => setUsername(e.target.value)} value={username}></input>
        <span>Password</span>
        <input type={'password'} onChange={(e) => setPassword(e.target.value)} value={password}></input>
        <MyButton className="login_btn btn_blue" disabled={isDisabled}>
          log in
        </MyButton>
      </form>
    </section>
  );
};
export default LogInPage;
