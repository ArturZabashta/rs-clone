export type UiType = {
  user: string;
  currentPage: string;
  isLogin: boolean;
  isMenuOn: boolean;
  isSettingsOn: boolean;
  score: number;
  topScores: string[];
  popUpMsg: string;
};

export type Props = {
  menuOn: boolean;
  setMenuOn: (v: boolean) => void;
};
