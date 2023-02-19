import { IPlayer } from '../types/gameInterface';

export const DEFAULT_PLAYER: IPlayer = {
  id: 0,
  name: '',
  points: 0,
  playerScore: 0,
  latLng: { lat: 0, lng: 0 },
};

export const HOST_NAME = 'https://rsclone-server.onrender.com';
// export const HOST_NAME = 'http://localhost:4000';
