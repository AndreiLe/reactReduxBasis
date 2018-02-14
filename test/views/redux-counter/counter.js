import ConnectedClass, { ReduxCounter } from 'Components/redux-counter/counter'

describe('Component/redux-counter', function () {
  describe('ReduxCounter', function () {
    it('should be function', ()=> {
      assert.isFunction(ReduxCounter);
    });
  }); 
});

