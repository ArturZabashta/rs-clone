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

export interface ITopScoreResp {
  topScores: string[];
}
