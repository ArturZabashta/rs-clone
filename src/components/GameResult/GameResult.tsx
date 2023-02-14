import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { resetLevel, setIsLoosedGame } from '../../store/gameSlice';
import MyButton from '../MyButton/MyButton';

interface GameResultProps {
  score?: number;
}
const GameResult: React.FC<GameResultProps> = () => {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.game);
  const { isLoosedGame } = useAppSelector((state) => state.game);

  const setResetGameLevel = () => {
    dispatch(resetLevel());
    dispatch(setIsLoosedGame(false));
  };

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
      {isLoosedGame ? (
        <h2>{`You Lose :(`}</h2>
      ) : (
        <div className="winners_list" style={{ textAlign: 'center' }}>
          <div className="winners_item" style={{ color: 'gold' }}>
            <h3>{`The Winner is ${players[0].name} `}</h3>
            <p>{`Score is ${players[0].playerScore} `}</p>
          </div>
          <div className="winners_item" style={{ color: 'silver' }}>
            <h3>{`The Second is ${players[1].name} `}</h3>
            <p>{`Score is ${players[1].playerScore} `}</p>
          </div>
          <div className="winners_item" style={{ color: 'sandybrown' }}>
            <h3>{`The Last is ${players[2].name} `}</h3>
            <p>{`Score is ${players[2].playerScore} `}</p>
          </div>
        </div>
      )}
      <div>
        <MyButton className={'settings_btn'} route={'/home'} onClickButton={setResetGameLevel}>
          Home
        </MyButton>
        <MyButton className={'settings_btn'} route={'/score'} onClickButton={setResetGameLevel}>
          Leader Board
        </MyButton>
      </div>
    </div>
  );
};
export default GameResult;
