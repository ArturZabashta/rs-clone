import React from 'react';

import { useAppSelector } from '../../hooks/userHooks';
import soundGameMusic from '../../sounds/musicGame_sound.mp3';

const GameMusic: React.FC = () => {
  const { isSoundOn, musicVolume } = useAppSelector((state) => state.game);

  const audioRef = React.useRef<HTMLAudioElement>(null);
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume, audioRef]);

  return <>{isSoundOn ? <audio ref={audioRef} src={soundGameMusic} autoPlay loop /> : ''}</>;
};
export default GameMusic;
