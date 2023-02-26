import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import GameMusic from '../../components/GameMusic/GameMusic';
import GameResult from '../../components/GameResult/GameResult';
import SingleGameMap from '../../components/Map/SingleGameMap';
import MyButton from '../../components/MyButton/MyButton';
import { gameView } from '../../constants/places-data';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import soundNextQuestion from '../../sounds/nextQuestion_sound.mp3';
import { resetScore, setScore, setTotalScore } from '../../store/gameSlice';
import { resetLevel, setLevel } from '../../store/gameSlice';
import { getDiapasonRandomNum, sendUserScore, singlePointsCounter } from '../../utils/utilities';

const SinglePlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { score } = useAppSelector((state) => state.game);
  const { level } = useAppSelector((state) => state.game);
  const { isSoundOn, effectsVolume } = useAppSelector((state) => state.game);
  const { isLogin } = useAppSelector((state) => state.ui);

  const [question, setQuestion] = useState<number>(getDiapasonRandomNum(0, gameView.length - 1));
  const [questionArray, setQuestionArray] = useState<number[]>([question]);
  const [distance, setDistance] = useState(0);
  const [answerPoints, setAnswerPoints] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const [playNextQuestion] = useSound(soundNextQuestion, { volume: effectsVolume });

  //  Следующий произвольный вопрос из списка
  const setNextLevel = () => {
    let nextQuestion: number;
    do {
      nextQuestion = getDiapasonRandomNum(0, gameView.length - 1);
    } while (questionArray.indexOf(nextQuestion) !== -1);

    setQuestion(nextQuestion);
    setQuestionArray([...questionArray, nextQuestion]);
    setIsAnswered(false);

    if (level === 9) {
      setIsGameFinished(true);
      sendUserScore(score, isLogin).then((res) => {
        res && dispatch(setTotalScore(res));
        dispatch(resetLevel());
      });
    }

    dispatch(setLevel());

    isSoundOn && playNextQuestion();
  };

  const onAnswerHandler = (distance: number) => {
    setIsAnswered(true);
    setDistance(distance);
    const points = singlePointsCounter(distance);
    setAnswerPoints(points);
    dispatch(setScore(points));
  };

  // При  Unmount компонента
  useEffect(() => {
    return () => {
      dispatch(resetLevel());
      dispatch(resetScore());
      setQuestionArray([]);
      setAnswerPoints(0);
    };
  }, []);

  return (
    <section className="singleplayer">
      {isGameFinished ? '' : <GameMusic />}
      <p className="singleplayer_title">
        <span>{`Question #${level}`}</span>
        <span>{`Score:${score}`}</span>
      </p>
      <div className="singleplayer_wrapper">
        <SingleGameMap
          pointLatLng={gameView[question].latLng}
          onAnswerHandler={onAnswerHandler}
          questionNum={question}
          switchMarker={false}
        />
      </div>
      {isAnswered ? (
        <div className="singleplayer_modal">
          <p className="answer_city">{`This is  ${gameView[question].city}`}</p>
          <p className="distance">{`You were wrong by  ${distance} km`}</p>
          <p className="points">{`Your result is  ${answerPoints}  points`}</p>
          <MyButton className="login_btn f-bold" onClickButton={setNextLevel}>
            Next question
          </MyButton>
        </div>
      ) : (
        ''
      )}
      {isGameFinished ? <GameResult score={score} /> : ''}
    </section>
  );
};
export default React.memo(SinglePlayer);
