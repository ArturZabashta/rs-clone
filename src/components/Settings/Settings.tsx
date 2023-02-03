import React from 'react';

// import './Settings.css'

const Settings: React.FC = () => {
  return (
    <section className="settings">
      <h2>Settings</h2>
      <span>EFFECT VOLUME</span>
      <input type="range"></input>
      <span>MUSIC VOLUME</span>
      <input type="range"></input>
      <button>Close</button>
    </section>
  );
};
export default Settings;
