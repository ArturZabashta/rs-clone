import React, { useCallback, useEffect, useState } from 'react';
import useSound from 'use-sound';

import GameMusic from '../../../components/GameMusic/GameMusic';
import GameResult from '../../../components/GameResult/GameResult';
import KilledPlayers from '../../../components/KilledPlayers/KilledPlayers';
import MultiGameMap from '../../../components/Map/MultiGameMap';
import MyButton from '../../../components/MyButton/MyButton';
import { gameView } from '../../../constants/places-data';
import { useAppDispatch, useAppSelector } from '../../../hooks/userHooks';
import soundNextQuestion from '../../../sounds/nextQuestion_sound.mp3';
import { resetLevel, resetRound, setLevel, setRound, setSortPlayersTeam } from '../../../store/gameSlice';
import { IPlayer } from '../../../types/gameInterface';
import { getDiapasonRandomNum } from '../../../utils/utilities';

const MultiGamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.game);
  const { level } = useAppSelector((state) => state.game);
  const { round } = useAppSelector((state) => state.game);
  const { isLoosedGame } = useAppSelector((state) => state.game);
  const { isSoundOn, effectsVolume } = useAppSelector((state) => state.game);

  const [question, setQuestion] = useState<number>(getDiapasonRandomNum(0, gameView.length - 1));
  const [questionArray, setQuestionArray] = useState<number[]>([question]);

  const [isAnswered, setIsAnswered] = useState(false);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const [playNextQuestion] = useSound(soundNextQuestion, { volume: effectsVolume });

  //  Следующий произвольный вопрос из списка
  const setNextQuestion = () => {
    let nextQuestion: number;
    do {
      nextQuestion = getDiapasonRandomNum(0, gameView.length - 1);
    } while (questionArray.indexOf(nextQuestion) !== -1);

    setQuestion(nextQuestion);
    setQuestionArray([...questionArray, nextQuestion]);
    setIsAnswered(false);

    dispatch(setLevel());

    if (level === 3 && round < 3) {
      setIsRoundFinished(true);
      dispatch(setRound());
      dispatch(resetLevel());
    }
    if (round === 3 && level === 3) {
      setIsGameFinished(true);
      dispatch(resetLevel());
      dispatch(resetRound());
    }
    //dispatch(setLevel());

    isSoundOn && playNextQuestion();
  };

  const onAnswerHandler = () => {
    setSorted();
    setIsAnswered(true);
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

  return (
    <section className="Multi-player">
      {isGameFinished || isLoosedGame ? '' : <GameMusic />}
      <p style={{ textAlign: 'center' }}>{`Round ${round}. Question ${level}`}</p>
      <div
        className="game_wrapper"
        style={{
          height: '60vh',
          width: '100vw',
          display: 'flex',
        }}
      >
        <div
          className="question_wrapper"
          style={{
            position: 'relative',
            height: '60vh',
            width: '70vw',
            margin: '1rem',
          }}
        >
          <MultiGameMap
            propsLatLng={gameView[question].latLng}
            onAnswerHandler={onAnswerHandler}
            questionNum={question}
            switchMarker={false}
          />
        </div>
        <div
          className="players_wrapper"
          style={{
            height: '100%',
            width: '27vw',
            position: 'relative',
          }}
        >
          {players.map((player: IPlayer, index: number) => (
            <div
              className="players_item"
              key={index}
              style={{ margin: '1rem', border: 'solid 1px grey', borderRadius: '0.2rem' }}
            >
              <p className="players_item__name">{`${player.name}`}</p>
              <p className="players_item__points">
                {isAnswered ? `Earned ${player.points} points` : `Not answered yet`}
              </p>
              <p className="players_item__points">{`Score:  ${player.playerScore}`}</p>
            </div>
          ))}
        </div>
      </div>

      {isAnswered ? (
        <div
          className="next_question"
          style={{
            position: 'fixed',
            top: '33%',
            left: '33%',
            backgroundColor: 'black',
            zIndex: '999 ',
            textAlign: 'center',
          }}
        >
          <p className="city_name">{`It is ${gameView[question].city}`}</p>
          <MyButton className="next_question" onClickButton={setNextQuestion}>
            Next question
          </MyButton>
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
