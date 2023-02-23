import React, { useEffect, useState } from 'react';
import { GoogleMapProvider, MapBox, Marker, Polyline, StreetView } from '@googlemap-react/core';
import useSound from 'use-sound';

import { gameView } from '../../../constants/places-data';
import { useAppDispatch, useAppSelector } from '../../../hooks/userHooks';
import soundGuess from '../../../sounds/guess_sound.mp3';
import { setMissedAnswer, setPlayersTeam } from '../../../store/gameSlice';
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
  const { username } = useAppSelector((state) => state.ui);
  const { players } = useAppSelector((state) => state.game);

  const { missedAnswer } = useAppSelector((state) => state.game);

  const { isSoundOn, effectsVolume } = useAppSelector((state) => state.game);

  const [userPoint, setUserPoint] = useState<LatLng>({ lat: 0, lng: 0 });
  const [answerPoint, setAnswerPoint] = useState<LatLng>(propsLatLng);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isClicked, setIsClicked] = useState(switchMarker);

  const [center, setCenter] = useState<LatLng>({ lat: 51.4772186, lng: 0.0001 });
  const [mapSize, setMapSize] = useState('13vw');
  const [showUTS, setShowUTS] = useState(false);
  const [showContinent, setShowContinent] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  const [playGuess] = useSound(soundGuess, { volume: effectsVolume });

  const onClick = (event: google.maps.MapMouseEvent) => {
    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat: lat, lng: lng });
    setIsClicked(true);
    setMapSize('56vh');
  };

  const handleGuess = () => {
    addOpponentsMarkers();

    setShowUTS(false);
    setShowContinent(false);
    setShowFlag(false);
    setMapSize('56vh');
    setCenter(answerPoint);

    isSoundOn && playGuess();
  };

  const addOpponentsMarkers = () => {
    const copyArray: Array<IPlayer> = JSON.parse(JSON.stringify(players));
    const newCopyPlayers: Array<IPlayer> = copyArray.map((player: IPlayer) => {
      let points: number;
      if (missedAnswer && player.id === 0) return player;
      if (!missedAnswer && player.id === 0) {
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
    dispatch(setMissedAnswer(false));
  };

  const onMouseMove = () => {
    setMapSize('56vh');
  };
  const onMouseOut = () => {
    if (!isClicked) setMapSize('13vh');
  };
  const onPovChanged = () => {
    setMapSize('13vh');
  };

  const handleUTSBtn = () => {
    setShowUTS(true);
  };
  const handleContinentBtn = () => {
    setShowContinent(true);
  };
  const handleFlagBtn = () => {
    setShowFlag(true);
  };

  useEffect(() => {
    setIsAnswered(false);
    setAnswerPoint(propsLatLng);
    setIsClicked(switchMarker);
  }, [questionNum, switchMarker]);

  useEffect(() => {
    if (missedAnswer) {
      setUserPoint(answerPoint);
      setIsClicked(true);
      setMapSize('56vh');
      handleGuess();
    }
  }, [missedAnswer]);

  return (
    <GoogleMapProvider>
      <div className="multigame_question__help">
        {showUTS ? (
          <div className="multigame_question__utc">{`UTS: ${gameView[questionNum].utc}`}</div>
        ) : (
          <MyButton className="game_help__button" onClickButton={handleUTSBtn}>
            Get UTS
          </MyButton>
        )}
        {showContinent ? (
          <div className="multigame_question__continent">{gameView[questionNum].continent}</div>
        ) : (
          <MyButton className="game_help__button" onClickButton={handleContinentBtn}>
            Get Location
          </MyButton>
        )}
        {showFlag ? (
          <div
            className="multigame_question__flag"
            style={{ backgroundImage: `url('${gameView[questionNum].picture}')` }}
          ></div>
        ) : (
          <MyButton className="game_help__button" onClickButton={handleFlagBtn}>
            Get Flag
          </MyButton>
        )}
      </div>
      <MapBox
        className="multigame_question__map"
        opts={{
          zoom: 3,
          center: center,
          streetViewControl: false,
          disableDefaultUI: true,
          scrollwheel: true,
          zoomControl: false,
        }}
        apiKey={REACT_APP_API_KEY}
        onClick={onClick}
        LoadingComponent={<div>Loading</div>}
        LoadedComponent={null}
        useGeometry
        useDrawing
        usePlaces
        style={{
          height: mapSize,
          width: mapSize,
        }}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
      />
      <StreetView
        className="multigame_question__streetview"
        opts={{
          position: propsLatLng,
          addressControl: false,
          showRoadLabels: false,
          panControl: false,
          zoomControl: false,
        }}
        onPovChanged={onPovChanged}
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
          {players.map((player: IPlayer, index: number) => {
            if (missedAnswer && player.name === username) return;
            if (missedAnswer && player.name !== username) {
              return (
                <Marker
                  key={100 + index}
                  opts={{
                    label: `${player.name}`,
                    position: player.latLng,
                  }}
                />
              );
            }
            if (!missedAnswer) {
              return (
                <Marker
                  key={100 + index}
                  opts={{
                    label: `${player.name}`,
                    position: player.latLng,
                  }}
                />
              );
            }
          })}
          {players.map((player: IPlayer, index: number) => {
            if (missedAnswer && player.name === username) return;
            if (missedAnswer && player.name !== username) {
              return (
                <Polyline
                  key={200 + index}
                  opts={{
                    path: [
                      { lat: Number(answerPoint?.lat), lng: Number(answerPoint?.lng) },
                      { lat: Number(player.latLng?.lat), lng: Number(player.latLng?.lng) },
                    ],
                  }}
                />
              );
            }
            if (!missedAnswer) {
              return (
                <Polyline
                  key={200 + index}
                  opts={{
                    path: [
                      { lat: Number(answerPoint?.lat), lng: Number(answerPoint?.lng) },
                      { lat: Number(player.latLng?.lat), lng: Number(player.latLng?.lng) },
                    ],
                  }}
                />
              );
            }
          })}
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
          <MyButton className={'guess_btn btn_blue'} onClickButton={handleGuess}>
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
