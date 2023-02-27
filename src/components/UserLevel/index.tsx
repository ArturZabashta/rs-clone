import React from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from 'rc-progress';

import { useAppSelector } from '../../hooks/userHooks';

interface ILvlData {
  title: string;
  level: string;
  min: number;
  max: number;
}

const UserLvl: React.FC = () => {
  const totalScore = useAppSelector((state) => state.game.totalScore);
  const { t } = useTranslation();

  const getLvlData = (score: number): ILvlData => {
    // console.log(score);
    if (score <= 12000) return { title: `${t('header.prestige_tourist')}`, level: '1', min: 0, max: 12000 };
    if (score > 12001 && score <= 35000)
      return { title: `${t('header.prestige_adventurer')}`, level: '2', min: 12001, max: 35000 };
    if (score > 35001 && score <= 80000)
      return { title: `${t('header.prestige_explorer')}`, level: '3', min: 35001, max: 80000 };
    if (score > 80001 && score <= 160000)
      return { title: `${t('header.prestige_pathfinder')}`, level: '4', min: 80001, max: 160000 };
    else return { title: `${t('header.prestige_columbus')}`, level: '5', min: 160001, max: 500000 };
  };
  const lvlData = getLvlData(totalScore);
  return (
    <section className="lvl">
      <div className="lvl_level">{t('header.prestige_level', { level: lvlData.level })}</div>
      <div className="lvl_title">{lvlData.title}</div>
      <Line
        percent={((totalScore - lvlData.min) / (lvlData.max - lvlData.min)) * 100}
        strokeWidth={12}
        trailWidth={12}
        strokeColor="#fecd19"
        strokeLinecap="butt"
        className="lvl_bar"
      />
    </section>
  );
};

export default UserLvl;
