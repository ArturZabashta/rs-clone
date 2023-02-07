import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UiType } from '../types/uiInterface';

const initialState: UiType = {
  user: '',
  currentPage: '',
  isLogin: false,
  isMenuOn: false,
  isSettingsOn: false,
  score: 0,
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
  },
});

export const { setCurrentPage, setIsLogin, setIsMenuOn, setIsSettingsOn } = uiSlice.actions;

export default uiSlice.reducer;
