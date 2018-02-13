export const counterActions = {
  INCREMENT: 'INCREMENT',

  changeCounter: ()=>({
    type: counterActions.INCREMENT,
    makeLog: true
  })
}