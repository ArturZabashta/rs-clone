import React from 'react';

import MyButton from '../MyButton/MyButton';
interface GameResultProps {
  score: number;
}
const GameResult: React.FC<GameResultProps> = ({ score }) => {
  return (
    <div
      className={'game_result'}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        zIndex: '10',
        top: '0',
        left: '0',
      }}
    >
      <p>{`Your Score is ${score}`}</p>
      <div>
        <MyButton className={'settings_btn'} route={'/home'}>
          Home
        </MyButton>
        <MyButton className={'settings_btn'} route={'/score'}>
          Leader Board
        </MyButton>
      </div>
    </div>
  );
};
export default GameResult;
