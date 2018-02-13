import {createStore, applyMiddleware} from 'redux'
import reducers from 'Core/reducers'
import {middlewareLogger} from 'Core/middleware/'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import history from 'Core/history'

const enhancer = applyMiddleware(thunk, routerMiddleware(history), middlewareLogger);

const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  enhancer
  );

export default store;