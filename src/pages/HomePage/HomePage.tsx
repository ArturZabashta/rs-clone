import React, { useState } from 'react';

import Menu from '../../components/GameMenu/Menu';
import GameRule from '../../components/GameRule';
import { gameRules, gameRulesRus } from '../../constants/game-description';
import { useAppSelector } from '../../hooks/userHooks';

const HomePage: React.FC = () => {
  const { language } = useAppSelector((state) => state.ui);

  const [spread, setSpread] = useState(0);

  return (
    <section className="home-page">
      <Menu />
      <section className="home-page_rules rules">
        {(language === 'en' ? gameRules : gameRulesRus).map((item, ind) => (
          <GameRule
            head={item.title}
            body={item.body}
            key={ind}
            handler={() => setSpread(ind)}
            isShown={spread === ind ? true : false}
          />
        ))}
      </section>
    </section>
  );
};
export default HomePage;
