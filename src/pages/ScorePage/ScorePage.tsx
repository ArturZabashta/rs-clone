import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/userHooks';
import { IBestScore } from '../../types/uiInterface';

import BestList from './BestList';
import ScoreList from './ScoreList';

interface IScoreRes {
  results: IBestScore[];
}

const ScorePage: React.FC = () => {
  const { username, isLogin } = useAppSelector((state) => state.ui);
  const [bestScores, setBestScores] = useState<IBestScore[]>([]);
  useEffect(() => {
    fetch('https://rsclone-server.onrender.com/best_score')
      .then((res) => res.json())
      .then((res: IScoreRes) => {
        setBestScores(res.results);
      });
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
            {' '}
            <span style={{ textTransform: 'capitalize' }}>{username}&apos;s</span> high scores:{' '}
          </h2>
          <ScoreList />
        </div>
      )}
    </section>
  );
};
export default ScorePage;
