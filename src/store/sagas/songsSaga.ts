import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { SongFormData, Song } from '../../types';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchSongRequest,
  fetchSongSuccess,
  fetchSongFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from '../slices/songsSlice';
import { fetchStatisticsRequest } from '../slices/statisticsSlice';
import { showNotification } from '../slices/uiSlice';
import { PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'https://addis-music-backend-8e7a.onrender.com/api';

// Worker Sagas
function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `${API_URL}/songs`);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch songs';
    yield put(fetchSongsFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

function* fetchSongSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const id = action.payload;
    const response = yield call(axios.get, `${API_URL}/songs/${id}`);
    yield put(fetchSongSuccess(response.data));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch song';
    yield put(fetchSongFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

function* createSongSaga(action: PayloadAction<SongFormData>): Generator<any, void, any> {
  try {
    const songData = action.payload;
    const response = yield call(axios.post, `${API_URL}/songs`, songData);
    yield put(createSongSuccess(response.data));
    yield put(showNotification({ message: 'Song created successfully', type: 'success' }));
    yield put(fetchStatisticsRequest());
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create song';
    yield put(createSongFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

function* updateSongSaga(action: PayloadAction<{ id: string; data: SongFormData }>): Generator<any, void, any> {
  try {
    const { id, data } = action.payload;
    const response = yield call(axios.put, `${API_URL}/songs/${id}`, data);
    yield put(updateSongSuccess(response.data));
    yield put(showNotification({ message: 'Song updated successfully', type: 'success' }));
    yield put(fetchStatisticsRequest());
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update song';
    yield put(updateSongFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

function* deleteSongSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const id = action.payload;
    yield call(axios.delete, `${API_URL}/songs/${id}`);
    yield put(deleteSongSuccess(id));
    yield put(showNotification({ message: 'Song deleted successfully', type: 'success' }));
    yield put(fetchStatisticsRequest());
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete song';
    yield put(deleteSongFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

// Watcher Saga
export default function* songsSaga(): Generator<any, void, any> {
  yield all([
    takeLatest(fetchSongsRequest.type, fetchSongsSaga),
    takeLatest(fetchSongRequest.type, fetchSongSaga),
    takeLatest(createSongRequest.type, createSongSaga),
    takeLatest(updateSongRequest.type, updateSongSaga),
    takeLatest(deleteSongRequest.type, deleteSongSaga),
  ]);
}