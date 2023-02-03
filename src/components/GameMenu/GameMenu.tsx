import React from 'react';
import { Link } from 'react-router-dom';

// import './GameMenu.css'

const GameMenu: React.FC = () => {
  return (
    <section className="settings">
      <Link to="/single-player">SinglePlayer</Link>
      <Link to="/multi-player">MultiPlayer</Link>
      <Link to="/score">Score</Link>
      <button>Close</button>
    </section>
  );
};
export default GameMenu;
