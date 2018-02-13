import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import ArticleList from 'Components/article-list/';
import AccordionArticleList from 'Components/accordion-article-list/';
import ReduxArticleList from 'Components/redux-article-list/';
import ReduxArticle from 'Components/redux-article/';
import ReduxFilter from 'Components/redux-filter';
import {connect} from 'react-redux'
import {filtratedArticlesSelector} from 'Core/filter'
import store from 'Core/store';
import {replace} from 'react-router-redux'

function Articles({match}) {

  const {id} = match.params;

  if (id) {

    const {articles} = store.getState(); 
    const index = articles.findIndex(listItem => {
      return listItem.id === parseInt(id);
    })
    if (index < 0) {
      store.dispatch(replace('/404'));
    }
    const article =  articles.get(index);

    return (
      <Fragment>
        <ReduxArticle article={article} isOpen/>
      </Fragment>
      )
  }else{
    return (
      <Fragment>
        <ReduxFilter/>
        <ReduxArticleList />
      </Fragment>
      )
  }
}

function mapStateToProps(state) {
  return {
    articles: filtratedArticlesSelector(state),
    isOpen: true,
    isSingle: true
  }
}

export default connect(
    mapStateToProps
  )(Articles);