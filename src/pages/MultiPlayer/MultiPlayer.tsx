import React, { useEffect, useState } from 'react';

import LikesMaker from '../../components/LikesMaker/LikesMaker';
import MyButton from '../../components/MyButton/MyButton';
import { DEFAULT_PLAYER } from '../../constants/constants';
import { opponents } from '../../constants/opponents';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setPlayersTeam } from '../../store/gameSlice';
import { IPlayer, IQuestionItem } from '../../types/gameInterface';
import { getDiapasonRandomNum } from '../../utils/utilities';

const MultiPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.ui);
  const { usersGames } = useAppSelector((state) => state.game);
  const [isFindClicked, setIsFindClicked] = useState<boolean>(false);
  const [isGameAvailable, setIsGameAvailable] = useState<boolean>(false);
  const [playersArray, setPlayersArray] = useState<IPlayer[]>([]);

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
    <section className="multiplayer">
      <p className="multiplayer_title">List of Opponents</p>
      <div className="multiplayer_players">
        {playersArray.map((player: IPlayer) => (
          <div className="multiplayer_players__item" key={player.id}>
            <p>{player.name}</p>
          </div>
        ))}
      </div>
      <div className="multiplayer_nav">
        <MyButton className="menu_btn game_btn" onClickButton={setOpponents}>
          Find Opponents
        </MyButton>
        <div className="multiplayer_games">
          {usersGames.map((game: IQuestionItem, index: number) => (
            <div className="multiplayer_games__item" key={index}>
              <p className="multiplayer_games__title">{game.gameTitle}</p>
              <LikesMaker likesProp={game.likes}></LikesMaker>
            </div>
          ))}
        </div>
        <MyButton
          className="menu_btn game_btn"
          route={'/game'}
          isDisabled={isGameAvailable ? false : true}
          onClickButton={updateStore}
        >
          Let&apos;s start the Game
        </MyButton>
      </div>
    </section>
  );
};
export default MultiPlayer;
