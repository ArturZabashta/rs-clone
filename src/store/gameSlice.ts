import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameStoreType, IPlayer } from '../types/gameInterface';

const initialState: GameStoreType = {
  score: 0,
  topScores: [],
  players: [],
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
    setPlayersTeam: (state, action: PayloadAction<Array<IPlayer>>) => {
      state.players = action.payload;
    },
  },
});

export const { setScore, setTopScores, setPlayersTeam } = gameSlice.actions;

export default gameSlice.reducer;
