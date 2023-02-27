import React from 'react';
import { useTranslation } from 'react-i18next';

import { ICustomGamesResp } from '../../types/gameInterface';
import VotesMaker from '../VotesMaker';

type ICustomGame = {
  game: ICustomGamesResp;
  gameHandler: () => void;
  gamesRender: () => void;
  setChosen: () => void;
  btnStyles: string;
};

export const CustomGame: React.FC<ICustomGame> = ({ game, gameHandler, gamesRender, setChosen, btnStyles }) => {
  const { t } = useTranslation();

  return (
    <div className="multiplayer_games__item">
      <p>{game.createdBy}</p>
      <p>{game.gameTitle}</p>
      <div
        onClick={() => {
          gameHandler();
          setChosen();
        }}
        className={btnStyles}
      >
        {t('multiplayer.select_game')}
      </div>
      {game._id !== '0' && <VotesMaker gamesRender={gamesRender} votes={game.votes} id={game._id}></VotesMaker>}
    </div>
  );
};
