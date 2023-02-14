import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GameStoreType, IPlayer } from '../types/gameInterface';

const initialState: GameStoreType = {
  score: 0,
  topScores: [],
  players: [],
  isSoundOn: true,
  musicVolume: 0.6,
  effectsVolume: 0.5,
  level: 1,
  isLoosedGame: false,
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
    setIsSoundOn: (state, action: PayloadAction<boolean>) => {
      state.isSoundOn = action.payload;
    },
    setMusicVolume: (state, action: PayloadAction<number>) => {
      state.musicVolume = action.payload;
    },
    setEffectsVolume: (state, action: PayloadAction<number>) => {
      state.effectsVolume = action.payload;
    },
    setSortPlayersTeam: (state) => {
      state.players = state.players.sort((a: IPlayer, b: IPlayer) => b.playerScore - a.playerScore);
    },
    setLevel: (state) => {
      state.level = state.level + 1;
    },
    resetLevel: (state) => {
      state.level = 1;
    },
    setIsLoosedGame: (state, action: PayloadAction<boolean>) => {
      state.isLoosedGame = action.payload;
    },
  },
});

export const {
  setScore,
  setTopScores,
  setPlayersTeam,
  setIsSoundOn,
  setEffectsVolume,
  setMusicVolume,
  setSortPlayersTeam,
  setLevel,
  resetLevel,
  setIsLoosedGame,
} = gameSlice.actions;

export default gameSlice.reducer;
