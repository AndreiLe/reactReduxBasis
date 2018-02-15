import {createStore, applyMiddleware} from 'redux';
import reducers from 'Core/reducers';
import {middlewareLogger} from 'Core/middleware/';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import history from 'Core/history';
import createSagaMiddleware from 'redux-saga';
import sagas from 'Core/sagas';

const routerMiddlewareWithHistory = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(thunk, routerMiddlewareWithHistory, middlewareLogger, sagaMiddleware);

let store = null;
if (process.env.NODE_ENV !== 'production') {
store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  enhancer
  );
}else {
store = createStore(
  reducers, 
  enhancer
  );
}


sagaMiddleware.run(sagas);

export default store;