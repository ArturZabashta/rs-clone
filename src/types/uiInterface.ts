import { IData } from './gameInterface';

export type UiStoreType = {
  username: string;
  currentPage: string;
  isLogin: boolean;
  isMenuOn: boolean;
  isSettingsOn: boolean;
  popUpMsg: string;
  userToken: string;
};

export type Props = {
  menuOn: boolean;
  setMenuOn: (v: boolean) => void;
};

export interface IBestScore {
  username: string;
  score: number;
}

export interface IScoreSendResp {
  totalScore: number;
}

export type LSData = {
  username: string;
  token: string;
  totalScore: number;
};

export interface IUserScores {
  date: number;
  score: number;
}
