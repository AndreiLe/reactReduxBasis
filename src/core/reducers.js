import {combineReducers} from 'redux'
import {counterReducer} from './counter'
import {articlesReducer} from './articles'
import {filterReducer} from './filter'
import {routerReducer} from 'react-router-redux'
import { localeReducer } from 'react-localize-redux';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  counter: counterReducer,
  articles: articlesReducer,
  filter: filterReducer,
  router: routerReducer,
  locale: localeReducer,
  form: formReducer
})