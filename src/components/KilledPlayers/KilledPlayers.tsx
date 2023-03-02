import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setIsLoosedGame, setPlayersTeam } from '../../store/gameSlice';
import { IPlayer } from '../../types/gameInterface';
import MyButton from '../MyButton/MyButton';

interface GameResultProps {
  onContinueHandler: () => void;
}
const KilledPlayers: React.FC<GameResultProps> = ({ onContinueHandler }) => {
  const { players } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const setKillPlayers = () => {
    const copyArray: IPlayer[] = JSON.parse(JSON.stringify(players));
    const killedPlayers = copyArray.splice(copyArray.length - 2);

    if (killedPlayers.find((player: IPlayer) => player.id === 0) !== undefined) {
      dispatch(setIsLoosedGame(true));
    }

    dispatch(setPlayersTeam(copyArray));
    onContinueHandler();
  };

  return (
    <div className={'game_result'}>
      <h2> {t('killed.title')}</h2>

      <div className="winners_list" style={{ textAlign: 'center' }}>
        {players.map((player: IPlayer, index: number) =>
          index === players.length - 2 || index === players.length - 1 ? (
            <h3 key={index} style={{ color: 'red' }}>
              {player.name}
            </h3>
          ) : (
            <h3 key={index}>{player.name}</h3>
          )
        )}
      </div>

      <div>
        <MyButton className={'settings_btn'} onClickButton={setKillPlayers}>
          {t('killed.continue_btn')}
        </MyButton>
      </div>
    </div>
  );
};
export default KilledPlayers;
