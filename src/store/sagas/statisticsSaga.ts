import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} from '../slices/statisticsSlice';
import { showNotification } from '../slices/uiSlice';

const API_URL = 'https://addis-music-backend-8e7a.onrender.com/api';

// Worker Saga
import { SagaIterator } from 'redux-saga';

function* fetchStatisticsSaga(): SagaIterator {
  try {
    const response = yield call(axios.get, `${API_URL}/statistics`);
    yield put(fetchStatisticsSuccess(response.data));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch statistics';
    yield put(fetchStatisticsFailure(errorMessage));
    yield put(showNotification({ message: errorMessage, type: 'error' }));
  }
}

// Watcher Saga
export default function* statisticsSaga() {
  yield takeLatest(fetchStatisticsRequest.type, fetchStatisticsSaga);
}