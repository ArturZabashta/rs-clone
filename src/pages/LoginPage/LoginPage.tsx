import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import MyButton from '../../components/MyButton/MyButton';
import { useAppDispatch } from '../../hooks/userHooks';
import { setTopScores } from '../../store/gameSlice';
import { setCurrentPage, setIsLogin, setPopUpMsg } from '../../store/uiSlice';

type FormData = {
  username: string;
  password: string;
};

const LogInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>();

  const authorization = async (data: FormData) => {
    //e.preventDefault();
    setIsDisabled(true);
    const { username, password } = { ...data };
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
      dispatch(setUsername(username));
      sessionStorage.setItem('auth_token', token);
      dispatch(setCurrentPage('/home'));
      navigate('/home');
    } else {
      dispatch(setPopUpMsg(message));
    }
  };

  const onSubmit = handleSubmit((data: FormData) => {
    console.log('onSubmit data = ', data);
    authorization(data);
  });

  useEffect(() => {
    if (isDirty && isValid) setIsDisabled(false);
  }, [isDirty, isValid]);

  return (
    <section className="login-page">
      <form onSubmit={onSubmit}>
        <span>Username</span>
        <input
          type={'text'}
          id="username"
          {...register('username', {
            required: 'The field is required',
            minLength: {
              value: 5,
              message: 'Minimum 5 characters',
            },
            pattern: /[a-zA-Z0-9]{5,}/,
          })}
        />
        {errors.username && (
          <span className={'email-error'}>
            {errors.username.message ||
              'Input your Email. Example user@mail.com. You can use latin characters and digitals'}
          </span>
        )}
        <span>Password</span>
        <input
          type={'password'}
          {...register('password', {
            required: 'The field is required',
            minLength: {
              value: 5,
              message: 'Minimum 5 characters',
            },
            pattern: /[\d\wА-я]{5,}/,
          })}
        />
        {errors.password && (
          <span className={'password-error'}>
            {errors.password.message || 'Input your Password. You can use latin characters and digitals'}
          </span>
        )}
        <MyButton className="login_btn btn_blue" onClickButton={onSubmit} isDisabled={isDisabled}>
          log in
        </MyButton>
      </form>
    </section>
  );
};
export default LogInPage;

// =======
// const LogInPage: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isDisabled, setIsDisabled] = useState(true);

//   const submitHandler = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('https://rsclone-server.onrender.com/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     });
//     const { message, token, topScores } = await res.json();
//     if (res.status === 200) {
//       dispatch(setTopScores(topScores));
//       dispatch(setIsLogin(true));
//       sessionStorage.setItem('auth_token', token);
//       //TODO move to home page
//     } else {
//       dispatch(setPopUpMsg(message));
//     }
//     setUsername('');
//     setPassword('');
//   };

//   const formValidator = (...args: string[]) => {
//     return !args.every((item) => item.length >= 4 && !item.includes(' '));
//   };

//   useEffect(() => {
//     setIsDisabled(formValidator(username, password));
//   }, [username, password]);

//   return (
//     <section className="login-page">
//       <form onSubmit={(e) => submitHandler(e)}>
//         <span>Username</span>
//         <input type={'text'} onChange={(e) => setUsername(e.target.value)} value={username}></input>
//         <span>Password</span>
//         <input type={'password'} onChange={(e) => setPassword(e.target.value)} value={password}></input>
//         <MyButton className="login_btn btn_blue" disabled={isDisabled}>
// >>>>>>> 0d3326cce614931b0f695e9487e497c465bb4853
