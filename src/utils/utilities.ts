import { LatLng, PointLatLng } from '../types/gameInterface';

export const singlePointsCounter = (distance: number): number => {
  const points = 3000 - distance > 0 ? 3000 - distance : 0;
  return points;
};

export const getDiapasonRandomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getCoordinates = (latLng: LatLng) => {
  let newLat: number;
  let newLng: number;
  console.warn('Input latLng', latLng);
  do {
    newLat = latLng.lat + getDiapasonRandomNum(0, 5) * (Math.random() > 0.5 ? 1 : -1);
    newLng = latLng.lng + getDiapasonRandomNum(0, 20) * (Math.random() > 0.5 ? 1 : -1);
  } while (newLat > 180 && newLat < -180 && newLng > 90 && newLng < -90);

  const newLatLng: LatLng = { lat: newLat, lng: newLng };
  console.warn('Output latLng', latLng);
  return newLatLng;
};

export const calculateDistance = (truePoint: PointLatLng, userPoint: PointLatLng) => {
  const distance = Math.ceil(google.maps.geometry.spherical.computeDistanceBetween(truePoint, userPoint) / 1000);
  return distance;
};
