import { ICustomGamesResp, IPlayer } from '../types/gameInterface';

import { gameView } from './places-data';

export const DEFAULT_PLAYER: IPlayer = {
  id: 0,
  name: 'Player',
  points: 0,
  playerScore: 0,
  latLng: { lat: 0, lng: 0 },
};

export const HOST_NAME = 'https://rsclone-server.onrender.com';
// export const HOST_NAME = 'http://localhost:4000';

export const DEFAULT_GAMES_ARRAY: ICustomGamesResp = {
  _id: '0',
  createdBy: 'Developers',
  gameTitle: 'DevGame',
  votes: 1,
  gameSet: gameView,
  createdDate: 111111111,
};
