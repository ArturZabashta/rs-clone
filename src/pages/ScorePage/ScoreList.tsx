import React from 'react';

import { IUserScores } from '../../types/uiInterface';

interface IScoreListProps {
  userScores: IUserScores[];
}

const ScoreList: React.FC<IScoreListProps> = ({ userScores }) => {
  return userScores.length === 0 ? (
    <div className="scores_item">There is no results yet</div>
  ) : (
    <div>
      {userScores.map((item) => (
        <div className="scores_item" key={item.date}>
          <div>Score: {item.score}</div>
          <div>Date {new Date(item.date).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default ScoreList;
