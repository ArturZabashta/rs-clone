import React from 'react';

import { useAppSelector } from '../../hooks/userHooks';

const ScoreList: React.FC = () => {
  const { topScores } = useAppSelector((state) => state.game);
  const scoreArr = topScores.slice(0, 7).sort((a, b) => Number(b) - Number(a));
  return topScores.length === 0 ? (
    <div className="scores_item">There is no results yet</div>
  ) : (
    <div>
      {scoreArr.map((item, index) => (
        <div className="scores_item" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default ScoreList;
