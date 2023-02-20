import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UiStoreType } from '../types/uiInterface';

const initialState: UiStoreType = {
  username: '',
  currentPage: '',
  isLogin: false,
  isMenuOn: false,
  isSettingsOn: false,
  popUpMsg: '',
  userToken: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setIsMenuOn: (state, action: PayloadAction<boolean>) => {
      state.isMenuOn = action.payload;
    },
    setIsSettingsOn: (state, action: PayloadAction<boolean>) => {
      state.isSettingsOn = action.payload;
    },
    setPopUpMsg: (state, action: PayloadAction<string>) => {
      state.popUpMsg = state.popUpMsg === action.payload ? action.payload + ' ' : action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
  },
});

export const { setCurrentPage, setIsLogin, setIsMenuOn, setIsSettingsOn, setPopUpMsg, setUsername, setUserToken } =
  uiSlice.actions;

export default uiSlice.reducer;
