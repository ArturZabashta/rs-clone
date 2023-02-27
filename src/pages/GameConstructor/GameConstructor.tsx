import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleMapProvider, MapBox, Marker, StreetView } from '@googlemap-react/core';

import MyButton from '../../components/MyButton/MyButton';
import isoData, { ISOData } from '../../constants/iso3166';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
// import { setUsersGames } from '../../store/gameSlice';
import { setIsLogin, setPopUpMsg } from '../../store/uiSlice';
import { LatLng, PointLatLng } from '../../types/gameInterface';
import { IData } from '../../types/gameInterface';
import { setCustomGame } from '../../utils/utilities';

const { REACT_APP_API_KEY } = process.env;

const GameConstructor: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLogin, username } = useAppSelector((state) => state.ui);
  const { gamesArray } = useAppSelector((state) => state.game);

  const { t } = useTranslation();

  const [isClicked, setIsClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [questionArray, setQuestionArray] = useState<IData[]>([]);
  const [userPoint, setUserPoint] = useState<PointLatLng>({ lat: 0, lng: 0 });
  const [center, setCenter] = useState<LatLng>({ lat: 51.4772186, lng: 0.0001 });

  const [mapSize, setMapSize] = useState('100%');

  const [userCity, setUserCity] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userFlagLink, setUserFlagLink] = useState('');
  const [userContinent, setUserContinent] = useState('');
  const [userUTC, setUserUTC] = useState('');

  const [gameTitle, setGameTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async (event: google.maps.MapMouseEvent) => {
    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat, lng });

    setIsClicked(true);
    if (questionArray.length < 9) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&key=${REACT_APP_API_KEY}`
        );
        const request = await response.json();

        if (response.status === 200) {
          const googleRequestArray = request.plus_code.compound_code.split(',');
          const countryName = googleRequestArray.pop().trim();
          const cityData = googleRequestArray.shift();
          const cityBeginPos = cityData.indexOf(' ');
          const cityName = [cityData.slice(cityBeginPos).trim(), ...googleRequestArray].join(', ');

          setUserCity(cityName);
          setUserCountry(countryName);

          const isoCountry = isoData.find(
            (data: ISOData) => Object.keys(data).find((key) => data[key] === `${countryName}`) !== undefined
          );
          if (isoCountry) {
            const continent = String(isoCountry.Time_Zone).slice(0, String(isoCountry.Time_Zone).indexOf('/'));

            setUserFlagLink(`https://flagcdn.com/256x192/${String(isoCountry.ISO2).toLowerCase()}.png`);
            setUserContinent(continent);
            const responseUTC = await fetch(`https://worldtimeapi.org/api/timezone/${isoCountry.Time_Zone}`);
            setIsLoading(true);
            setTimeout(async function getUTC() {
              if (isoCountry) {
                const requestUTC = await responseUTC.json();

                if (requestUTC) {
                  // console.log('requestUTC', requestUTC.utc_offset);
                  setUserUTC(requestUTC.utc_offset);
                }
                setIsLoading(false);
              }
            }, 3500);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAdd = () => {
    const newQuestion: IData[] = [
      {
        city: userCity,
        latLng: userPoint,
        utc: userUTC,
        continent: userContinent,
        picture: userFlagLink,
      },
    ];
    setQuestionArray([...questionArray, ...newQuestion]);
    setIsClicked(false);

    stateQuestionReset();
  };

  const stateQuestionReset = () => {
    setUserCity('');
    setUserCountry('');
    setUserFlagLink('');
    setUserContinent('');
    setUserUTC('');
    setUserPoint({ lat: 0, lng: 0 });
    setIsCorrect(false);
    // console.log('Массив вопросов обновлен!', questionArray);
  };

  const stateGameReset = () => {
    stateQuestionReset();
    setGameTitle('');
    setQuestionArray([]);
  };

  const handleSendGameTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameTitle(event.target.value);
  };

  const handleSend = () => {
    setCustomGame(questionArray, username, gameTitle).then((res) => dispatch(setPopUpMsg(res)));
    stateGameReset();
  };

  useEffect(() => {
    if (questionArray.length === 9 && gameTitle !== '') {
      // console.log('Блок вопросов готов');
      setIsFull(true);
    }
    // console.log('Массив вопросов обновлен!', questionArray);
  }, [questionArray, gameTitle]);

  useEffect(() => {
    if (userCity !== '' && userCountry !== '' && userFlagLink !== '' && userContinent !== '' && userUTC !== '') {
      setIsCorrect(true);
    }
  }, [userCity, userCountry, userFlagLink, userContinent, userUTC]);

  return (
    <section className="constructor">
      <GoogleMapProvider>
        <p className="constructor_count">{t('constructor.questions_count', { count: questionArray.length })}</p>
        <div className="constructor_wrapper">
          <MapBox
            className="constructor_wrapper__map"
            opts={{
              zoom: 3,
              center: center,
              streetViewControl: true,
              zoomControl: true,
            }}
            apiKey={REACT_APP_API_KEY}
            style={{
              height: mapSize,
              width: mapSize,
            }}
            onRightClick={onClick}
            LoadingComponent={<div>{t('game.loading')}</div>}
            useGeometry
          />
          <StreetView
            className="constructor_wrapper__streetview"
            opts={{
              position: userPoint,
              addressControl: false,
              showRoadLabels: false,
              panControl: false,
              zoomControl: false,
            }}
            style={{
              height: mapSize,
              width: mapSize,
            }}
          />
        </div>

        <div className="constructor_question">
          <div className="constructor_question__item">
            {t('constructor.place')}
            <p>{userCity}</p>
          </div>
          <div className="constructor_question__item">
            {t('constructor.country')}
            <p>{userCountry}</p>
          </div>
          <div className="constructor_question__item">
            {t('constructor.location')}
            <p>{userContinent}</p>
          </div>
          <div className="constructor_question__item">
            {t('constructor.UTC')}
            <p>{userUTC}</p>
          </div>
          <div
            className="constructor_question__item"
            style={{ backgroundImage: `url('${userFlagLink.toLowerCase()}')` }}
          ></div>
          <MyButton className={'guess_btn'} onClickButton={handleAdd} isDisabled={!isCorrect}>
            {t('constructor.add_data')}
          </MyButton>
        </div>
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
          </>
        ) : (
          ''
        )}
        <input
          className="constructor_input"
          type="text"
          placeholder="Add your Game title"
          value={gameTitle}
          onChange={handleSendGameTitle}
        ></input>
        <MyButton className={'guess_btn'} onClickButton={handleSend} isDisabled={!isFull}>
          {t('constructor.send_data')}
        </MyButton>
      </GoogleMapProvider>
      {isLoading ? <div className="constructor_modal spinner"></div> : ''}
    </section>
  );
};
export default GameConstructor;
