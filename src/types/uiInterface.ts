export type UiStoreType = {
  user: string;
  currentPage: string;
  isLogin: boolean;
  isMenuOn: boolean;
  isSettingsOn: boolean;
  popUpMsg: string;
};

export type Props = {
  menuOn: boolean;
  setMenuOn: (v: boolean) => void;
};
