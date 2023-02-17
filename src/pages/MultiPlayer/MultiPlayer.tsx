import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import MyButton from '../../components/MyButton/MyButton';
import { DEFAULT_PLAYER } from '../../constants/constants';
import { opponents } from '../../constants/opponents';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import soundGameMusic from '../../sounds/musicGame_sound.mp3';
import soundNextQuestion from '../../sounds/nextQuestion_sound.mp3';
import { setPlayersTeam } from '../../store/gameSlice';
import { IPlayer } from '../../types/gameInterface';
import { getDiapasonRandomNum } from '../../utils/utilities';

const MultiPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.ui);
  const { isSoundOn, musicVolume, effectsVolume } = useAppSelector((state) => state.game);
  const [isFindClicked, setIsFindClicked] = useState<boolean>(false);
  const [isGameAvailable, setIsGameAvailable] = useState<boolean>(false);
  const [playersArray, setPlayersArray] = useState<IPlayer[]>([]);
  const [playNextQuestion] = useSound(soundNextQuestion, { volume: effectsVolume });

  const setOpponents = () => {
    setPlayersArray([
      { id: 0, name: username === '' ? 'Player' : username, points: 0, playerScore: 0, latLng: { lat: 0, lng: 0 } },
    ]);
    setIsFindClicked(true);
  };

  const updateStore = () => {
    dispatch(setPlayersTeam(playersArray));
  };

  // Запуск автогенерации команды оппонентов
  useEffect(() => {
    if (playersArray.length <= 6 && isFindClicked === true) {
      setTimeout(() => {
        function setClosure() {
          let nextPlayerId: number;
          const copyArray: Array<IPlayer> = JSON.parse(JSON.stringify(playersArray));
          do {
            nextPlayerId = getDiapasonRandomNum(1, opponents.length);
          } while (copyArray.find((player: IPlayer) => player.id === nextPlayerId) !== undefined);

          const nextPlayer: IPlayer = Object.assign({}, DEFAULT_PLAYER);
          nextPlayer.id = opponents[nextPlayerId - 1].id;
          nextPlayer.name = opponents[nextPlayerId - 1].name;

          copyArray.push(nextPlayer);
          setPlayersArray(copyArray);
        }
        setClosure();
      }, Math.random() * 1200);
    }
    if (playersArray.length === 7) setIsGameAvailable(true);
  }, [playersArray]);

  return (
    <section className="multi-player">
      {isSoundOn ? <audio src={soundGameMusic} autoPlay /> : ''}
      <h3>List of Opponents</h3>
      <div
        className="players_wrapper"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100vw', height: '50vh' }}
      >
        {playersArray.map((player: IPlayer) => (
          <div
            className="players_item"
            key={player.id}
            style={{ width: '20vw', height: '20vh', border: 'solid 1px grey', borderRadius: '0.5rem', margin: '1vw' }}
          >
            <h3>{player.name}</h3>
          </div>
        ))}
      </div>
      <MyButton className="login_btn f-bold" onClickButton={setOpponents}>
        Find Opponents
      </MyButton>
      <MyButton
        className="login_btn f-bold"
        route={'/game'}
        isDisabled={isGameAvailable ? false : true}
        onClickButton={updateStore}
      >
        Let&apos;s start the Game
      </MyButton>
    </section>
  );
};
export default MultiPlayer;
