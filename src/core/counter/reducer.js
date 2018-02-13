import { counterActions } from './actions';

export const defaultState = 0;

export function counterReducer (counter  = defaultState, {type}){
  switch(type){
    case counterActions.INCREMENT: 
    return counter + 1;
    break;
  }
  return counter;
}