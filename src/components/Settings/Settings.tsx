import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import soundSettingsOn from '../../sounds/settingsOn_sound.mp3';
import { setEffectsVolume, setIsSoundOn, setMusicVolume } from '../../store/gameSlice';
import { setIsSettingsOn } from '../../store/uiSlice';
import MyButton from '../MyButton/MyButton';
import MySwitch from '../MySwitch';

import { ReactComponent as MusicSvg } from './assets/effects.svg';
import { ReactComponent as FullscreenSvg } from './assets/fullscreen.svg';
import { ReactComponent as SoundSvg } from './assets/sound.svg';
import { ReactComponent as EffectsSvg } from './assets/volume.svg';

import '../../styles/Settings.scss';

const Settings: React.FC = () => {
  const { isSettingsOn } = useAppSelector((state) => state.ui);
  const { isSoundOn, musicVolume, effectsVolume } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const [isFullscreenOn, setIsFullscreenOn] = useState(false);

  const closeSettingsHandler = () => {
    dispatch(setIsSettingsOn(false));
  };

  const [playOn] = useSound(soundSettingsOn, { volume: musicVolume });

  const volumeSwitcher = (checked: boolean) => {
    dispatch(setIsSoundOn(checked));
    checked && playOn();
  };
  const fullscreenSwitcher = (checked: boolean) => {
    setIsFullscreenOn(!isFullscreenOn);
    if (checked) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section className={isSettingsOn ? 'settings-container settings-container__active' : 'settings-container'}>
      <div className="settings">
        <h2 className="settings_title">Settings</h2>
        <label className="settings_label" htmlFor="music">
          Music volume
        </label>
        <div className="settings_sound">
          <MusicSvg />
          <input
            type="range"
            className="settings_input"
            name="music"
            min={0}
            max={1}
            step={0.1}
            value={isSoundOn ? musicVolume : 0}
            onChange={(e) => dispatch(setMusicVolume(Number(e.target.value)))}
          ></input>
        </div>
        <label className="settings_label" htmlFor="effect">
          Effect volume
        </label>
        <div className="settings_sound">
          <EffectsSvg />
          <input
            type="range"
            className="settings_input"
            name="effect"
            min={0}
            max={1}
            step={0.1}
            value={isSoundOn ? effectsVolume : 0}
            onChange={(e) => dispatch(setEffectsVolume(Number(e.target.value)))}
          ></input>
        </div>
        <div className="settings_deliner"></div>
        <div className="settings_switchers">
          <div className="settings_switcher">
            <div className={isSoundOn ? '' : 'mute'}>
              <SoundSvg />
            </div>
            <MySwitch checked={isSoundOn} handleChange={volumeSwitcher}>
              sound
            </MySwitch>
          </div>
          <div className="settings_switcher">
            <FullscreenSvg />
            <MySwitch checked={isFullscreenOn} handleChange={fullscreenSwitcher}>
              fullscreen
            </MySwitch>
          </div>
        </div>
        <div className="settings_deliner"></div>
        <MyButton className="settings_btn" onClickButton={closeSettingsHandler}>
          Close
        </MyButton>
      </div>
    </section>
  );
};
export default Settings;
