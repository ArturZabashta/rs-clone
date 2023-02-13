import React from 'react';

import { IPlayer } from '../../types/gameInterface';
import MyButton from '../MyButton/MyButton';
interface GameResultProps {
  allPlayers: IPlayer[];
  onContinueHandler: (remainingPlayers: IPlayer[]) => void;
}
const KilledPlayers: React.FC<GameResultProps> = ({ allPlayers, onContinueHandler }) => {
  const setKillPlayers = () => {
    const copyArray: IPlayer[] = JSON.parse(JSON.stringify(allPlayers));
    if (copyArray.length > 2) copyArray.pop();
    if (copyArray.length > 2) copyArray.pop();
    onContinueHandler(copyArray);
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
      }}
    >
      <p>{`Someone has to leave`}</p>
      {allPlayers.map((player: IPlayer, index: number) => (
        <h3 key={index}>{player.name}</h3>
      ))}
      <div>
        <MyButton className={'settings_btn'} onClickButton={setKillPlayers}>
          Continue
        </MyButton>
      </div>
    </div>
  );
};
export default KilledPlayers;
