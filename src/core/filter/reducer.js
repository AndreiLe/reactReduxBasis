import { filterActions } from './actions';

const defaultState = {
    selected: []
}

export function filterReducer (filter  = defaultState, {type, payload}){
  switch(type){
    case filterActions.CHANGE_SELECTION: 
    return {selected: payload.selected}
    break;
  }
  return filter;
}