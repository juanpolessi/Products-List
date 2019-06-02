import { all, fork } from 'redux-saga/effects';
import productsSaga from './sagas/ProductsSagas';

export default function* rootSaga() {
  yield all([
    fork(productsSaga)
  ]);
}
