import React, {Component} from 'react'

export default (OriginalComponent) => class ToggleOpenDecorator extends Component{
  constructor(props){
    super(props)

    let isOpen = false;
    if (props.isOpen) {
      isOpen = props.isOpen;
    }

    this.state = {
      isOpen: isOpen
    }

    //recomended binding by doc for better performance
    this.toggleOpen = this.toggleOpen.bind(this)

  }

  //component alwais check isOpen before rerender
  componentWillReceiveProps({isOpen, isSingle}) {
    if (isSingle) {
      this.setState({
        isOpen: isOpen
      })
    }
  }

  render() {
    return (
      <OriginalComponent {...this.props} isOpen = {this.isOpen()} toggleOpen = {this.toggleOpen} updateKeyComponent = {this.updateKeyComponent}/>
      )
  }

  isOpen(){
    //accordion list
    if (this.props.openArticleId) {
        return this.props.openArticleId == this.props.article.id;
    }
    //simple list
    return this.state.isOpen;
  }

  toggleOpen(ev){
    //accordion list
    if (this.props.toggleAccordion && this.props.toggleAccordion(this.props.article.id)) return;
    //simple list
    //dom event
    //ev.nativeEvent.preventDefault();
    //react event wraper
    ev && ev.preventDefault && ev.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

}