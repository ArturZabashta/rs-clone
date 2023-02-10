import React, { useEffect, useState } from 'react';
import { GoogleMapProvider, MapBox, Marker, Polyline, StreetView } from '@googlemap-react/core';

import { PointLatLng } from '../../types/gameInterface';
import MyButton from '../MyButton/MyButton';

const { REACT_APP_API_KEY } = process.env;

interface MapProps {
  questionNum: number;
  pointLatLng: PointLatLng;
  onAnswerHandler: (distance: number) => void;
}

const Map: React.FC<MapProps> = ({ questionNum, pointLatLng, onAnswerHandler }) => {
  // const [userDistance, setUserDistance] = useState<number>();
  const [userPoint, setUserPoint] = useState<PointLatLng>({ lat: 0, lng: 0 });
  const [answerPoint, setAnswerPoint] = useState<PointLatLng>(pointLatLng);
  const [isAnswered, setIsAnswered] = useState(false);

  const onClick = (event: google.maps.MapMouseEvent) => {
    console.log('lat=', event.latLng.lat(), 'lng=', event.latLng.lng());

    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat, lng });
  };

  const handleGuess = () => {
    setIsAnswered(true);
    console.log('userPoint=', userPoint);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(answerPoint, userPoint) / 1000;
    console.log('distance=', distance + 'km');
    onAnswerHandler(distance);
  };

  useEffect(() => {
    setIsAnswered(false);
    setAnswerPoint(pointLatLng);
  }, [questionNum]);

  return (
    <GoogleMapProvider>
      <MapBox
        className="question-map"
        opts={{
          zoom: 7,
          center: { lat: 51.4772186, lng: 0.0001 },
          streetViewControl: true,
          disableDefaultUI: true,
          zoomControl: true,
        }}
        apiKey={REACT_APP_API_KEY}
        style={{
          height: '33vh',
          width: '33vh',
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          zIndex: '2',
        }}
        onClick={onClick}
        LoadingComponent={<div>Loading</div>}
        useGeometry
      />
      <StreetView
        style={{
          height: '100%',
          width: '100%',
        }}
        opts={{
          position: pointLatLng,
          addressControl: false,
        }}
      />
      {isAnswered ? (
        <>
          <Marker
            id="marker1"
            opts={{
              position: {
                lat: Number(answerPoint?.lat),
                lng: Number(answerPoint?.lng),
              },
            }}
          />
          <Polyline
            id="polyline"
            opts={{
              path: [
                { lat: Number(answerPoint?.lat), lng: Number(answerPoint?.lng) },
                { lat: Number(userPoint?.lat), lng: Number(userPoint?.lng) },
              ],
            }}
          />
        </>
      ) : (
        ''
      )}
      <Marker
        id="marker2"
        opts={{
          position: {
            lat: Number(userPoint?.lat),
            lng: Number(userPoint?.lng),
          },
        }}
      />
      <MyButton className={'guess_btn'} onClickButton={handleGuess}>
        GUESS
      </MyButton>
    </GoogleMapProvider>
  );
};

export default Map;
