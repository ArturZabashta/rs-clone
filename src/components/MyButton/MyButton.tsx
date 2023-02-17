import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import soundMyButton from '../../sounds/myButton_sound.mp3';
import { setCurrentPage } from '../../store/uiSlice';

interface MyButtonProps {
  children: string;
  className: string;
  route?: string;
  isDisabled?: boolean;
  onClickButton?: () => void;
}
const MyButton: React.FC<MyButtonProps> = ({ children, className, route, isDisabled, onClickButton }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSoundOn, effectsVolume } = useAppSelector((state) => state.game);
  const [playMyButton] = useSound(soundMyButton, { volume: effectsVolume });
  const handleClick = () => {
    if (route) {
      dispatch(setCurrentPage(route));
      navigate(route);
    }
    if (onClickButton) onClickButton();

    isSoundOn && playMyButton();
  };

  return (
    <button className={className} disabled={isDisabled} onClick={() => handleClick()}>
      {children}
    </button>
  );
};
export default MyButton;
