import React from 'react';
import { useTranslation } from 'react-i18next';

import MyButton from '../../components/MyButton/MyButton';
import { useAppSelector } from '../../hooks/userHooks';

const ErrorPage: React.FC = () => {
  const { t } = useTranslation();
  const { isLogin } = useAppSelector((state) => state.ui);
  return (
    <section className="error-page">
      <h2 className="error-page_text error-title">{t('error.error_title')}</h2>
      <h3 className="error-page_title">{t('error.error_subtitle')}</h3>
      <p className="f-center text-on-video">{t('error.error_text')}</p>
      <MyButton className={'login_btn'} route={isLogin ? '/home' : '/'}>
        {isLogin ? t('error.error_home_btn') : t('error.error_welcome_btn')}
      </MyButton>
    </section>
  );
};
export default ErrorPage;
