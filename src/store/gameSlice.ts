import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameStoreType } from '../types/gameInterface';

const initialState: GameStoreType = {
  score: 0,
  topScores: [],
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
  },
});

export const { setScore, setTopScores } = gameSlice.actions;

export default gameSlice.reducer;
