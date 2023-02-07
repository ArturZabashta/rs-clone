import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import MyButton from '../../components/MyButton/MyButton';
import { useAppDispatch } from '../../hooks/userHooks';
import { setCurrentPage } from '../../store/uiSlice';

import '../../styles/LoginPage.scss';

type FormData = {
  email: string;
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

  const onSubmit = handleSubmit((data: FormData) => {
    console.log('onSubmit data = ', data);
    dispatch(setCurrentPage('/home'));
    navigate('/home');
    setIsDisabled(true);
  });

  useEffect(() => {
    if (isDirty && isValid) setIsDisabled(false);
  }, [isDirty, isValid]);

  return (
    <section className="login-page">
      <form onSubmit={onSubmit}>
        <span>Email</span>
        <input
          type={'email'}
          id="email"
          {...register('email', {
            required: 'The field is required',
            minLength: {
              value: 5,
              message: 'Minimum 5 characters',
            },
            pattern: /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}/,
          })}
        />
        {errors.email && (
          <span className={'email-error'}>
            {errors.email.message ||
              'Input your Email. Example user@mail.com. You can use latin characters and digitals'}
          </span>
        )}
        <span>Password</span>
        <input
          type={'password'}
          {...register('password', {
            required: 'The field is required',
            minLength: {
              value: 7,
              message: 'Minimum 7 characters',
            },
            pattern: /[\d\wА-я]{7,}/,
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
      <MyButton className="change_authorization f-bold" route={'/signup'}>
        Create an account
      </MyButton>
    </section>
  );
};
export default LogInPage;
