export type LatLng = {
  lat: number;
  lng: number;
};

export interface IData {
  city: string;
  latLng: LatLng;
}

export type GameDataTransfer = {
  points: number;
  distance: number;
};

export type PointLatLng = {
  lat: number;
  lng: number;
};
