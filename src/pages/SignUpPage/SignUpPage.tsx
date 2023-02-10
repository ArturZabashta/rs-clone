import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import MyButton from '../../components/MyButton/MyButton';
import { useAppDispatch } from '../../hooks/userHooks';
import { setCurrentPage, setPopUpMsg } from '../../store/uiSlice';

import '../../styles/SignUpPage.scss';

type FormData = {
  username: string;
  password: string;
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>();

  const registration = async (data: FormData) => {
    //e.preventDefault();
    setIsDisabled(true);
    const { username, password } = { ...data };
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

    if (res.status === 201) {
      dispatch(setCurrentPage('/login'));
      navigate('/login');
    } else {
      if (res.status === 400) {
        dispatch(setCurrentPage('/login'));
        navigate('/login');
      }
    }
  };

  const onSubmit = handleSubmit((data: FormData) => {
    console.log('onSubmit data = ', data);
    registration(data);
  });

  useEffect(() => {
    if (isDirty && isValid) setIsDisabled(false);
  }, [isDirty, isValid]);

  return (
    <section className="signup-page">
      <h3>Create an account</h3>

      <form onSubmit={onSubmit}>
        <span>User name</span>
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
        <MyButton className="signup_btn btn_blue" onClickButton={onSubmit} isDisabled={isDisabled}>
          sign up
        </MyButton>
      </form>
    </section>
  );
};

export default SignUpPage;

// =======

// import MyButton from '../../components/MyButton/MyButton';
// import { useAppDispatch } from '../../hooks/userHooks';
// import { setPopUpMsg } from '../../store/uiSlice';

// import '../../styles/SingUpPage.scss';

// const SignUpPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isDisabled, setIsDisabled] = useState(true);

//   const dispatch = useAppDispatch();

//   const submitHandler = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('https://rsclone-server.onrender.com/auth/registration', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     });
//     const { message } = await res.json();
//     dispatch(setPopUpMsg(message));
//     if (res.status !== 201) {
//       //TODO move to loginPage
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
// >>>>>>> 0d3326cce614931b0f695e9487e497c465bb4853

// =======
//       <form onSubmit={(e) => submitHandler(e)}>
//         <span>Username</span>
//         <input type={'text'} value={username} onChange={(e) => setUsername(e.target.value)}></input>
//         <span>Password</span>
//         <input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}></input>
//         <MyButton className="signup_btn btn_blue" disabled={isDisabled} route="/home">
//           sign up
//         </MyButton>
//       </form>
// >>>>>>> 0d3326cce614931b0f695e9487e497c465bb4853
