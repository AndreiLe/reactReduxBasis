export const filterActions = {
  CHANGE_SELECTION: 'CHANGE_SELECTION',

  changeSelection: (selected)=>({
    type: filterActions.CHANGE_SELECTION,
    payload: {selected}
  })
}