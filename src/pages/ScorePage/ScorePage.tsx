import React, { useEffect, useState } from 'react';

import { HOST_NAME } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/userHooks';
import { setPopUpMsg } from '../../store/uiSlice';
import { IBestScore, IUserScores, LSData } from '../../types/uiInterface';
import { getCustomGames, setCustomGame } from '../../utils/utilities';

import BestList from './BestList';
import ScoreList from './ScoreList';

interface IScoreRes {
  results: IBestScore[];
}
const set = [
  {
    city: 'Berlin',
    latLng: {
      lat: 52.5145764031481,
      lng: 13.377354934301469,
    },
    utc: '+1',
    continent: 'Europe',
    picture: ['https://i.artfile.ru/2560x1600_676534_[www.ArtFile.ru].jpg'],
  },
  {
    city: 'Rome',
    latLng: {
      lat: 41.887865084172255,
      lng: 12.490047967231975,
    },
    utc: '+1',
    continent: 'Europe',
    picture: [
      'https://media.istockphoto.com/photos/close-up-of-italys-flag-picture-id511092491?k=20&m=511092491&s=612x612&w=0&h=QqQ36iqd-eiHKajr2tvTLwe45XvPbIT4UfI1M84pzq8=',
    ],
  },
  {
    city: 'Paris',
    latLng: {
      lat: 48.85465502321166,
      lng: 2.2954584644941924,
    },
    utc: '+1',
    continent: 'Europe',
    picture: ['https://ak.picdn.net/shutterstock/videos/1050709000/thumb/1.jpg'],
  },
  {
    city: 'New-York',
    latLng: {
      lat: 40.68990579473295,
      lng: -74.0462613034221,
    },
    utc: '-5',
    continent: 'North America',
    picture: ['https://wallbox.ru/resize/2560x1600/wallpapers/main/201131/usa-flag-ssha-6a5e2a4.jpg'],
  },
  {
    city: 'Pisa',
    latLng: {
      lat: 43.72304789750336,
      lng: 10.395006932924831,
    },
    utc: '+1',
    continent: 'Europe',
    picture: [
      'https://kartinkin.net/uploads/posts/2021-07/1627099918_27-kartinkin-com-p-flag-italii-fon-krasivo-33.jpg',
    ],
  },
  {
    city: 'Sydney',
    latLng: {
      lat: -33.857131177277296,
      lng: 151.2156814056624,
    },
    utc: '+11',
    continent: 'Australia',
    picture: ['http://mobimg.b-cdn.net/v3/fetch/10/106d02419025d4d1f78d57cdeb1f41f0.jpeg'],
  },
  {
    city: 'London',
    latLng: {
      lat: 51.500997478243114,
      lng: -0.14060263024275393,
    },
    utc: '0',
    continent: 'Europe',
    picture: [
      'https://besthqwallpapers.com/Uploads/12-11-2017/28255/flag-of-united-kingdom-4k-grunge-stone-texture-british-flag.jpg',
    ],
  },
  {
    city: 'Nice',
    latLng: {
      lat: 43.702552432127256,
      lng: 7.280597672534793,
    },
    utc: '+1',
    continent: 'Europe',
    picture: ['https://ak.picdn.net/shutterstock/videos/1050709000/thumb/1.jpg'],
  },
  {
    city: 'Rio de Janeiro',
    latLng: {
      lat: -22.952084431129347,
      lng: -43.21167381403226,
    },
    utc: '-3',
    continent: 'South America',
    picture: ['https://oir.mobi/uploads/posts/2019-12/1575949570_31-54.jpg'],
  },
];
type IGetScores = (sort?: 'date' | 'score', order?: 'ASC' | 'DESC') => Promise<void>;

const ScorePage: React.FC = () => {
  const { username, isLogin } = useAppSelector((state) => state.ui);
  const [bestScores, setBestScores] = useState<IBestScore[]>([]);
  const [userScores, setUserScores] = useState<IUserScores[]>([]);
  const dispatch = useAppDispatch();

  const getScores: IGetScores = async (get = 'score', order = 'DESC') => {
    setUserScores([]);
    const userData: LSData = await JSON.parse(sessionStorage.getItem('userData') as string);
    const response = await fetch(HOST_NAME + '/score/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        AUTHORIZATION: userData.token,
      },
      body: JSON.stringify({
        get,
        order,
      }),
    });

    const { message, scoreArr } = await response.json();
    if (response.status === 200) {
      setUserScores(scoreArr.slice(0, 7));
    } else {
      dispatch(setPopUpMsg(message));
    }
  };

  useEffect(() => {
    fetch(HOST_NAME + '/best_score')
      .then((res) => res.json())
      .then((res: IScoreRes) => {
        setBestScores(res.results);
      });
    getScores();
  }, []);

  return (
    <section className="score-page" onClick={() => getCustomGames()}>
      <div className="score-page_item">
        <h2 className="score-page_title">Best Scores</h2>
        {bestScores.length === 0 ? <div className="spinner"></div> : <BestList scoreList={bestScores} />}
      </div>
      {isLogin && (
        <div className="score-page_item">
          <h2 className="score-page_title">
            <span style={{ textTransform: 'capitalize' }}>{username}&apos;s</span> high scores:
          </h2>
          <div className="score-page_sortBtns">
            <button className="score-page_sortBtn" onClick={() => getScores('score', 'DESC')}>
              Best
            </button>
            <button className="score-page_sortBtn" onClick={() => getScores('score', 'ASC')}>
              Worst
            </button>
            <button className="score-page_sortBtn" onClick={() => getScores('date', 'DESC')}>
              Newest
            </button>
            <button className="score-page_sortBtn" onClick={() => getScores('date', 'ASC')}>
              Oldest
            </button>
          </div>
          {userScores.length === 0 ? <div className="spinner"></div> : <ScoreList userScores={userScores} />}
        </div>
      )}
    </section>
  );
};
export default ScorePage;
