export const counterActions = {
  INCREMENT: 'INCREMENT',
  RANDOM: 'RANDOM',
  ADD: 'ADD',

  changeCounter: ()=>({
    type: counterActions.INCREMENT,
    makeLog: true
  }),

  randomCounter: ()=>({
    type: counterActions.RANDOM
  }),

  addToCounter: (value)=>({
    type: counterActions.ADD,
    payload: {value}
  }),

}