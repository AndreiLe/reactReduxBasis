import { articlesActions } from 'Core/articles';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { List, Record } from 'immutable';

const ArticleRecord = Record({ id: null, title: null, text: null, loading: null })
const mockRecord = {
  articles: new List([
    new ArticleRecord({ id: 1, title: "title 1", text: "text1", loading: false }),
  ])
};

//async redux-mock-store test
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('articlesActions', function() {
  describe('updateAsyncArticle', function() {
    it('should change store 2 times', function(done) {
      const store = mockStore(mockRecord);
      let timerId = setTimeout(() => {
        clearTimeout(timerId);
        done(new Error('should never be called'))
      }, 1500);
      const actionHandler = function() {
        const actions = store.getActions();
        if (actions.length === 1) {
          expect(actions).to.eql([
            { type: "UPDATE_ASYNC_ARTICLE_LOADING", payload: { id: 1 } }
          ])
        }
        if (actions.length === 2) {
          expect(actions).to.eql([
            { type: "UPDATE_ASYNC_ARTICLE_LOADING", payload: { id: 1 } },
            { type: "UPDATE_ASYNC_ARTICLE_LOADED", payload: { id: 1, data: "text2" } }
          ])
          done();
          clearTimeout(timerId);
        }
      }
      store.subscribe(actionHandler);
      store.dispatch(articlesActions.updateAsyncArticle(1))
    });
  });
});