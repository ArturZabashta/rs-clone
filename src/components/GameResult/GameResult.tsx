import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { resetLevel, setIsLoosedGame } from '../../store/gameSlice';
import MyButton from '../MyButton/MyButton';

import '../../styles/GameResult.scss';

interface GameResultProps {
  score?: number;
}
const GameResult: React.FC<GameResultProps> = ({ score }) => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.ui);
  const { players } = useAppSelector((state) => state.game);
  const { isLoosedGame } = useAppSelector((state) => state.game);

  const setResetGameLevel = () => {
    dispatch(resetLevel());
    dispatch(setIsLoosedGame(false));
  };
  const page = window.location.pathname;
  return (
    <div className="game_result">
      {page === '/single-player' ? (
        <div className="winners_item" style={{ color: 'gold' }}>
          <h3>{`${username} win the SinglePlayer Game`}</h3>
          <h3>{`Score is ${score} points`}</h3>
        </div>
      ) : (
        ''
      )}
      {isLoosedGame ? <h2>{`You Lose :(`}</h2> : ''}
      {page === '/game' && !isLoosedGame ? (
        <div className="winners_list" style={{ textAlign: 'center' }}>
          <div className="winners_item" style={{ color: 'gold' }}>
            <h3>{`The Winner is ${players[0].name} `}</h3>
            <p>{`Score ${players[0].playerScore} points`}</p>
          </div>
          <div className="winners_item" style={{ color: 'silver' }}>
            <h3>{`The Second is ${players[1].name} `}</h3>
            <p>{`Score ${players[1].playerScore} points`}</p>
          </div>
          <div className="winners_item" style={{ color: 'sandybrown' }}>
            <h3>{`The Last is ${players[2].name} `}</h3>
            <p>{`Score ${players[2].playerScore} points`}</p>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="game_result__nav">
        <MyButton className={'winners_btn'} route={'/home'} onClickButton={setResetGameLevel}>
          Home
        </MyButton>
        <MyButton className={'winners_btn'} route={'/score'} onClickButton={setResetGameLevel}>
          Leader Board
        </MyButton>
      </div>
    </div>
  );
};
export default GameResult;
