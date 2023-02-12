import React, { useEffect, useState } from 'react';
import { GoogleMapProvider, MapBox, Marker, Polyline, StandaloneStreetView } from '@googlemap-react/core';

import { useAppDispatch, useAppSelector } from '../../../hooks/userHooks';
import { LatLng, Players, PointLatLng } from '../../../types/gameInterface';
import { calculateDistance, getCoordinates, singlePointsCounter } from '../../../utils/utilities';
import MyButton from '../../MyButton/MyButton';

const { REACT_APP_API_KEY } = process.env;

interface MultiGameMapProps {
  questionNum: number;
  propsLatLng: PointLatLng;
  onAnswerHandler: (distance: number) => void;
  switchMarker: boolean;
}

const MultiGameMap: React.FC<MultiGameMapProps> = ({ questionNum, propsLatLng, onAnswerHandler, switchMarker }) => {
  // const [userDistance, setUserDistance] = useState<number>();
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.game);
  const [gamePlayers, setGamePlayers] = useState<Players[]>(players);
  const [userPoint, setUserPoint] = useState<LatLng>({ lat: 0, lng: 0 });
  const [answerPoint, setAnswerPoint] = useState<LatLng>(propsLatLng);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isClicked, setIsClicked] = useState(switchMarker);

  const onClick = (event: google.maps.MapMouseEvent) => {
    console.log('lat=', event.latLng.lat(), 'lng=', event.latLng.lng());

    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat: lat, lng: lng });
    setIsClicked(true);
  };

  const handleGuess = () => {
    console.log('userPoint=', userPoint);
    const distance = calculateDistance(answerPoint, userPoint);
    console.log('distance=', distance + 'km');
    onAnswerHandler(distance);
    addOpponentsMarkers();
  };

  const addOpponentsMarkers = () => {
    console.log(gamePlayers);
    const copyArray: Array<Players> = JSON.parse(JSON.stringify(gamePlayers));
    console.log(copyArray);
    const newCopyPlayers: Players[] = copyArray.map((player: Players) => {
      console.log('player=', player);
      let points: number;
      if (player.id === 0) {
        player.latLng = userPoint;
        points = singlePointsCounter(calculateDistance(userPoint, answerPoint));
      } else {
        const latLng = getCoordinates(answerPoint);
        console.log('latLng=', latLng);
        player.latLng = latLng;
        points = calculateDistance(latLng, answerPoint);
      }
      console.log('points=', points);
      player.points = points;
      player.playerScore = player.playerScore + points;
      return player;
    });
    console.log('copyPlayers=', newCopyPlayers);
    setIsClicked(false);
    setGamePlayers(newCopyPlayers);
    setIsAnswered(true);
  };

  useEffect(() => {
    setIsAnswered(false);
    setAnswerPoint(propsLatLng);
    setIsClicked(switchMarker);
  }, [questionNum, switchMarker]);

  return (
    <GoogleMapProvider>
      <MapBox
        className="question-map"
        opts={{
          zoom: 7,
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
      <StandaloneStreetView
        style={{
          height: '100%',
          width: '100%',
        }}
        opts={{
          position: propsLatLng,
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
              icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            }}
          />
          {gamePlayers.map((player: Players, index: number) => (
            <Marker
              id={`marker${player.id}`}
              key={100 + index}
              opts={{
                label: `${player.name}`,
                position: player.latLng,
              }}
            />
          ))}
          {gamePlayers.map((player: Players, index: number) => (
            <Polyline
              id={`polyline${player.id}`}
              key={200 + index}
              opts={{
                path: [
                  { lat: Number(answerPoint?.lat), lng: Number(answerPoint?.lng) },
                  { lat: Number(player.latLng?.lat), lng: Number(player.latLng?.lng) },
                ],
              }}
            />
          ))}
        </>
      ) : (
        ''
      )}
      {isClicked ? (
        <>
          <Marker
            id="marker0"
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

export default MultiGameMap;
