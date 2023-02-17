import React, { useEffect, useState } from 'react';
import { GoogleMapProvider, MapBox, Marker, Polyline, StreetView } from '@googlemap-react/core';
import useSound from 'use-sound';

import { gameView } from '../../../constants/places-data';
import { useAppSelector } from '../../../hooks/userHooks';
import soundGuess from '../../../sounds/guess_sound.mp3';
import { LatLng, PointLatLng } from '../../../types/gameInterface';
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

  const [center, setCenter] = useState<LatLng>({ lat: 51.4772186, lng: 0.0001 });
  const [mapSize, setMapSize] = useState('13vw');

  const [showUTS, setShowUTS] = useState(false);
  const [showContinent, setShowContinent] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  const onClick = (event: google.maps.MapMouseEvent) => {
    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat, lng });
    setIsClicked(true);
    setMapSize('52vh');
  };

  const handleGuess = () => {
    setIsAnswered(true);
    const distance = calculateDistance(answerPoint, userPoint);
    onAnswerHandler(distance);
    isSoundOn && playGuess();
    setShowUTS(false);
    setShowContinent(false);
    setShowFlag(false);
    setCenter(answerPoint);
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
  const onMouseMove = () => {
    setMapSize('52vh');
  };
  const onMouseOut = () => {
    if (!isClicked) setMapSize('13vh');
  };
  const onPovChanged = () => {
    setMapSize('13vh');
  };

  useEffect(() => {
    setIsAnswered(false);
    setAnswerPoint(pointLatLng);
    setIsClicked(switchMarker);
  }, [questionNum, switchMarker]);

  return (
    <GoogleMapProvider>
      <div className="singleplayer_wrapper__help">
        {showUTS ? (
          <div className="singleplayer_question__utc">{`UTS: ${gameView[questionNum].utc}`}</div>
        ) : (
          <MyButton className="game_help__button" onClickButton={handleUTSBtn}>
            Get UTS
          </MyButton>
        )}
        {showContinent ? (
          <div className="singleplayer_question__continent">{gameView[questionNum].continent}</div>
        ) : (
          <MyButton className="game_help__button" onClickButton={handleContinentBtn}>
            Get Location
          </MyButton>
        )}
        {showFlag ? (
          <div
            className="singleplayer_question__flag"
            style={{ backgroundImage: `url('${gameView[questionNum].picture[0]}')` }}
          ></div>
        ) : (
          <MyButton className="game_help__button" onClickButton={handleFlagBtn}>
            Get Flag
          </MyButton>
        )}
      </div>
      <MapBox
        className="singleplayer_wrapper__map"
        opts={{
          zoom: 3,
          center: center,
          streetViewControl: false,
          disableDefaultUI: true,
          scrollwheel: true,
          zoomControl: false,
        }}
        apiKey={REACT_APP_API_KEY}
        style={{
          height: mapSize,
          width: mapSize,
        }}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onClick={onClick}
        LoadingComponent={<div>Loading</div>}
        useGeometry
      />
      <StreetView
        className="singleplayer_wrapper__streetview"
        opts={{
          position: pointLatLng,
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
