import React from 'react';

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
  const setKillPlayers = () => {
    const copyArray: IPlayer[] = JSON.parse(JSON.stringify(players));
    const killedPlayers = copyArray.splice(copyArray.length - 2);

    if (killedPlayers.find((player: IPlayer) => player.id === 0) !== undefined) {
      console.log('You Lose:(');
      dispatch(setIsLoosedGame(true));
    }
    console.log('Array after killed', copyArray);
    dispatch(setPlayersTeam(copyArray));
    onContinueHandler();
  };

  return (
    <div
      className={'game_result'}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        zIndex: '10',
        top: '0',
        left: '0',
        paddingTop: '7rem',
      }}
    >
      <h2>{`Someone has to leave`}</h2>
      {players.map((player: IPlayer, index: number) =>
        index === players.length - 2 || index === players.length - 1 ? (
          <h3 key={index} style={{ color: 'red' }}>
            {player.name}
          </h3>
        ) : (
          <h3 key={index}>{player.name}</h3>
        )
      )}
      <div>
        <MyButton className={'settings_btn'} onClickButton={setKillPlayers}>
          Continue
        </MyButton>
      </div>
    </div>
  );
};
export default KilledPlayers;
