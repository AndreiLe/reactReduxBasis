import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import ReduxArticle from 'Components/redux-article/';
import {filtratedArticlesSelector} from 'Core/filter'
import {NavLink} from 'react-router-dom'

class ReduxArticleList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let articleElements = null;
    if (this.props.list) {
      articleElements = this.props.articles.map((article) => {
        return <li key = {article.id}><NavLink to={`/article/${article.id}`}>{article.title}</NavLink></li>
      })
    }else{
      articleElements = this.props.articles.map((article) => {
        return <li key = {article.id}><ReduxArticle article = {article}/></li>
      })
    }

    return (
      <ul>{articleElements}</ul>
    );
  }
}

ReduxArticleList.propTypes = {
  articles: PropTypes.object.isRequired
}


function mapStateToProps(state) {
/*//first version
  const {selected} = state.filter;
  //return new object, alwais rerender!
  const filtratedArticles = state.articles.filter(article => {
      return (!selected.length || selected.includes(article.id))
  });*/

/*  //second version optimized
  let articles = state.articles;
  const {selected} = state.filter;
  if(!selected.length){
    return {
      articles: articles
    };
  }
  let articlesLength = articles.length;
  let article = null;
  let needUpdate = false;
  let newArticles = Object.assign([],articles);
  for (var i = articlesLength - 1; i >= 0; i--) {
    article = newArticles[i];
    if(!selected.includes(article.id)){
      needUpdate = true;
      newArticles.splice(i, 1);
    }
  }
  if (needUpdate) {
    return {
      articles: newArticles
    };
  }else {
    return {
      articles: articles
    };
  }*/

  //third version with reselect
  return {
      articles: filtratedArticlesSelector(state)
  }
}

export default connect(
    mapStateToProps
  )(ReduxArticleList);
