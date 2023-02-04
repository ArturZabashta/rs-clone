import { combineReducers, configureStore } from '@reduxjs/toolkit';

import uiReducer from './uiSlice';

const reducers = combineReducers({
  ui: uiReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
