import React from 'react';

interface GameButtonProps {
  children: string;
  className: string;
  onClickButton?: () => void;
}
const GameButton: React.FC<GameButtonProps> = ({ children, className, onClickButton }) => {
  const handleClick = () => {
    if (onClickButton) onClickButton();
  };

  return (
    <button className={className} onClick={() => handleClick()}>
      {children}
    </button>
  );
};
export default GameButton;
