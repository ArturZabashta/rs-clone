import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_GAMES_ARRAY } from '../constants/constants';
import { GameStoreType, ICustomGamesResp, IPlayer } from '../types/gameInterface';

const initialState: GameStoreType = {
  score: 0,
  players: [],
  isSoundOn: true,
  musicVolume: 0.6,
  effectsVolume: 0.5,
  level: 1,
  round: 1,
  isLoosedGame: false,
  missedAnswer: false,
  totalScore: 0,
  gamesArray: [DEFAULT_GAMES_ARRAY],
  currentGameId: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = state.score + action.payload;
    },
    resetScore: (state) => {
      state.score = 0;
    },
    setPlayersTeam: (state, action: PayloadAction<Array<IPlayer>>) => {
      state.players = action.payload;
    },
    resetPlayersTeam: (state) => {
      state.players = [];
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
    setRound: (state) => {
      state.round = state.round + 1;
    },
    resetRound: (state) => {
      state.round = 1;
    },
    setIsLoosedGame: (state, action: PayloadAction<boolean>) => {
      state.isLoosedGame = action.payload;
    },
    setMissedAnswer: (state, action: PayloadAction<boolean>) => {
      state.missedAnswer = action.payload;
    },
    setTotalScore: (state, action: PayloadAction<number>) => {
      state.totalScore = action.payload;
    },
    setGamesArray: (state, action: PayloadAction<ICustomGamesResp[]>) => {
      state.gamesArray = action.payload;
    },
    setCurrentGameId: (state, action: PayloadAction<number>) => {
      state.currentGameId = action.payload;
    },
  },
});

export const {
  setScore,
  resetScore,
  setPlayersTeam,
  resetPlayersTeam,
  setIsSoundOn,
  setEffectsVolume,
  setMusicVolume,
  setSortPlayersTeam,
  setLevel,
  resetLevel,
  setRound,
  resetRound,
  setIsLoosedGame,
  setMissedAnswer,
  setTotalScore,
  setGamesArray,
  setCurrentGameId,
} = gameSlice.actions;

export default gameSlice.reducer;
