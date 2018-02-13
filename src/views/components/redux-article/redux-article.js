import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {articlesActions} from 'Core/articles'
//decorator for add toggleOpen
import ToggleOpenDecorator from 'Core/decorators/toggle-open'
import { Transition } from 'react-transition-group'
import './animation.css'

class ReduxArticle extends Component{

  constructor(){
    super(...arguments);

    //create and bind
    this.setContainerRef = this.setContainerRef.bind(this);
    this.updateStateComponent = this.updateStateComponent.bind(this);
    this.getTransitionBody = this.getTransitionBody.bind(this);
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
    this.handleUpdateArticle = this.handleUpdateArticle.bind(this);
    this.handleupdateAsyncArticle = this.handleupdateAsyncArticle.bind(this);

    this.state ={
      updateIndex: 0
    }

  //Globals from app
  console.log(this.context);

  }

  shouldComponentUpdate(nextProps, nextState){
    //use only if component need optimize!
    //don't update if another objects changes
    let update1 = nextProps.isOpen != this.props.isOpen;
    let update2 = nextState.updateIndex != this.state.updateIndex;
    let article = nextProps.article != this.props.article;

    return update1 || update2 || article;
  }

  componentWillMount() {
    //only if need init API
  }

  componentDidMount(){
    console.log('ReduxArticle'+this.props.article.id+' componentDidMount');
    //dont use real dom manipulation if can!
    //get dom for jquery
    this.containerRef.querySelectorAll('h3')[0].textContent = 'test';
  }

  componentDidUpdate(){
    console.log('ReduxArticle'+this.props.article.id+' componentDidUpdate');
  }

  render(){
    const {article, isOpen, toggleOpen} = this.props;

    //ref link to dom element
    return(
        <div ref={this.setContainerRef}>
          <h3>{article.title}</h3>
          <button onClick = {toggleOpen} >
            {isOpen ? 'close' : 'open'}
          </button>
          <button onClick = {this.updateStateComponent} >
            updateStateComponent
          </button>
          <button onClick = {this.handleUpdateArticle} >
            update
          </button>
          <button onClick = {this.handleupdateAsyncArticle} >
            updateAcync
          </button>
          <button onClick = {this.handleDeleteArticle} >
            delete
          </button>

          <Transition transitionName="article" in={isOpen} timeout={2000} mountOnEnter={false} unmountOnExit={false} >
            {this.getTransitionBody}
          </Transition>

          {this.getBody(isOpen, article.text, article.loading)}
        </div>
      )
  }

  componentWillUnmount(){
    console.log('ReduxArticle'+this.props.article.id+' componentWillUnmount');
    //unbind ref
    this.containerRef = null;
  }

  setContainerRef(ref){
    //optimized get ref func
    this.containerRef = ref;
  }

  updateStateComponent(){
    //rerender component after change state
    this.setState({
      updateIndex: this.state.updateIndex + 1
    })
  }

  getBody(isOpen, text, loading){
    if (!isOpen) {return <div></div>};
    if (loading) {return <div>loading...</div>};
    return <section >{text}</section>
  }

  //if Transition child is func, then call with argument status
  getTransitionBody(status, props){

    return (
      <Fragment>
        {this.props.article.loading ?
          <section className={`${props.transitionName} fade-${status}`} >loading...</section>
          :
          <section className={`${props.transitionName} fade-${status}`} >{this.props.article.text}</section>
        }
      </Fragment>
      )
  }

  handleDeleteArticle(){
    const{deleteArticle, article} = this.props;
    deleteArticle(article.id);
  }

  handleUpdateArticle(){
    const{updateArticle, article} = this.props;
    updateArticle(article.id);
  }

  handleupdateAsyncArticle(){
    const{updateAsyncArticle, article} = this.props;
    updateAsyncArticle(article.id);
  }
}

//Globals from app
ReduxArticle.contextTypes = {
    appVersion: PropTypes.string
  }

ReduxArticle.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string
  })
}

ReduxArticle.defaultProps = {
  article: {
    title: 'Default title2',
    text: 'Default description2'
  }
}

export default connect(
  null,
  {deleteArticle: articlesActions.deleteArticle,
   updateArticle: articlesActions.updateArticle,
   updateAsyncArticle: articlesActions.updateAsyncArticle}
  )(ToggleOpenDecorator(ReduxArticle));