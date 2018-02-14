import {middlewareLogger} from 'Core/middleware'
import configureStore from 'redux-mock-store'

//redux-mock-store test
const middlewares = [middlewareLogger]
const mockStore = configureStore(middlewares)

describe('Test with redux-mock-store', function () {
  describe('Middleware/middlewareLogger', function () {
    it('should dispatch action', () => {
      const action = () => ({ type: 'TEST' })
      // Initialize mockstore with empty state
      const initialState = {}
      const store = mockStore(initialState)
      // Dispatch the action
      store.dispatch(action())
      // Test if your store dispatched the expected actions
      const actions = store.getActions()
      const expectedPayload = { type: 'TEST' }
      expect(actions).to.eql([expectedPayload])
    })
  });
});

describe('Simple test', function () {
  describe('Middleware/middlewareLogger', function () {
    it('should return action object', () => {
      const action = {};
      const next = (action)=>action;
      const store = ()=>{};
      const result = middlewareLogger(store)(next)(action);
      expect(result).to.eql(action);
    })
    it('should return action object if makeLog', () => {
      const action = {makeLog: true};
      const next = (action)=>action;
      const store = ()=>{};
      const result = middlewareLogger(store)(next)(action);
      expect(result).to.eql(action);
    })
  });
});

