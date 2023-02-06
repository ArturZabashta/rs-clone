import React from 'react';

import MyButton from '../../components/MyButton/MyButton';
import Settings from '../../components/Settings/Settings';
// import './HomePage.css'

const HomePage: React.FC = () => {
  return (
    <section className="home-page">
      <nav>
        <MyButton className="single-player_btn" route="/single-player">
          SinglePlayer
        </MyButton>
        <MyButton className="single-player_btn" route="/multi-player">
          MultiPlayer
        </MyButton>
        <MyButton className="single-player_btn" route="/score">
          Leader Board
        </MyButton>
      </nav>
      <Settings />
    </section>
  );
};
export default HomePage;
