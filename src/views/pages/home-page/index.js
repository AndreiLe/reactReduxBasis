import ReduxArticleList from 'Components/redux-article-list/';
import React,{Fragment} from 'react';
import { localize } from 'react-localize-redux';

const HomePage = (props) => {

  const { translate} = props;

  return (
  <Fragment>
    <h2>{translate('Home')}</h2>
    <ReduxArticleList list={true}/>
  </Fragment>
  )
}

export default localize(HomePage, 'locale');