import { LatLng, PointLatLng } from '../types/gameInterface';
import { ITopScoreResp } from '../types/uiInterface';

export const singlePointsCounter = (distance: number): number => {
  const points = 3000 - distance > 0 ? 3000 - distance : 0;
  return points;
};

export const getDiapasonRandomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getCoordinates = (latLng: LatLng) => {
  let newLat: number;
  let newLng: number;

  do {
    newLat = latLng.lat + getDiapasonRandomNum(0, 5) * (Math.random() > 0.5 ? 1 : -1);
    newLng = latLng.lng + getDiapasonRandomNum(0, 20) * (Math.random() > 0.5 ? 1 : -1);
  } while (newLat > 180 && newLat < -180 && newLng > 90 && newLng < -90);

  const newLatLng: LatLng = { lat: newLat, lng: newLng };
  return newLatLng;
};

export const calculateDistance = (truePoint: PointLatLng, userPoint: PointLatLng) => {
  const distance = Math.ceil(google.maps.geometry.spherical.computeDistanceBetween(truePoint, userPoint) / 1000);
  return distance;
};

export const sendUserScore = async (score: number, isLogin: boolean) => {
  if (isLogin) {
    const token = sessionStorage.getItem('auth_token') as string;
    const request = await fetch('https://rsclone-server.onrender.com/score', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: score,
      }),
    });
    const { topScores }: ITopScoreResp = await request.json();
    console.log(topScores);
    return topScores;
  }
};
