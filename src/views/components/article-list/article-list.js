import React from 'react';
import Article from '../article/';

function ArticleList({articles}) {

  const articleElements = articles.map((article) => {
    return <li key = {article.id}><Article article = {article}/></li>
  })
  
	return(
			<ul>{articleElements}</ul>
	)
}

export default ArticleList;