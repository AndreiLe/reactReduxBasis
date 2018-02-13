import { articlesActions } from './actions';
import { List, Record } from 'immutable';

const ArticleRecord = Record({ id: null, title: null, text: null, loading: null })

export const defaultState = new List([
  new ArticleRecord({ id: 1, title: "title 1", text: "text1", loading: false }),
  new ArticleRecord({ id: 2, title: "title 2", text: "text2", loading: false }),
  new ArticleRecord({ id: 4, title: "title 3", text: "text3", loading: false })
]);

export function articlesReducer(articles = defaultState, { type, payload }) {
  
  switch (type) {

    case articlesActions.DELETE_ARTICLE:
      return articles.filter(article => article.id !== payload.id);
      break;

    case articlesActions.UPDATE_ARTICLE:
      const index = articles.findIndex(listItem => {
        return listItem.id === payload.id;
      })
      return articles.updateIn([index, 'text'], text => 'text' + (Number(text.replace(/[a-z]/g, '')) + 1));
      break;

    case articlesActions.UPDATE_ASYNC_ARTICLE_LOADING:
      const index2 = articles.findIndex(listItem => {
        return listItem.id === payload.id;
      })
      return articles.updateIn([index2, 'loading'], loading => true);
      break;

    case articlesActions.UPDATE_ASYNC_ARTICLE_LOADED:
      const index3 = articles.findIndex(listItem => {
        return listItem.id === payload.id;
      })
      return articles.updateIn([index3, 'text'], text => payload.data).updateIn([index3, 'loading'], loading => false);
      break;


  }
  return articles;
}