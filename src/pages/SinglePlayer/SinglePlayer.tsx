import React from 'react';

import Map from '../../components/Map';

//const API_KEY = String(process.env.REACT_APP_API_KEY);

const SinglePlayer: React.FC = () => {
  return (
    <section className="single-player">
      <h2 className="page-title">SinglePlayer Page</h2>
      <Map />
    </section>
  );
};
export default React.memo(SinglePlayer);
