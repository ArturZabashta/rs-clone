import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/userHooks';
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
export default MyButton;
