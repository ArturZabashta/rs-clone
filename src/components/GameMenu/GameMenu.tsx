import React, { useEffect, useState } from 'react';

import MyButton from '../../components/MyButton/MyButton';
import { useAppSelector } from '../../hooks/userHooks';

interface GameMenuProps {
  menuOnProp: boolean;
  onClickClose: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ menuOnProp, onClickClose }) => {
  const { isMenuOn } = useAppSelector((state) => state.ui);
  const [menuOn, setMenuOn] = useState(menuOnProp);

  const menuHandler = () => {
    onClickClose();
  };

  useEffect(() => {
    setMenuOn(isMenuOn);
  }, [isMenuOn]);

  return (
    <div
      className="menu"
      style={menuOn ? { display: 'block', background: 'green' } : { display: 'none', background: 'red' }}
    >
      <MyButton className="single-player_btn" route="/single-player" onClickButton={menuHandler}>
        SinglePlayer
      </MyButton>
      <MyButton className="single-player_btn" route="/multi-player" onClickButton={menuHandler}>
        MultiPlayer
      </MyButton>
      <MyButton className="single-player_btn" route="/score" onClickButton={menuHandler}>
        Leader Board
      </MyButton>
      <MyButton className="close-menu_btn" onClickButton={menuHandler}>
        Close Menu
      </MyButton>
    </div>
  );
};
export default GameMenu;
