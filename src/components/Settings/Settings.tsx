import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setIsSettingsOn } from '../../store/uiSlice';
import MyButton from '../MyButton/MyButton';

const Settings: React.FC = () => {
  const { isSettingsOn } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const [settingsOn, setSettingsOn] = useState(isSettingsOn);

  const closeSettingsHandler = () => {
    dispatch(setIsSettingsOn(false));
    console.log('Settings Close');
  };

  useEffect(() => {
    setSettingsOn(isSettingsOn);
  }, [isSettingsOn]);

  return (
    <section className="settings">
      {settingsOn ? (
        <>
          <h2>Settings</h2>
          <span>EFFECT VOLUME</span>
          <input type="range"></input>
          <span>MUSIC VOLUME</span>
          <input type="range"></input>
          <MyButton className="settings_btn" onClickButton={closeSettingsHandler}>
            Close
          </MyButton>
        </>
      ) : (
        ''
      )}
    </section>
  );
};
export default Settings;
