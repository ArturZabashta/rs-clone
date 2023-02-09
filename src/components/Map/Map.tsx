import React, { useState } from 'react';
import { GoogleMapProvider, MapBox, Marker, Polyline, StreetView } from '@googlemap-react/core';

import MyButton from '../MyButton/MyButton';

interface IUserPoint {
  lat: number;
  lng: number;
}

const { REACT_APP_API_KEY } = process.env;

const Map: React.FC = () => {
  const [userPoint, setUserPoint] = useState<IUserPoint>({ lat: 0, lng: 0 });
  const [answerPoint, setAnswerPoint] = useState<IUserPoint>({ lat: 42.345573, lng: -71.098326 });
  const [isAnswered, setIsAnswered] = useState(false);

  const onClick = (event: google.maps.MapMouseEvent) => {
    console.log('lat=', event.latLng.lat(), 'lng=', event.latLng.lng());

    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat, lng });
    console.log('userPoint=', userPoint);
  };

  const handleGuess = () => {
    setIsAnswered(true);
    console.log(
      google.maps.geometry.spherical.computeDistanceBetween(answerPoint, {
        lat: Number(userPoint?.lat),
        lng: Number(userPoint?.lng),
      }) /
        1000 +
        'км'
    );
  };

  return (
    <GoogleMapProvider>
      <MapBox
        className="question-map"
        opts={{
          zoom: 7,
          center: { lat: 42.345573, lng: -71.098326 },
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
          position: { lat: 42.345573, lng: -71.098326 },
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
