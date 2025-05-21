import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from './slices/songsSlice';
import statisticsReducer from './slices/statisticsSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  statistics: statisticsReducer,
  ui: uiReducer,
});

export default rootReducer;