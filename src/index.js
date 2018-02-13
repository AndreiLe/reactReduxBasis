import React from 'react';
import {render} from 'react-dom';
import App from './views/app';
import store from 'Core/store';
import{Provider} from 'react-redux';
//import {Router} from 'react-router-dom'; //simple router
import {ConnectedRouter} from 'react-router-redux'
import history from 'Core/history'
import initialize from 'Core/languages'

const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>     
  </Provider>, 
  rootElement)