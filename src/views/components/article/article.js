import React, {Component} from 'react'
import PropTypes from 'prop-types'
//decorator for add toggleOpen
import ToggleOpenDecorator from 'Core/decorators/toggle-open'
import { Transition } from 'react-transition-group'
import './animation.css'

class Article extends Component{

  constructor(){
    super(...arguments);

    //create and bind
    this.setContainerRef = this.setContainerRef.bind(this);
    this.updateStateComponent = this.updateStateComponent.bind(this);
    this.getTransitionBody = this.getTransitionBody.bind(this);

    this.state ={
      updateIndex: 0
    }

  }

  shouldComponentUpdate(nextProps, nextState){
    //use only if component need optimize!
    //don't update if another objects changes
    let update1 = nextProps.isOpen != this.props.isOpen;
    let update2 = nextState.updateIndex != this.state.updateIndex;
    return update1 || update2;
  }

  componentDidMount(){
    //dont use real dom manipulation if can!
    //get dom for jquery
    this.containerRef.querySelectorAll('h3')[0].textContent = 'test';
  }

  componentDidUpdate(){
    console.log('Article'+this.props.article.id+' componentDidUpdate');
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

          <Transition transitionName="article" in={isOpen} timeout={2000} mountOnEnter={false} unmountOnExit={false} >
            {this.getTransitionBody}
          </Transition>

          {this.getBody(isOpen, article.text)}
        </div>
      )
  }

  componentWillUnmount(){
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

  getBody(isOpen, text){
    if (!isOpen) {return <div></div>};
    return <section >{text}</section>
  }

  //if Transition child is func, then call with argument status
  getTransitionBody(status, props){
    return <section className={`${props.transitionName} fade-${status}`} >{this.props.article.text}</section>
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  })
}

Article.defaultProps = {
  article: {
    title: 'Default title2',
    description: 'Default description2'
  }
}

export default ToggleOpenDecorator(Article);