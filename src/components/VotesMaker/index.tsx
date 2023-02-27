import React, { useState } from 'react';
import useSound from 'use-sound';

import { HOST_NAME } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import soundMyButton from '../../sounds/myButton_sound.mp3';
import { setPopUpMsg } from '../../store/uiSlice';
import MyButton from '../MyButton/MyButton';

interface VotesMakerProps {
  id: string;
  votes: number;
  gamesRender: () => void;
}
const VotesMaker: React.FC<VotesMakerProps> = ({ votes, id, gamesRender }) => {
  const dispatch = useAppDispatch();

  const { isSoundOn, effectsVolume } = useAppSelector((state) => state.game);
  const [playMyButton] = useSound(soundMyButton, { volume: effectsVolume });

  const [votesCount, setVotesCount] = useState<number>(votes);
  const [disableBtn, setDisableBtn] = useState(false);

  const setVotes = async (increase: boolean) => {
    try {
      setDisableBtn(true);
      const res = await fetch(HOST_NAME + '/custom', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ increase, _id: id }),
      });
      const { message, votes } = await res.json();
      dispatch(setPopUpMsg(message));
      if (votes) {
        setVotesCount(votes);
        setDisableBtn(false);
      } else {
        gamesRender();
      }
    } catch {
      setDisableBtn(false);
    }
  };

  return (
    <div className="multiplayer_games__likes">
      <MyButton className="likes_count__btn __liked" onClickButton={() => setVotes(false)} isDisabled={disableBtn}>
        -
      </MyButton>
      <span className="likes_count">{votesCount}</span>
      <MyButton className="likes_count__btn __disliked" onClickButton={() => setVotes(true)} isDisabled={disableBtn}>
        +
      </MyButton>
    </div>
  );
};
export default VotesMaker;
