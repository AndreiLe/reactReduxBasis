import { counterActions } from 'Core/counter';
import configureStore from 'redux-mock-store';

//redux-mock-store test
const middlewares = []
const mockStore = configureStore(middlewares)

describe('counterActions', () => {
  describe('INCREMENT', function () {
    it('shoul return INCREMENT', ()=> {
      expect(counterActions.INCREMENT).to.eql('INCREMENT')
    });
  });
  describe('changeCounter', function() {
    it('should return object', () => {
      expect(counterActions.changeCounter()).to.eql({
        type: 'INCREMENT',
        makeLog: true
      });
    })
    it('should dispatch action', () => {
      const store = mockStore({})
      store.dispatch(counterActions.changeCounter())
      const actions = store.getActions()
      expect(actions).to.eql([{type: "INCREMENT", makeLog: true}])
    })
  });
});
