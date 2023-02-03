import React from 'react';
import { useNavigate } from 'react-router-dom';

import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';

import '../../styles/WelcomePage.scss';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="welcome-page">
      <BackgroundVideo />
      <h2 className="page-title">EXPLORE THE WORLD! </h2>
      <p>Find clues and guess where you are in the world. Join 50 million other players worldwide.</p>
      <button onClick={() => navigate('/signup')}>PLAY FREE NOW</button>
    </section>
  );
};
export default WelcomePage;
