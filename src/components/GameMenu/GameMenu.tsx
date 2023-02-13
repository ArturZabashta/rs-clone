import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import MyButton from '../../components/MyButton/MyButton';
import { useAppDispatch, useAppSelector, useOnClickOutside } from '../../hooks/userHooks';
import { setIsSettingsOn } from '../../store/uiSlice';

import { ReactComponent as ContactSvg } from './assets/contact.svg';
import { ReactComponent as SettingsSvg } from './assets/settings.svg';
import Hamburger from './Hamburger';

import '../../styles/index.scss';

const StyledMenu = styled.div<{ menuOn: boolean }>`
  transform: ${({ menuOn }) => (menuOn ? 'translateX(0)' : 'translateX(-100%)')};
`;

const GameMenu: React.FC = () => {
  const { isMenuOn, isLogin, isSettingsOn } = useAppSelector((state) => state.ui);
  const [menuOn, setMenuOn] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const settingsHandler = () => {
    dispatch(setIsSettingsOn(!isSettingsOn));
  };

  const menuHandler = () => {
    setMenuOn(false);
  };

  useEffect(() => {
    setMenuOn(isMenuOn);
  }, [isMenuOn]);

  const node = useRef<HTMLDivElement>(null);
  useOnClickOutside(node, () => setMenuOn(false));

  return (
    <div ref={node}>
      <StyledMenu className="menu" menuOn={menuOn}>
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
      </StyledMenu>
      <Hamburger menuOn={menuOn} setMenuOn={setMenuOn} />
    </div>
  );
};
export default GameMenu;
