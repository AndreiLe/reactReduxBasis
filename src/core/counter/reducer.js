import { counterActions } from './actions';

export const defaultState = 0;

export function counterReducer (counter  = defaultState, { type, payload }){
  switch(type){
    case counterActions.INCREMENT: 
    return counter + 1;
    break;
  }
  switch(type){
    case counterActions.ADD: 
    return payload.value;
    break;
  }
  return counter;
}