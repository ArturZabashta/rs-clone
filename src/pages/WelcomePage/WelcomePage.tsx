import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo';

import '../../styles/WelcomePage.scss';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <section className="welcome-page">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <BackgroundVideo />
      )}
      <div className="container">
        <h2 className="page-title">EXPLORE THE WORLD! </h2>
        <p className="text-on-video h-mb70">
          Find clues and guess where you are in the world. Join 50 million other players worldwide.
        </p>
        <button onClick={() => navigate('/signup')} className="btn_blue h-m0auto">
          PLAY FREE NOW
        </button>
      </div>
    </section>
  );
};
export default WelcomePage;