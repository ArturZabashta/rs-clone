import { combineReducers, configureStore } from '@reduxjs/toolkit';

import gameReducer from './gameSlice';
import uiReducer from './uiSlice';

const reducers = combineReducers({
  ui: uiReducer,
  game: gameReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
