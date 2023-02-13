import React, { useEffect, useState } from 'react';

import GameResult from '../../components/GameResult/GameResult';
import SingleGameMap from '../../components/Map/SingleGameMap';
import MyButton from '../../components/MyButton/MyButton';
import { gameView } from '../../constants/places-data';
import { useAppDispatch } from '../../hooks/userHooks';
import { useAppSelector } from '../../hooks/userHooks';
import { setScore } from '../../store/gameSlice';
import { getDiapasonRandomNum, singlePointsCounter } from '../../utils/utilities';
//const API_KEY = String(process.env.REACT_APP_API_KEY);

const SinglePlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { score } = useAppSelector((state) => state.game);
  const [question, setQuestion] = useState<number>(getDiapasonRandomNum(0, gameView.length - 1));
  const [questionArray, setQuestionArray] = useState<number[]>([question]);
  const [distance, setDistance] = useState(0);
  const [answerPoints, setAnswerPoints] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  //  Следующий произвольный вопрос из списка
  const setNextLevel = () => {
    let nextQuestion: number;
    do {
      nextQuestion = getDiapasonRandomNum(0, gameView.length - 1);
    } while (questionArray.indexOf(nextQuestion) !== -1);

    setQuestion(nextQuestion);
    setQuestionArray([...questionArray, nextQuestion]);
    setIsAnswered(false);
    console.warn('Score is =', score);
  };

  const onAnswerHandler = (distance: number) => {
    console.log('distance from SP=', distance);
    setIsAnswered(true);
    setDistance(distance);
    const points = singlePointsCounter(distance);
    setAnswerPoints(points);
    dispatch(setScore(points));
  };

  useEffect(() => {
    if (questionArray.length === 5) {
      setIsGameFinished(true);
    }
  }, [questionArray]);

  return (
    <section
      className="single-player"
      style={{
        height: '80vh',
        width: '100vw',
        display: 'flex',
      }}
    >
      <div
        className="question_wrapper"
        style={{
          position: 'relative',
          height: '70vh',
          width: '100vw',
          margin: '1rem',
        }}
      >
        <SingleGameMap
          pointLatLng={gameView[question].latLng}
          onAnswerHandler={onAnswerHandler}
          questionNum={question}
          switchMarker={false}
        />
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
