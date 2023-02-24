import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useAppSelector, useOnClickOutside } from '../../hooks/userHooks';

import Hamburger from './Hamburger';
import Menu from './Menu';

const StyledMenu = styled.div<{ menuOn: boolean }>`
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
    <div ref={node} className={menuOn ? 'menu__container_open' : ''}>
      <StyledMenu className="menu" menuOn={menuOn}>
        <Menu menuHandler={menuHandler} />
      </StyledMenu>
      <Hamburger menuOn={menuOn} setMenuOn={setMenuOn} />
    </div>
  );
};
export default GameMenu;
