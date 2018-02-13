import {createSelector} from 'reselect'

const articleSelector = state => state.articles;
const filtersSelector = state=> state.filter;

export const filtratedArticlesSelector = createSelector(articleSelector, filtersSelector, (articles, filter) => {
  const {selected} = filter;

  return articles.filter(article =>{
    return (!selected.length || selected.includes(article.id));
  })
})
