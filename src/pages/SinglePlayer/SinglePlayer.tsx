import React from 'react';

import Map from '../../components/Map';

//const API_KEY = String(process.env.REACT_APP_API_KEY);

const SinglePlayer: React.FC = () => {
  return (
    <section
      className="single-player"
      style={{
        height: '80vh',
        width: '100vw',
        display: 'flex',
      }}
    >
      <div
        className="question_wrapper"
        style={{
          position: 'relative',
          height: '70vh',
          width: '70vw',
          margin: '1rem',
        }}
      >
        <Map />
        <div
          className="players_wrapper"
          style={{
            height: '100%',
            width: '27vw',
            position: 'relative',
          }}
        ></div>
      </div>
    </section>
  );
};
export default React.memo(SinglePlayer);
