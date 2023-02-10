import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/userHooks';
import { setCurrentPage } from '../../store/uiSlice';
import { GameDataTransfer } from '../../types/gameInterface';

interface GameButtonProps {
  children: string;
  className: string;
  route?: string;
  isDisabled?: boolean;
  onClickButton?: () => GameDataTransfer;
}
const GameButton: React.FC<GameButtonProps> = ({ children, className, route, isDisabled, onClickButton }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    if (route) {
      dispatch(setCurrentPage(route));
      navigate(route);
    }
    if (onClickButton) onClickButton();
  };

  return (
    <button className={className} disabled={isDisabled} onClick={() => handleClick()}>
      {children}
    </button>
  );
};
export default GameButton;
