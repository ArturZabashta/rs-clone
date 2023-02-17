import React, { useEffect, useState } from 'react';
import { GoogleMapProvider, MapBox, Marker, Polyline, StreetView } from '@googlemap-react/core';
import useSound from 'use-sound';

import { useAppDispatch, useAppSelector } from '../../../hooks/userHooks';
import soundGuess from '../../../sounds/guess_sound.mp3';
import { setPlayersTeam } from '../../../store/gameSlice';
import { IPlayer, LatLng, PointLatLng } from '../../../types/gameInterface';
import { calculateDistance, getCoordinates, singlePointsCounter } from '../../../utils/utilities';
import MyButton from '../../MyButton/MyButton';

const { REACT_APP_API_KEY } = process.env;

interface MultiGameMapProps {
  questionNum: number;
  propsLatLng: PointLatLng;
  onAnswerHandler: () => void;
  switchMarker: boolean;
}

const MultiGameMap: React.FC<MultiGameMapProps> = ({ questionNum, propsLatLng, onAnswerHandler, switchMarker }) => {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.game);
  const { isSoundOn, musicVolume, effectsVolume } = useAppSelector((state) => state.game);

  const [userPoint, setUserPoint] = useState<LatLng>({ lat: 0, lng: 0 });
  const [answerPoint, setAnswerPoint] = useState<LatLng>(propsLatLng);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isClicked, setIsClicked] = useState(switchMarker);

  const [playGuess] = useSound(soundGuess, { volume: effectsVolume });

  const onClick = (event: google.maps.MapMouseEvent) => {
    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat: lat, lng: lng });
    setIsClicked(true);
  };

  const handleGuess = () => {
    addOpponentsMarkers();
    isSoundOn && playGuess();
  };

  const addOpponentsMarkers = () => {
    const copyArray: Array<IPlayer> = JSON.parse(JSON.stringify(players));
    const newCopyPlayers: Array<IPlayer> = copyArray.map((player: IPlayer) => {
      let points: number;
      if (player.id === 0) {
        player.latLng = userPoint;
        points = singlePointsCounter(calculateDistance(userPoint, answerPoint));
      } else {
        const latLng = getCoordinates(answerPoint);
        player.latLng = latLng;
        points = calculateDistance(latLng, answerPoint);
      }
      player.points = points;
      player.playerScore = player.playerScore + points;
      return player;
    });

    setIsClicked(false);
    dispatch(setPlayersTeam(newCopyPlayers));
    setIsAnswered(true);
    onAnswerHandler();
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
          zoom: 8,
          center: { lat: 51.4772186, lng: 0.0001 },
          streetViewControl: false,
          disableDefaultUI: true,
          scrollwheel: true,
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
        LoadedComponent={null}
        useGeometry
        useDrawing
        usePlaces
      />
      <StreetView
        className="streetView"
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
            id="marker007"
            opts={{
              position: {
                lat: Number(answerPoint?.lat),
                lng: Number(answerPoint?.lng),
              },
              icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            }}
          />
          {players.map((player: IPlayer, index: number) => (
            <Marker
              id={`marker${player.id}`}
              key={100 + index}
              opts={{
                label: `${player.name}`,
                position: player.latLng,
              }}
            />
          ))}
          {players.map((player: IPlayer, index: number) => (
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
