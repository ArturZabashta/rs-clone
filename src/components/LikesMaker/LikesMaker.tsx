import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import soundMyButton from '../../sounds/myButton_sound.mp3';
import { setCurrentPage } from '../../store/uiSlice';
import MyButton from '../MyButton/MyButton';

interface LikesMakerProps {
  likesProp: number;
}
const LikesMaker: React.FC<LikesMakerProps> = ({ likesProp }) => {
  const dispatch = useAppDispatch();

  const { isSoundOn, effectsVolume } = useAppSelector((state) => state.game);
  const [playMyButton] = useSound(soundMyButton, { volume: effectsVolume });

  const [likeCount, setlikeCount] = useState<number>(likesProp);

  const setLikeIncrease = () => {
    setlikeCount(likeCount + 1);
  };
  const setLikeDecrease = () => {
    setlikeCount(likeCount - 1);
  };

  return (
    <div className="multiplayer_games__likes">
      <MyButton className="likes_count__btn" onClickButton={setLikeDecrease}>
        -
      </MyButton>
      <span className="likes_count">{likeCount}</span>
      <MyButton className="likes_count__btn" onClickButton={setLikeIncrease}>
        +
      </MyButton>
    </div>
  );
};
export default LikesMaker;
