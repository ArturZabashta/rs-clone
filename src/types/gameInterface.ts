export type GameStoreType = {
  score: number;
  topScores: string[];
  players: IPlayer[];
  isSoundOn: boolean;
  musicVolume: number;
  effectsVolume: number;
  level: number;
  round: number;
  isLoosedGame: boolean;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export interface IData {
  city: string;
  latLng: LatLng;
  utc: string;
  continent: string;
  picture: string[];
}

export type GameDataTransfer = {
  distance: number;
};

export type PointLatLng = {
  lat: number;
  lng: number;
};

export type Opponents = {
  id: number;
  name: string;
  surname: string;
  gender: string;
};

export type IPlayer = {
  id: number;
  name: string;
  points: number;
  latLng: LatLng;
  playerScore: number;
};
