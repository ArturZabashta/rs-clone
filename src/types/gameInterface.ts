export type GameStoreType = {
  score: number;
  topScores: string[];
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
