import React, { useEffect, useState } from 'react';
import { GoogleMapProvider, MapBox, Marker, StreetView } from '@googlemap-react/core';

import MyButton from '../../components/MyButton/MyButton';
import isoData, { ISOData } from '../../constants/iso3166';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setUsersGames } from '../../store/gameSlice';
import { LatLng, PointLatLng } from '../../types/gameInterface';
import { IData } from '../../types/gameInterface';

const { REACT_APP_API_KEY } = process.env;

const GameConstructor: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLogin, username } = useAppSelector((state) => state.ui);
  const { usersGames } = useAppSelector((state) => state.game);

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

  const onClick = async (event: google.maps.MapMouseEvent) => {
    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat, lng });

    setIsClicked(true);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&key=${REACT_APP_API_KEY}`
    );
    const request = await response.json();
    console.log('response.status=', response.status);
    if (response.status === 200) {
      const googleRequestArray = request.plus_code.compound_code.split(',');
      const countryName = googleRequestArray.pop().trim();
      const cityData = googleRequestArray.shift();
      const cityBeginPos = cityData.indexOf(' ');
      const cityName = [cityData.slice(cityBeginPos).trim(), ...googleRequestArray].join(', ');
      console.log('request', request);
      console.log('request.plus_code.compound_code', request.plus_code.compound_code);
      console.log('userPoint', userPoint);
      console.log('city', cityName);
      console.log('country', countryName);

      const isoCountry = isoData.find(
        (data: ISOData) => Object.keys(data).find((key) => data[key] === `${countryName}`) !== undefined
      );
      if (isoCountry) {
        const continent = String(isoCountry[`Time Zone in Capital`]).slice(
          0,
          String(isoCountry[`Time Zone in Capital`]).indexOf('/')
        );
        console.log('isoCountry', isoCountry.ISO2);
        setUserFlagLink(`https://flagcdn.com/256x192/${isoCountry.ISO2}.png`);
        setUserContinent(continent);
        const responseUTC = await fetch(`https://worldtimeapi.org/api/timezone/${continent}/${isoCountry.Capital}`);
        const requestUTC = await responseUTC.json();

        // console.log('requestUTC', requestUTC.utc_offset);
        setUserUTC(requestUTC.utc_offset);
      }

      setUserCity(cityName);
      setUserCountry(countryName);
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
    const newGame = {
      id: 0,
      userName: username,
      gameTitle: gameTitle,
      likes: 1,
      userQuestions: questionArray,
    };
    dispatch(setUsersGames(newGame));
    stateGameReset();
  };

  useEffect(() => {
    if (questionArray.length === 9 && gameTitle !== '') {
      console.log('Блок вопросов готов');
      setIsFull(true);
    }
    console.log('Массив вопросов обновлен!', questionArray);
  }, [questionArray, gameTitle]);

  useEffect(() => {
    if (userCity !== '' && userCountry !== '' && userFlagLink !== '' && userContinent !== '' && userUTC !== '') {
      setIsCorrect(true);
    }
  }, [userCity, userCountry, userFlagLink, userContinent, userUTC]);

  useEffect(() => {
    console.log('Массив ИГР обновлен!', usersGames);
  }, [usersGames]);

  return (
    <section className="constructor">
      <GoogleMapProvider>
        <p className="constructor_count">{`Count questions #${questionArray.length}`}</p>
        <div className="constructor_wrapper">
          <MapBox
            className="constructor_wrapper__map"
            opts={{
              zoom: 3,
              center: center,
              streetViewControl: true,
            }}
            apiKey={REACT_APP_API_KEY}
            style={{
              height: mapSize,
              width: mapSize,
            }}
            onRightClick={onClick}
            LoadingComponent={<div>Loading</div>}
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
            {`Place: `}
            <p>{userCity}</p>
          </div>
          <div className="constructor_question__item">
            {`Country: `}
            <p>{userCountry}</p>
          </div>
          <div className="constructor_question__item">
            {`Continent: `}
            <p>{userContinent}</p>
          </div>
          <div className="constructor_question__item">
            {`UTC: `}
            <p>{userUTC}</p>
          </div>
          <div
            className="constructor_question__item"
            style={{ backgroundImage: `url('${userFlagLink.toLowerCase()}')` }}
          ></div>
          <MyButton className={'guess_btn'} onClickButton={handleAdd} isDisabled={!isCorrect}>
            Add
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
          Send to server
        </MyButton>
      </GoogleMapProvider>
    </section>
  );
};
export default React.memo(GameConstructor);
