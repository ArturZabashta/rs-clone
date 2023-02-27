import React, { useCallback, useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';

import CustomCountdown from '../../../components/CustomCountdown/CustomCountdown';
import GameMusic from '../../../components/GameMusic/GameMusic';
import GameResult from '../../../components/GameResult/GameResult';
import KilledPlayers from '../../../components/KilledPlayers/KilledPlayers';
import MultiGameMap from '../../../components/Map/MultiGameMap';
import MyButton from '../../../components/MyButton/MyButton';
import { useAppDispatch, useAppSelector } from '../../../hooks/userHooks';
import soundNextQuestion from '../../../sounds/nextQuestion_sound.mp3';
import {
  resetLevel,
  resetPlayersTeam,
  resetRound,
  setLevel,
  setMissedAnswer,
  setRound,
  setSortPlayersTeam,
  setTotalScore,
} from '../../../store/gameSlice';
import { IPlayer } from '../../../types/gameInterface';
import { getDiapasonRandomNum, sendUserScore } from '../../../utils/utilities';

const MultiGamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { players, level, round, isLoosedGame, isSoundOn, effectsVolume, gamesArray, currentGameId } = useAppSelector(
    (state) => state.game
  );
  const { currentPage } = useAppSelector((state) => state.ui);

  const { t } = useTranslation();

  const [question, setQuestion] = useState<number>(
    getDiapasonRandomNum(0, gamesArray[currentGameId].gameSet.length - 1)
  );
  const [questionArray, setQuestionArray] = useState<number[]>([question]);

  const [isAnswered, setIsAnswered] = useState(false);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const [playNextQuestion] = useSound(soundNextQuestion, { volume: effectsVolume });

  //  Следующий произвольный вопрос из списка
  const setNextQuestion = () => {
    let nextQuestion: number;

    if (questionArray.length < 9) {
      do {
        nextQuestion = getDiapasonRandomNum(0, gamesArray[currentGameId].gameSet.length - 1);
      } while (questionArray.indexOf(nextQuestion) !== -1);

      setQuestion(nextQuestion);
      setQuestionArray([...questionArray, nextQuestion]);
      setIsAnswered(false);
      dispatch(setLevel());
    }

    if (level === 3 && round < 3) {
      setIsRoundFinished(true);
      dispatch(setRound());
      dispatch(resetLevel());
    }
    isSoundOn && playNextQuestion();
    dispatch(setMissedAnswer(false));
  };

  const onAnswerHandler = () => {
    setSorted();
    setIsAnswered(true);
    if (questionArray.length === 9) {
      setTimeout(() => {
        setIsGameFinished(true);
        const score = players.find((item) => item.id === 0)?.playerScore as number;
        sendUserScore(score, true).then((res) => res && dispatch(setTotalScore(res)));
        dispatch(resetLevel());
        dispatch(resetRound());
      }, 3500);
    }
  };

  function setSorted() {
    setTimeout(
      () => {
        dispatch(setSortPlayersTeam());
      },
      level === 3 ? 0 : 3500
    );
  }

  const continueHandler = () => {
    setSorted();
    setIsRoundFinished(false);
  };

  const onComplete = () => {
    console.log('missedAnswer!!!!');
    dispatch(setMissedAnswer(true));
  };

  // При  Unmount компонента
  useEffect(() => {
    return () => {
      dispatch(resetPlayersTeam());
      dispatch(resetLevel());
      dispatch(resetRound());
    };
  }, []);

  return (
    <section className="multigame">
      {isGameFinished || isLoosedGame ? '' : <GameMusic />}
      <p className="multigame_title">{t('multiplayer.title_round', { round: round, level: level })}</p>
      {isAnswered || isLoosedGame || isGameFinished || isRoundFinished ? (
        ''
      ) : (
        <Countdown date={Date.now() + 20000} autoStart={true} renderer={CustomCountdown} onComplete={onComplete} />
      )}

      <div className="multigame_wrapper">
        <div className="multigame_question">
          <MultiGameMap
            propsLatLng={gamesArray[currentGameId].gameSet[question].latLng}
            onAnswerHandler={onAnswerHandler}
            questionNum={question}
            switchMarker={false}
          />
        </div>
        <div className="multigame_players-list">
          {players.map((player: IPlayer, index: number) => (
            <div className="multigame_players-item" key={index}>
              <p className="multigame_players-item__info">
                <span>{`${player.name}`}</span>
                <span className="multigame_players-item__score">{`${player.playerScore}`}</span>
              </p>
              <p className={isAnswered ? 'multigame_players-item__modal' : 'multigame_players-item__modal  __hide'}>
                {t('multiplayer.earned_points', { points: player.points })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isAnswered ? (
        <div className="multigame_wrapper__modal">
          <p className="city_name">{t('multiplayer.place')}</p>
          <p className="city_name">{gamesArray[currentGameId].gameSet[question].city}</p>
          {questionArray.length !== 9 ? (
            <MyButton className="next_question" onClickButton={setNextQuestion}>
              {t('game.next_question')}
            </MyButton>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      {isGameFinished || isLoosedGame ? <GameResult /> : ''}
      {isRoundFinished ? <KilledPlayers onContinueHandler={continueHandler} /> : ''}
    </section>
  );
};
export default MultiGamePage;
