import React, { useEffect, useState } from 'react';

import { HOST_NAME } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setPopUpMsg } from '../../store/uiSlice';
import { IBestScore, IUserScores, LSData } from '../../types/uiInterface';

import BestList from './BestList';
import ScoreList from './ScoreList';

interface IScoreRes {
  results: IBestScore[];
}

type IGetScores = (sort?: 'date' | 'score', order?: 'ASC' | 'DESC') => Promise<void>;

const ScorePage: React.FC = () => {
  const { username, isLogin } = useAppSelector((state) => state.ui);
  const [bestScores, setBestScores] = useState<IBestScore[]>([]);
  const [userScores, setUserScores] = useState<IUserScores[]>([]);
  const dispatch = useAppDispatch();

  const getScores: IGetScores = async (get = 'score', order = 'DESC') => {
    setUserScores([]);
    const userData: LSData = await JSON.parse(sessionStorage.getItem('userData') as string);
    const response = await fetch(HOST_NAME + '/score/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        AUTHORIZATION: userData.token,
      },
      body: JSON.stringify({
        get,
        order,
      }),
    });

    const { message, scoreArr } = await response.json();
    if (response.status === 200) {
      setUserScores(scoreArr.slice(0, 7));
    } else {
      dispatch(setPopUpMsg(message));
    }
  };

  useEffect(() => {
    fetch(HOST_NAME + '/best_score')
      .then((res) => res.json())
      .then((res: IScoreRes) => {
        setBestScores(res.results);
      });
    getScores();
  }, []);

  return (
    <section className="score-page">
      <div className="score-page_item">
        <h2 className="score-page_title">Best Scores</h2>
        {bestScores.length === 0 ? <div className="spinner"></div> : <BestList scoreList={bestScores} />}
      </div>
      {isLogin && (
        <div className="score-page_item">
          <h2 className="score-page_title">
            <span style={{ textTransform: 'capitalize' }}>{username}&apos;s</span> high scores:
          </h2>
          <div className="score-page_sortBtns">
            <button className="score-page_sortBtn" onClick={() => getScores('score', 'DESC')}>
              Best
            </button>
            <button className="score-page_sortBtn" onClick={() => getScores('score', 'ASC')}>
              Worst
            </button>
            <button className="score-page_sortBtn" onClick={() => getScores('date', 'DESC')}>
              Newest
            </button>
            <button className="score-page_sortBtn" onClick={() => getScores('date', 'ASC')}>
              Oldest
            </button>
          </div>
          {userScores.length === 0 ? <div className="spinner"></div> : <ScoreList userScores={userScores} />}
        </div>
      )}
    </section>
  );
};
export default ScorePage;
