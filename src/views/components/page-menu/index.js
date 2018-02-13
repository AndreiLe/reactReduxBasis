import React from 'react'
import {NavLink, withRouter} from 'react-router-dom';
import qs from 'qs';
import { localize } from 'react-localize-redux';
import LanguageSelector from 'Components/language-selector'

const PageMenu = function PageMenu(props) {

  const query = qs.stringify({text: 'some-text'});
  const { translate} = props;

  return (
    <div>
      <LanguageSelector/>
      <ul>
        <li><NavLink exact activeStyle={{color:'red'}} to="/">{translate('Home')}</NavLink></li>
        <li><NavLink activeStyle={{color:'red'}} to="/counter">{translate('Counter')}</NavLink></li>
        <li><NavLink activeStyle={{color:'red'}} to="/userform">{translate('Userform')}</NavLink></li>
        <li><NavLink exact activeStyle={{color:'red'}} to="/articles" >{translate('Articles')}</NavLink></li>
        <li><NavLink activeStyle={{color:'red'}} to={`/article/new?${query}`} >{translate('New Page')}</NavLink></li>
      </ul>
      <hr/>
    </div>
    )
}

export default withRouter(localize(PageMenu, 'locale'));
