import {
  watchCounterIncrement, 
  sagasLogWithDalay, 
  getRandomNumberAsync,
  randomCouner
} from 'Core/counter/sagas';
import {take, call, fork} from 'redux-saga/effects';
import { delay, runSaga } from 'redux-saga'

describe('counterSagas', function () {
  describe('watchCounterIncrement', function () {
    it('should take INCREMENT and not stop', function () {
      const generator = watchCounterIncrement();
      assert.deepEqual(
        generator.next().value,
        take('INCREMENT')
      );  
      assert.deepEqual(
        generator.next().value,
        fork(sagasLogWithDalay, undefined)
      );  
      assert.deepEqual(
        generator.next().value,
        take('INCREMENT')
      );  
      assert.isFalse(generator.next().done);
    });
  });
  describe('sagasLogWithDalay', function () {
    it('should return delay 500 and done', function () {
      const generator = sagasLogWithDalay(100);
      assert.deepEqual(
        generator.next().value,
        call(delay, 500)
      );
      assert.isTrue(generator.next().done);
    });
  });
  describe('getRandomNumberAsync', function () {
    it('should return delay 500 and done', function () {
    const generator = getRandomNumberAsync(1000);
      assert.deepEqual(
        generator.next().value,
        call(delay, 500)
      );
      assert.isTrue(generator.next().done);
    });
    it('should return number below 1000', function (done) {
      const saga = runSaga({
      },
      getRandomNumberAsync, 1000).done;
      saga.then(function(result) {
        expect(result).to.be.below(1000)
        done();
      });
    });
  });
  describe('randomCouner', function () {
    it('should dispatch action Add and return value below 1000', function (done) {
      const dispatched = [];
      const saga = runSaga({
        dispatch: (action) => dispatched.push(action),
      },
      randomCouner).done;
      saga.then(function(result) {
        assert.equal(dispatched.length,1);
        const dispatchedResult = dispatched[0];
        assert.equal(dispatchedResult.type,"ADD");
        expect(dispatchedResult.payload.value).to.be.below(1000);
        done();
      });
    });
  });
});