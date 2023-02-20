import React from 'react';

import MyButton from '../../components/MyButton/MyButton';
import { useAppSelector } from '../../hooks/userHooks';

const ErrorPage: React.FC = () => {
  const { isLogin } = useAppSelector((state) => state.ui);
  return (
    <section
      className="error-page"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}
    >
      <h3 className="error-page_title">Error Page</h3>
      <h2 className="error-page_text"># 404</h2>
      <MyButton className={'login_btn'} route={isLogin ? '/home' : '/'}>
        {isLogin ? 'Home' : 'Welcome Page'}
      </MyButton>
      <p className="f-center text-on-video">Hmm, this page seems to be missing</p>
    </section>
  );
};
export default ErrorPage;
