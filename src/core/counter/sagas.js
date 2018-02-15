import "babel-polyfill";
import { delay } from 'redux-saga'
import { fork, take, call,  put } from 'redux-saga/effects';
import { counterActions } from './actions';

export function* sagasLogWithDalay(payload){
  yield call(delay, 500);
  console.log(`____sagaLog ${payload.type}`);
}

export function* getRandomNumberAsync(max){
  yield call(delay, 500);
  const randomNumber = Math.floor(Math.random(2) * max);
  return randomNumber;
}

export function* randomCouner(){
  const randomNumber = yield call(getRandomNumberAsync, 1000);
  yield put(counterActions.addToCounter(randomNumber));
}

export function* watchCounterIncrement() {
  while (true) {
    const payload = yield take(counterActions.INCREMENT);
    yield fork(sagasLogWithDalay, payload);
  }
}

export function* watchCounterRandom() {
  while (true) {
    yield take(counterActions.RANDOM);
    yield fork(randomCouner);
  }
}

export const counterSagas = [
  fork(watchCounterIncrement),
  fork(watchCounterRandom),
];
