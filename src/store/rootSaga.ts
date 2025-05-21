import { all, fork } from 'redux-saga/effects';
import songsSaga from './sagas/songsSaga';
import statisticsSaga from './sagas/statisticsSaga';

export default function* rootSaga() {
  yield all([
    fork(songsSaga),
    fork(statisticsSaga),
  ]);
}