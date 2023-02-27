import React from 'react';

import Menu from '../../components/GameMenu/Menu';
import GameRule from '../../components/GameRule';
import { gameRules, gameRulesRus } from '../../constants/game-description';
import { useAppSelector } from '../../hooks/userHooks';

const HomePage: React.FC = () => {
  const { language } = useAppSelector((state) => state.ui);
  return (
    <section className="home-page">
      <Menu />
      <section className="home-page_rules rules">
        {(language === 'en' ? gameRules : gameRulesRus).map((item, ind) => (
          <GameRule head={item.title} body={item.body} key={ind} />
        ))}
      </section>
    </section>
  );
};
export default HomePage;
