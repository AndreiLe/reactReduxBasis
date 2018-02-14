import "babel-polyfill";
import { all } from 'redux-saga/effects'
import { counterSagas } from 'Core/counter';

export default function* sagas() {
  yield all([
    ...counterSagas
  ]);
}