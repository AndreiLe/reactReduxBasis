export const articlesActions = {
  DELETE_ARTICLE: 'DELETE_ARTICLE',
  UPDATE_ARTICLE: 'UPDATE_ARTICLE',
  UPDATE_ACYNC_ARTICLE: 'UPDATE_ACYNC_ARTICLE',
  UPDATE_ASYNC_ARTICLE_LOADING: 'UPDATE_ASYNC_ARTICLE_LOADING',
  UPDATE_ASYNC_ARTICLE_LOADED: 'UPDATE_ASYNC_ARTICLE_LOADED',

  deleteArticle: (id)=>({
    type: articlesActions.DELETE_ARTICLE,
    payload: {id}
  }),

  updateArticle: (id)=>({
    type: articlesActions.UPDATE_ARTICLE,
    payload: {id}
  }),

  updateArticleAsyncloading: (id)=>({
    type: articlesActions.UPDATE_ASYNC_ARTICLE_LOADING,
    payload: {id}
  }),

  updateAsyncArticleLoaded: (id, data)=>({
    type: articlesActions.UPDATE_ASYNC_ARTICLE_LOADED,
    payload: {id, data}
  }),

  updateAsyncArticle: (id)=>(dispatch, getState)=>{
    const {articles} = getState();
    const index = articles.findIndex(listItem => {
      return listItem.id === id;
    })
    const loading =  articles.getIn([index, 'loading']);
    if (loading) {
      return;
    }

    dispatch(articlesActions.updateArticleAsyncloading(id));
    setTimeout(()=>{
      const {articles} = getState();
      const index = articles.findIndex(listItem => {
        return listItem.id === id;
      })
      let text =  articles.getIn([index, 'text']);
      text =  'text' + (Number(text.replace(/[a-z]/g, '')) +1)
      dispatch(articlesActions.updateAsyncArticleLoaded(id, text));
    }, 1000)
  }
}
