import React, { useEffect, useState } from 'react';
import { GoogleMapProvider, MapBox, Marker, Polyline, StreetView } from '@googlemap-react/core';

import MyButton from '../../components/MyButton/MyButton';
import isoData, { ISOData } from '../../constants/iso3166';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { LatLng, PointLatLng } from '../../types/gameInterface';

const { REACT_APP_API_KEY } = process.env;

const GameConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.ui);

  const [isClicked, setIsClicked] = useState(false);
  const [questionArray, setQuestionArray] = useState<LatLng[]>([]);
  const [userPoint, setUserPoint] = useState<PointLatLng>({ lat: 0, lng: 0 });
  const [center, setCenter] = useState<LatLng>({ lat: 51.4772186, lng: 0.0001 });
  const [viewLatLng, setViewLatLng] = useState<LatLng>(userPoint);
  const [mapSize, setMapSize] = useState('100%');

  const [userCity, setUserCity] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userFlagLink, setUserFlagLink] = useState('');
  const [userContinent, setUserContinent] = useState('');
  const [userUTC, setUserUTC] = useState('');

  const onClick = async (event: google.maps.MapMouseEvent) => {
    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());

    setUserPoint({ lat, lng });
    setViewLatLng(userPoint);
    setIsClicked(true);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${REACT_APP_API_KEY}`
    );
    const request = await response.json();
    console.log('response.status=', response.status);
    if (response.status === 200) {
      const cityData = request.plus_code.compound_code.split(',')[0];
      const countryName = request.plus_code.compound_code.split(',').pop().trim();
      const cityBeginPos = cityData.indexOf(' ');
      const cityName = cityData.slice(cityBeginPos).trim();
      console.log('request', request);
      console.log('request.plus_code.compound_code', request.plus_code.compound_code);
      console.log('userPoint', userPoint);
      console.log('city', cityName);
      console.log('country', countryName);
      // const flagLink = await fetch(`https://countryflagsapi.com/svg/${countryName}`);
      // const timeData = await fetch(`https://htmlweb.ru/json/geo/timezone/${lat},${lng}`);
      // const requestFlag = await flagLink;

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
        console.log('requestUTC', requestUTC.utc_offset);
        setUserUTC(requestUTC.utc_offset);
      }
      // console.log('Object.keys(isoData)', Object.keys(isoData));

      setUserCity(cityName);
      setUserCountry(countryName);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPositionChanged = (data: any) => {
    console.log(data);
  };

  const handleAdd = () => {
    console.log('Добавлена точка');
  };

  useEffect(() => {
    console.log('viewLatLng', viewLatLng);
  }, [viewLatLng]);

  return (
    <section className="constructor">
      <GoogleMapProvider>
        <p className="constructor_title">Constructor</p>
        <div className="constructor_wrapper" style={{ width: '100%', height: '80%', display: 'flex' }}>
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
              position: viewLatLng,
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
              <MyButton className={'guess_btn'} onClickButton={handleAdd}>
                GUESS
              </MyButton>
            </>
          ) : (
            ''
          )}
        </div>
        <div
          className="user-question"
          style={{
            color: 'black',
            width: '9rem',
            height: '7rem',
            border: 'solid 2px white',
            backgroundImage: `url('${userFlagLink.toLowerCase()}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <p>{userCity}</p>
          <p>{userCountry}</p>
          <p>{userContinent}</p>
          <p>{userUTC}</p>
        </div>
      </GoogleMapProvider>
    </section>
  );
};
export default React.memo(GameConstructor);
