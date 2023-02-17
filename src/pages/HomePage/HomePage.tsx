import React from 'react';

import Menu from '../../components/GameMenu/Menu';
import GameRule from '../../components/GameRule';
import { gameRules } from '../../constants/game-description';

const HomePage: React.FC = () => {
  return (
    <section className="home-page">
      <Menu />
      <section className="home-page_rules rules">
        {gameRules.map((item, ind) => (
          <GameRule head={item.title} body={item.body} key={ind} />
        ))}
      </section>
    </section>
  );
};
export default HomePage;
