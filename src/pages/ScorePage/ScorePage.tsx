import React from 'react';

import { useAppSelector } from '../../hooks/userHooks';

import ScoreList from './ScoreList';

import '../../styles/scorePage.scss';

const ScorePage: React.FC = () => {
  const { username, topScores } = useAppSelector((state) => state.ui);

  return (
    <section className="score-page">
      <h2 className="score-page_title">
        {' '}
        <span style={{ textTransform: 'capitalize' }}>{username}&apos;s</span> high scores:{' '}
      </h2>
      <ScoreList />
    </section>
  );
};
export default ScorePage;
