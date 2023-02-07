import React from 'react';

import MyButton from '../../components/MyButton/MyButton';
import { useAppDispatch } from '../../hooks/userHooks';
import { setIsSettingsOn } from '../../store/uiSlice';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const settingsHandler = () => {
    dispatch(setIsSettingsOn(true));
    console.log('Settings On');
  };
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
        <MyButton className="settings_btn" onClickButton={settingsHandler}>
          Settings
        </MyButton>
      </nav>
    </section>
  );
};
export default HomePage;
