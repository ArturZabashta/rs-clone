import React, { useEffect, useState } from 'react';

import GameResult from '../../../components/GameResult/GameResult';
import KilledPlayers from '../../../components/KilledPlayers/KilledPlayers';
import MultiGameMap from '../../../components/Map/MultiGameMap';
import MyButton from '../../../components/MyButton/MyButton';
import { gameView } from '../../../constants/places-data';
import { useAppDispatch, useAppSelector } from '../../../hooks/userHooks';
import { setPlayersTeam, setScore } from '../../../store/gameSlice';
import { IPlayer } from '../../../types/gameInterface';
import { getDiapasonRandomNum, singlePointsCounter } from '../../../utils/utilities';

const MultiGamePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { score } = useAppSelector((state) => state.game);
  const { players } = useAppSelector((state) => state.game);
  const [gamePlayers, setGamePlayers] = useState<IPlayer[]>(players);
  const [question, setQuestion] = useState<number>(getDiapasonRandomNum(0, gameView.length - 1));
  const [questionArray, setQuestionArray] = useState<number[]>([question]);
  const [distance, setDistance] = useState(0);
  const [answerPoints, setAnswerPoints] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const [roundCount, setRoundCount] = useState(1);
  const [isRoundFinished, setIsRoundFinished] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  //  Следующий произвольный вопрос из списка
  const setNextQuestion = () => {
    let nextQuestion: number;
    do {
      nextQuestion = getDiapasonRandomNum(0, gameView.length - 1);
    } while (questionArray.indexOf(nextQuestion) !== -1);

    setQuestion(nextQuestion);
    setQuestionArray([...questionArray, nextQuestion]);
    setIsAnswered(false);
    console.warn('questionArray.length =', questionArray.length);
    if (questionArray.length === 3 || questionArray.length === 6) {
      setIsRoundFinished(true);
      setRoundCount((prev) => prev + 1);
    }
    console.warn('Players Score is =', players);
    console.warn('questionArray is =', questionArray);
  };

  const onAnswerHandler = (getPlayers: IPlayer[]) => {
    const copyGetPlayers: Array<IPlayer> = JSON.parse(JSON.stringify(getPlayers));
    setSorted(copyGetPlayers);
    setGamePlayers(copyGetPlayers);

    setIsAnswered(true);
  };

  function setSorted(array: IPlayer[]) {
    setTimeout(() => {
      function setClosure() {
        const copyArray: Array<IPlayer> = JSON.parse(JSON.stringify(array));
        copyArray.sort((a: IPlayer, b: IPlayer) => b.playerScore - a.playerScore);
        setGamePlayers(copyArray);
        dispatch(setPlayersTeam(copyArray));
      }
      setClosure();
    }, 3500);
  }

  const continueHandler = (remainingPlayers: IPlayer[]) => {
    console.log('remainingPlayers', remainingPlayers);
    setGamePlayers(remainingPlayers);
    dispatch(setPlayersTeam(remainingPlayers));
    setIsRoundFinished(false);
    setNextQuestion();
  };

  useEffect(() => {
    if (questionArray.length === 10) {
      setIsGameFinished(true);
    }
  }, [questionArray]);

  return (
    <section className="Multi-player">
      <h3>{`Round ${roundCount}`}</h3>
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
      {isGameFinished ? <GameResult score={score} /> : ''}
      {isRoundFinished ? <KilledPlayers allPlayers={players} onContinueHandler={continueHandler} /> : ''}
    </section>
  );
};
export default MultiGamePage;
