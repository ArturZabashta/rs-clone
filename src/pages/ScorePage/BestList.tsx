import React from 'react';
import { useTranslation } from 'react-i18next';

import { IBestScore } from '../../types/uiInterface';

interface IScoreListProps {
  scoreList: IBestScore[];
}

const BestList: React.FC<IScoreListProps> = ({ scoreList }) => {
  const { t } = useTranslation();

  const rest = scoreList.slice(3);
  return (
    <div className="best-results">
      <div className="best-results_top">
        <div className="top_item">
          <div className="top_name">{scoreList[1].username}</div>
          <div className="top2_stand top2_spread">
            <div className="top_score">{scoreList[1].score}</div>
          </div>
        </div>
        <div className="top_item">
          <div className="top_name">{scoreList[0].username}</div>
          <div className="top1_stand top1_spread">
            <div className="top_score">{scoreList[0].score}</div>
          </div>
        </div>
        <div className="top_item">
          <div className="top_name">{scoreList[2].username}</div>
          <div className="top3_stand top3_spread">
            <div className="top_score">{scoreList[2].score}</div>
          </div>
        </div>
      </div>
      {rest.map((item, ind) => {
        return (
          <div className="best-results_rest" key={ind}>
            <div className="rest_name">{t('score.best_username', { index: ind + 4, name: item.username })}</div>
            <div className="rest_score">{t('score.item_score', { score: item.score })}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BestList;
