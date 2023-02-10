import React, { useEffect, useState } from 'react';

import Map from '../../components/Map';
import MyButton from '../../components/MyButton/MyButton';
import { gameView } from '../../constants/constants';

//const API_KEY = String(process.env.REACT_APP_API_KEY);

const SinglePlayer: React.FC = () => {
  const [question, setQuestion] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const setNextLevel = () => {
    setQuestion(question + 1);
    setIsAnswered(false);
  };

  const onAnswerHandler = (distance: number) => {
    console.log('distance from SP=', distance);
    setIsAnswered(true);
  };

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
          width: '70vw',
          margin: '1rem',
        }}
      >
        <Map pointLatLng={gameView[question].latLng} onAnswerHandler={onAnswerHandler} questionNum={question} />
        <div
          className="players_wrapper"
          style={{
            height: '100%',
            width: '27vw',
            position: 'relative',
          }}
        ></div>
      </div>
      {isAnswered ? (
        <div className="next_question">
          <p className="answer_sity"></p>
          <p className="distance"></p>
          <p className="points"></p>
          <MyButton className="next_question" onClickButton={setNextLevel}>
            Next question
          </MyButton>
        </div>
      ) : (
        ''
      )}
    </section>
  );
};
export default React.memo(SinglePlayer);
