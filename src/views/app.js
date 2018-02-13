import React,{Component,Fragment} from 'react'
import PropTypes from 'prop-types'
import UserForm from 'Components/user-form';
import ReduxCounter from 'Components/redux-counter'
import HomePage from 'Pages/home-page';
import ArticlesPage from 'Pages/articles-page';
import PageMenu from 'Components/page-menu';
import { localize } from 'react-localize-redux';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import store from 'Core/store';
import {push} from 'react-router-redux'
import qs from 'qs';
import './styles/index.sass';


class App extends Component{

  constructor(props){
    super(props);
    // state changes in this component rerender all app, avoid this!
  }

  //context is experimental API
  //don't use context if use redux or mobx
  //dont't update
  //Add Global context
  getChildContext() {
    return {appVersion: '1.0.0'};
  }

  render(){
  	return (
      <Fragment>
        <PageMenu page={1}/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/counter" component={ReduxCounter}/>
          <Route path="/userform" component={UserForm}/>
          <Route exact path="/articles" component={ArticlesPage}/>

          <Route exact path="/article/new" component={NewPage}/>
          <Redirect exact from='/article' to='/article/1'/>
          <Route path="/article/:id" component={ArticlesPage}/>

          <Route component={Page404}/>
        </Switch>
      </Fragment>
  	);
  }
}

//Add Global context
App.childContextTypes = {
    appVersion: PropTypes.string
  }

const NewPage = localize((props) => {

  const { translate} = props;

  const queryString = props.location.search.substr(1);
  const querys = qs.parse(queryString);//library
  const querys2 = new URLSearchParams(queryString);//browser API, need polyfill

  return (
    <Fragment>
      <h1>{translate('New Page')}</h1>
      <div>{querys.text}</div>
      <div>{querys2.get('text')}</div>
    </Fragment>
  )
 
},'locale');

const Page404 = () => {
    return (<h1>Page404</h1>);
  }

export default App;