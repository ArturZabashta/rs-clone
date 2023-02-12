import React, { useEffect, useState } from 'react';

import MyButton from '../../components/MyButton/MyButton';
import { opponents } from '../../constants/opponents';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setPlayersTeam } from '../../store/gameSlice';
import { Players } from '../../types/gameInterface';
import { getDiapasonRandomNum } from '../../utils/utilities';

const MultiPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.ui);
  const [isFindClicked, setIsFindClicked] = useState<boolean>(false);
  const [isGameAvailable, setIsGameAvailable] = useState<boolean>(false);
  const [playersArray, setPlayersArray] = useState<Players[]>([]);

  const setOpponents = () => {
    setPlayersArray([{ id: 0, name: username === '' ? 'Player' : username, points: 0 }]);
    setIsFindClicked(true);
  };

  useEffect(() => {
    if (playersArray.length < 7 && isFindClicked === true) {
      setTimeout(() => {
        function setClosure() {
          let nextPlayerId: number;
          const copy: Array<Players> = Object.assign([], playersArray);
          do {
            nextPlayerId = getDiapasonRandomNum(1, opponents.length);
            console.warn('nextPlayer = ', nextPlayerId);
          } while (copy.find((player: Players) => player.id === nextPlayerId) !== undefined);
          console.warn('Final nextPlayer = ', nextPlayerId);
          const nextPlayer: Players = {
            id: opponents[nextPlayerId - 1].id,
            name: opponents[nextPlayerId - 1].name,
            points: 0,
          };
          copy.push(nextPlayer);
          setPlayersArray(copy);
          dispatch(setPlayersTeam(playersArray));
        }
        setClosure();
      }, 1200);
      console.log('playersArray = ', playersArray);
    }
    if (playersArray.length === 7) setIsGameAvailable(true);
  }, [playersArray]);

  return (
    <section className="multi-player">
      <h2>List of Opponents</h2>
      <div className="players_wrapper">
        {playersArray.map((player: Players) => (
          <div className="players_item" key={player.id}>
            {player.name}
          </div>
        ))}
      </div>
      <MyButton className="login_btn f-bold" onClickButton={setOpponents}>
        Find Opponents
      </MyButton>
      <MyButton className="login_btn f-bold" route={'/game'} isDisabled={isGameAvailable ? false : true}>
        Let&apos;s start the Game
      </MyButton>
    </section>
  );
};
export default MultiPlayer;
