import React from 'react';

import MyButton from '../../components/MyButton/MyButton';
import { useAppSelector } from '../../hooks/userHooks';

const ErrorPage: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.ui);
  return (
    <section className="error-page">
      <h2 className="error-page_text error-title"># 404</h2>
      <h3 className="error-page_title">Page not found</h3>
      <p className="f-center text-on-video">Hmm, this page seems to be missing</p>
      <MyButton className={'login_btn'} route={isLogin ? '/home' : '/'}>
        {isLogin ? 'Home' : 'Welcome Page'}
      </MyButton>
    </section>
  );
};
export default ErrorPage;
