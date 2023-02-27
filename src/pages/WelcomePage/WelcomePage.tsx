import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';
import MyButton from '../../components/MyButton/MyButton';

const WelcomePage: React.FC = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <section className="welcome-page">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <BackgroundVideo />
      )}
      <div className="container">
        <h2 className="page-title">{t('welcome.welcome_title')}</h2>
        <p className="text-on-video h-mb70">{t('welcome.welcome_text')}</p>
        <MyButton className="back_btn btn_blue h-m0auto" route="/signup">
          {t('welcome.welcome_play')}
        </MyButton>
      </div>
    </section>
  );
};
export default WelcomePage;
