export type GameStoreType = {
  score: number;
  topScores: string[];
  players: Players[];
};

export type LatLng = {
  lat: number;
  lng: number;
};

export interface IData {
  city: string;
  latLng: LatLng;
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

export type Players = {
  id: number;
  name: string;
  points: number;
};
