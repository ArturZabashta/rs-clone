import React from 'react';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';

import MyButton from '../../components/MyButton/MyButton';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import soundStartGame from '../../sounds/gameOn_sound.mp3';
import { setTotalScore } from '../../store/gameSlice';
import { setIsLogin, setIsSettingsOn, setUsername, setUserToken } from '../../store/uiSlice';

import { ReactComponent as ContactSvg } from './assets/contact.svg';
import { ReactComponent as SettingsSvg } from './assets/settings.svg';

interface IMenuProps {
  menuHandler?(): void;
}

const Menu: React.FC<IMenuProps> = ({ menuHandler }) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const { isLogin, isSettingsOn } = useAppSelector((state) => state.ui);
  const { isSoundOn, effectsVolume } = useAppSelector((state) => state.game);

  const settingsHandler = () => {
    dispatch(setIsSettingsOn(!isSettingsOn));
  };
  const gameHandler = () => {
    menuHandler && menuHandler();
    isSoundOn && playGameStart();
  };
  const noGameHandler = () => {
    menuHandler && menuHandler();
  };
  const [playGameStart] = useSound(soundStartGame, { volume: effectsVolume });

  const setLogOut = () => {
    dispatch(setTotalScore(0));
    dispatch(setIsLogin(false));
    dispatch(setUsername(''));
    dispatch(setUserToken(''));
    sessionStorage.removeItem('userData');
  };

  return (
    <div>
      <MyButton className="menu_btn single-player_btn" route="/single-player" onClickButton={gameHandler}>
        {t('menu.singleplayer')}
      </MyButton>
      <fieldset className={isLogin ? 'menu_login-block__able' : 'menu_login-block'}>
        <legend className={isLogin ? 'menu_disclaimer__hide' : 'menu_disclaimer'}>{t('menu.registered_only')}</legend>
        <MyButton
          className="menu_btn multi-player_btn"
          route="/multi-player"
          isDisabled={!isLogin}
          onClickButton={gameHandler}
        >
          {t('menu.multiplayer')}
        </MyButton>
        <MyButton
          className="menu_btn leader-board_btn"
          route="/constructor"
          isDisabled={!isLogin}
          onClickButton={noGameHandler}
        >
          {t('menu.constructor')}
        </MyButton>
        <MyButton
          className="menu_btn leader-board_btn"
          route="/score"
          isDisabled={!isLogin}
          onClickButton={noGameHandler}
        >
          {t('menu.leader_board')}
        </MyButton>
        <MyButton className="menu_btn single-player_btn" route="/" onClickButton={setLogOut} isDisabled={!isLogin}>
          {t('menu.log_out')}
        </MyButton>
      </fieldset>
      <div className="menu_options options">
        <div className="options_item">
          <div className="options_logo">
            <ContactSvg />
          </div>
          <div className="options_title">{t('menu.contact_us')}</div>
        </div>
        <div className="options_item settings__button" onClick={settingsHandler}>
          <div className="options_logo">
            <SettingsSvg />
          </div>
          <div className="options_title">{t('menu.settings')}</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
