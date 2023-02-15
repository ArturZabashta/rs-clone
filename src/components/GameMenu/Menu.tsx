import React from 'react';

import MyButton from '../../components/MyButton/MyButton';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setIsSettingsOn } from '../../store/uiSlice';

import { ReactComponent as ContactSvg } from './assets/contact.svg';
import { ReactComponent as SettingsSvg } from './assets/settings.svg';

import '../../styles/index.scss';

interface IMenuProps {
  menuHandler(): void;
}

const Menu: React.FC<IMenuProps> = ({ menuHandler }) => {
  const { isLogin, isSettingsOn } = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();

  const settingsHandler = () => {
    dispatch(setIsSettingsOn(!isSettingsOn));
  };

  return (
    <div>
      <MyButton className="menu_btn single-player_btn" route="/single-player" onClickButton={() => menuHandler()}>
        SinglePlayer
      </MyButton>
      <fieldset className={isLogin ? 'menu_login-block__able' : 'menu_login-block'}>
        <legend className={isLogin ? 'menu_disclaimer__hide' : 'menu_disclaimer'}>For registered users only</legend>
        <MyButton
          className="menu_btn multi-player_btn"
          route="/multi-player"
          isDisabled={!isLogin}
          onClickButton={() => menuHandler()}
        >
          MultiPlayer
        </MyButton>
        <MyButton
          className="menu_btn leader-board_btn"
          route="/score"
          isDisabled={!isLogin}
          onClickButton={() => menuHandler()}
        >
          Leader Board
        </MyButton>
      </fieldset>
      <div className="menu_options options">
        <div className="options_item">
          <div className="options_logo">
            <ContactSvg />
          </div>
          <div className="options_title">contact us</div>
        </div>
        <div className="options_item" onClick={() => settingsHandler()}>
          <div className="options_logo">
            <SettingsSvg />
          </div>
          <div className="options_title">settings</div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
