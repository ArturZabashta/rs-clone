import React from 'react';
import { useTranslation } from 'react-i18next';

import { IUserScores } from '../../types/uiInterface';

interface IScoreListProps {
  userScores: IUserScores[];
}

const ScoreList: React.FC<IScoreListProps> = ({ userScores }) => {
  const { t } = useTranslation();

  return userScores.length === 0 ? (
    <div className="scores_item">{t('score.no_results')}</div>
  ) : (
    <div>
      {userScores.map((item) => (
        <div className="scores_item" key={item.date}>
          <div>{t('score.item_score', { score: item.score })}</div>
          <div>{t('score.item_date', { date: new Date(item.date).toLocaleString() })}</div>
        </div>
      ))}
    </div>
  );
};

export default ScoreList;
