import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

import MyButton from '../../components/MyButton/MyButton';
import { HOST_NAME } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import soundLogIn from '../../sounds/logIn_sound.mp3';
import { setTotalScore } from '../../store/gameSlice';
import { setCurrentPage, setIsLogin, setPopUpMsg, setUsername, setUserToken } from '../../store/uiSlice';
import { LSData } from '../../types/uiInterface';

type FormData = {
  username: string;
  password: string;
};

const LogInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isDisabled, setIsDisabled] = useState(true);
  const { isSoundOn, effectsVolume } = useAppSelector((state) => state.game);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>();

  const authorization = async (data: FormData) => {
    //e.preventDefault();
    setIsDisabled(true);
    const { username, password } = { ...data };
    const res = await fetch(HOST_NAME + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const { message, token, totalScore } = await res.json();
    if (res.status === 200) {
      const storageData: LSData = {
        username: username,
        token: token,
        totalScore: totalScore,
      };
      sessionStorage.setItem('userData', JSON.stringify(storageData));

      dispatch(setTotalScore(totalScore));

      dispatch(setIsLogin(true));
      dispatch(setUsername(username));
      dispatch(setUserToken(token));
      dispatch(setCurrentPage('/home'));
      navigate('/home');
    } else {
      dispatch(setPopUpMsg(message));
    }
  };

  const [playLogIn] = useSound(soundLogIn, { volume: effectsVolume });

  const onSubmit = handleSubmit((data: FormData) => {
    // console.log('onSubmit data = ', data);
    authorization(data);
    isSoundOn && playLogIn();
  });

  useEffect(() => {
    if (isDirty && isValid) setIsDisabled(false);
  }, [isDirty, isValid]);

  return (
    <section className="login-page">
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
        <MyButton className="login_btn btn_blue" onClickButton={onSubmit} isDisabled={isDisabled}>
          {t('authorization.log_in')}
        </MyButton>
      </form>
    </section>
  );
};
export default LogInPage;
