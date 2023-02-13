import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameStoreType } from '../types/gameInterface';

const initialState: GameStoreType = {
  score: 0,
  topScores: [],
  isSoundOn: true,
  musicVolume: 0.6,
  effectsVolume: 0.5,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = state.score + action.payload;
    },
    setTopScores: (state, action: PayloadAction<Array<string>>) => {
      state.topScores = action.payload;
    },
    setIsSoundOn: (state, action: PayloadAction<boolean>) => {
      state.isSoundOn = action.payload;
    },
    setMusicVolume: (state, action: PayloadAction<number>) => {
      state.musicVolume = action.payload;
    },
    setEffectsVolume: (state, action: PayloadAction<number>) => {
      state.effectsVolume = action.payload;
    },
  },
});

export const { setScore, setTopScores, setIsSoundOn, setEffectsVolume, setMusicVolume } = gameSlice.actions;

export default gameSlice.reducer;
