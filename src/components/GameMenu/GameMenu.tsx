import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import MyButton from '../../components/MyButton/MyButton';
import { useAppSelector, useOnClickOutside } from '../../hooks/userHooks';

import Hamburger from './Hamburger';

import '../../styles/index.scss';

const StyledMenu = styled.div<{ menuOn: boolean }>`
  display: ${({ menuOn }) => (menuOn ? 'flex' : 'none')};
  transform: ${({ menuOn }) => (menuOn ? 'translateX(0)' : 'translateX(-100%)')};
`;

const GameMenu: React.FC = () => {
  const { isMenuOn } = useAppSelector((state) => state.ui);
  const [menuOn, setMenuOn] = useState<boolean>(false);

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
        <MyButton className="menu_btn multi-player_btn" route="/multi-player" onClickButton={() => menuHandler()}>
          MultiPlayer
        </MyButton>
        <MyButton className="menu_btn leader-board_btn" route="/score" onClickButton={() => menuHandler()}>
          Leader Board
        </MyButton>
      </StyledMenu>
      <Hamburger menuOn={menuOn} setMenuOn={setMenuOn} />
    </div>
  );
};
export default GameMenu;
