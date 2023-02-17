import React, { useEffect, useState } from 'react';
import { GoogleMapProvider, MapBox, Marker, Polyline, StreetView } from '@googlemap-react/core';
import useSound from 'use-sound';

import { useAppSelector } from '../../../hooks/userHooks';
import soundGuess from '../../../sounds/guess_sound.mp3';
import { PointLatLng } from '../../../types/gameInterface';
import { calculateDistance } from '../../../utils/utilities';
import MyButton from '../../MyButton/MyButton';

const { REACT_APP_API_KEY } = process.env;

interface MapProps {
  questionNum: number;
  pointLatLng: PointLatLng;
  onAnswerHandler: (distance: number) => void;
  switchMarker: boolean;
}

const SingleGameMap: React.FC<MapProps> = ({ questionNum, pointLatLng, onAnswerHandler, switchMarker }) => {
  const [userPoint, setUserPoint] = useState<PointLatLng>({ lat: 0, lng: 0 });
  const [answerPoint, setAnswerPoint] = useState<PointLatLng>(pointLatLng);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isClicked, setIsClicked] = useState(switchMarker);
  const { isSoundOn, effectsVolume } = useAppSelector((state) => state.game);
  const [playGuess] = useSound(soundGuess, { volume: effectsVolume });

  const onClick = (event: google.maps.MapMouseEvent) => {
    console.log('lat=', event.latLng.lat(), 'lng=', event.latLng.lng());

    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat, lng });
    setIsClicked(true);
  };

  const handleGuess = () => {
    setIsAnswered(true);
    console.log('userPoint=', userPoint);
    const distance = calculateDistance(answerPoint, userPoint);
    console.log('distance=', distance + 'km');
    onAnswerHandler(distance);
    isSoundOn && playGuess();
  };

  useEffect(() => {
    setIsAnswered(false);
    setAnswerPoint(pointLatLng);
    setIsClicked(switchMarker);
  }, [questionNum, switchMarker]);

  return (
    <GoogleMapProvider>
      <MapBox
        className="question-map"
        opts={{
          zoom: 3,
          center: { lat: 51.4772186, lng: 0.0001 },
          streetViewControl: false,
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
          showRoadLabels: false,
          panControl: false,
          zoomControl: false,
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
              icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
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
      {isClicked ? (
        <>
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
        </>
      ) : (
        ''
      )}
    </GoogleMapProvider>
  );
};

export default SingleGameMap;
