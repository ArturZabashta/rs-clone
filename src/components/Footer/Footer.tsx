import React from 'react';
import { useTranslation } from 'react-i18next';

// import { ReactComponent as LogoSvg } from './HeaderLogo/logo.svg';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer_developers">
        {t('footer.developers')}{' '}
        <a href="https://github.com/ArturZabashta" className="f-black">
          ArturZabashta
        </a>
        ,{' '}
        <a href="https://github.com/shish-ko" className="f-black">
          shish-ko
        </a>
        ,{' '}
        <a href="https://github.com/YuliyaBondar" className="f-black">
          YuliyaBondar
        </a>
      </div>
      <div className="footer_year">2023</div>
      <div className="footer_school">
        <a className="rss-link" href="https://rs.school/js/">
          <img
            src="https://raw.githubusercontent.com/YuliyaBondar/christmas-data/main/assets/svg/rss.svg"
            alt="rs_school_js"
            width="95"
          />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
