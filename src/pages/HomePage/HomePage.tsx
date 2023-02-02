import React from 'react';
import { Link } from 'react-router-dom';

import Settings from '../../components/Settings/Settings';

// import './HomePage.css'

const HomePage: React.FC = () => {
  return (
    <section className="home-page">
      <h2 className="page-title">Home Page</h2>
      <nav>
        <Link to="/single-player">SinglePlayer</Link>
        <Link to="/multi-player">MultiPlayer</Link>
      </nav>
      <Settings />
    </section>
  );
};
export default HomePage;
