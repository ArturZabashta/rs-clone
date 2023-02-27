import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomGame } from '../../components/CustomGames';
import MyButton from '../../components/MyButton/MyButton';
import { DEFAULT_GAMES_ARRAY, DEFAULT_PLAYER } from '../../constants/constants';
import { opponents } from '../../constants/opponents';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setCurrentGameId, setGamesArray, setPlayersTeam } from '../../store/gameSlice';
import { ICustomGamesResp, IPlayer } from '../../types/gameInterface';
import { getCustomGames, getDiapasonRandomNum } from '../../utils/utilities';

const MultiPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector((state) => state.ui);
  const { gamesArray, currentGameId } = useAppSelector((state) => state.game);
  const { t } = useTranslation();

  const [isFindClicked, setIsFindClicked] = useState<boolean>(false);
  const [isGameAvailable, setIsGameAvailable] = useState<boolean>(false);
  const [playersArray, setPlayersArray] = useState<IPlayer[]>([]);
  // const [customGames, setCustomGames] = useState<ICustomGamesResp[]>(usersGames);
  const [chosen, setChosen] = useState<number>(0);

  const setOpponents = () => {
    setPlayersArray([
      { id: 0, name: username === '' ? 'Player' : username, points: 0, playerScore: 0, latLng: { lat: 0, lng: 0 } },
    ]);
    setIsFindClicked(true);
  };

  const updateStore = () => {
    dispatch(setPlayersTeam(playersArray));
  };

  const handleGameClick = (ind: number) => {
    dispatch(setCurrentGameId(ind));
    // console.warn('Выбрана игра N=', ind);
    // console.warn('currentGameId=', currentGameId);
  };

  //получение кастомных игр
  const renderCustomGames = () => {
    getCustomGames().then((res) => dispatch(setGamesArray([DEFAULT_GAMES_ARRAY, ...res])));
  };

  useEffect(() => {
    renderCustomGames();
  }, [gamesArray]);

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
      <p className="multiplayer_title">{t('multiplayer.title_players')}</p>
      <div className="multiplayer_players">
        {playersArray.map((player: IPlayer) => (
          <div className="multiplayer_players__item" key={player.id}>
            <p>{player.name}</p>
          </div>
        ))}
      </div>
      <div className="multiplayer_nav">
        <MyButton className="menu_btn game_btn" onClickButton={setOpponents}>
          {t('multiplayer.find_opponents_btn')}
        </MyButton>
        <div className="multiplayer_games">
          {gamesArray.map((item, ind) => (
            <CustomGame
              key={item._id}
              game={item}
              gamesRender={renderCustomGames}
              btnStyles={
                chosen === ind ? 'multiplayer_game-select__active multiplayer_game-select' : 'multiplayer_game-select'
              }
              setChosen={() => setChosen(ind)}
              gameHandler={() => handleGameClick(ind)}
            />
          ))}
        </div>
        <MyButton
          className="menu_btn game_btn"
          route={'/game'}
          isDisabled={isGameAvailable ? false : true}
          onClickButton={updateStore}
        >
          {t('multiplayer.start_game_btn')}
        </MyButton>
      </div>
    </section>
  );
};
export default MultiPlayer;
