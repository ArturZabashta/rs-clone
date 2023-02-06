import React from 'react';

import MyButton from '../../components/MyButton/MyButton';
const WelcomePage: React.FC = () => {
  return (
    <section className="welcome-page">
      <h2 className="page-title">EXPLORE THE WORLD! </h2>
      <p>Find clues and guess where you are in the world. Join 50 million other players worldwide.</p>
      <MyButton className="back_btn" route="/signup">
        PLAY FREE NOW
      </MyButton>
    </section>
  );
};
export default WelcomePage;
