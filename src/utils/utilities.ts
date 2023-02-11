export const SinglePointsCounter = (distance: number): number => {
  const points = 3000 - distance > 0 ? 3000 - distance : 0;
  return points;
};

export const getDiapasonRandomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
