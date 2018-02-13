export const middlewareLogger = store => next => action => {
  //should be maximally re-used
  if(!action.makeLog) return next(action);
  
  console.log(`____dispatched ${action.type}`);
  return next(action);
}