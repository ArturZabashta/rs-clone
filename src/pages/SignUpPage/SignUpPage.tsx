import React, { useEffect, useState } from 'react';

import MyButton from '../../components/MyButton/MyButton';
import { useAppDispatch } from '../../hooks/userHooks';
import { setPopUpMsg } from '../../store/uiSlice';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useAppDispatch();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('https://rsclone-server.onrender.com/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const { message } = await res.json();
    dispatch(setPopUpMsg(message));
    if (res.status !== 201) {
      //TODO move to loginPage
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
    <section className="signup-page">
      <form onSubmit={(e) => submitHandler(e)}>
        <h3 style={{ alignSelf: 'center' }}>Create an account</h3>
        <span>Username</span>
        <input type={'text'} value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <span>Password</span>
        <input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <MyButton className="signup_btn btn_blue" disabled={isDisabled}>
          sign up
        </MyButton>
      </form>
    </section>
  );
};
export default SignUpPage;
