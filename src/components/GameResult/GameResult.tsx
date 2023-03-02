import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { resetLevel, setIsLoosedGame } from '../../store/gameSlice';
import MyButton from '../MyButton/MyButton';

interface GameResultProps {
  score?: number;
}
const GameResult: React.FC<GameResultProps> = ({ score }) => {
  const dispatch = useAppDispatch();
  const { username, language } = useAppSelector((state) => state.ui);
  const { players } = useAppSelector((state) => state.game);
  const { isLoosedGame } = useAppSelector((state) => state.game);
  const { t } = useTranslation();

  const setResetGameLevel = () => {
    dispatch(resetLevel());
    dispatch(setIsLoosedGame(false));
  };
  const page = window.location.pathname;
  return (
    <div className="game_result">
      {page === '/single-player' ? (
        <div className="winners_item" style={{ color: 'gold' }}>
          <h3>{t('results.winner_name', { value: username ? username : language === 'en' ? 'Player' : 'Игрок' })}</h3>
          <h3>{t('results.winner_score', { value: score })}</h3>
        </div>
      ) : (
        ''
      )}
      {isLoosedGame ? <h2>{`You Lose :(`}</h2> : ''}
      {page === '/game' && !isLoosedGame ? (
        <div className="winners_list" style={{ textAlign: 'center' }}>
          <div className="winners_item" style={{ color: 'gold' }}>
            <h3>{t('results.firs_winner_name', { value: players[0].name })}</h3>
            <p>{t('results.winner_score', { value: players[0].playerScore })}</p>
          </div>
          <div className="winners_item" style={{ color: 'silver' }}>
            <h3>{t('results.second_winner_name', { value: players[1].name })}</h3>
            <p>{t('results.winner_score', { value: players[1].playerScore })}</p>
          </div>
          <div className="winners_item" style={{ color: 'sandybrown' }}>
            <h3>{t('results.third_winner_name', { value: players[2].name })}</h3>
            <p>{t('results.winner_score', { value: players[2].playerScore })}</p>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="game_result__nav">
        <MyButton className={'winners_btn'} route={'/home'} onClickButton={setResetGameLevel}>
          {t('results.home')}
        </MyButton>
        <MyButton className={'winners_btn'} route={'/score'} onClickButton={setResetGameLevel}>
          {t('menu.leader_board')}
        </MyButton>
      </div>
    </div>
  );
};
export default GameResult;
