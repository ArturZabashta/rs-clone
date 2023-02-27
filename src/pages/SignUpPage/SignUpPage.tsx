import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MyButton from '../../components/MyButton/MyButton';
import { HOST_NAME } from '../../constants/constants';
import { useAppDispatch } from '../../hooks/userHooks';
import { setCurrentPage, setPopUpMsg } from '../../store/uiSlice';

type FormData = {
  username: string;
  password: string;
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
    const res = await fetch(HOST_NAME + '/auth/registration', {
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
      <h3>{t('authorization.create_account')}</h3>

      <form onSubmit={onSubmit}>
        <span>{t('authorization.username')}</span>
        <input
          type={'text'}
          id="username"
          {...register('username', {
            required: `${t('authorization.required_field')}`,
            minLength: {
              value: 5,
              message: `${t('authorization.length_msg')}`,
            },
            pattern: /[a-zA-Z0-9]{5,}/,
          })}
        />
        {errors.username && (
          <span className={'username-error'}>{errors.username.message || `${t('authorization.username_msg')}`}</span>
        )}
        <span>{t('authorization.password')}</span>
        <input
          type={'password'}
          {...register('password', {
            required: `${t('authorization.required_field')}`,
            minLength: {
              value: 5,
              message: `${t('authorization.length_msg')}`,
            },
            pattern: /[\d\wА-я]{5,}/,
          })}
        />
        {errors.password && (
          <span className={'password-error'}>{errors.password.message || `${t('authorization.password_msg')}`}</span>
        )}
        <MyButton className="signup_btn btn_blue" onClickButton={onSubmit} isDisabled={isDisabled}>
          {t('authorization.sign_up')}
        </MyButton>
      </form>
    </section>
  );
};

export default SignUpPage;
