import React,{Component} from 'react';
import Article from 'Components/article/';

class AccordionArticleList extends Component {

  constructor(props){
    super(props);

    this.state = {
      openArticleId: null
    }

    this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  render(){
    const articleElements = this.props.articles.map((article) => {
      return (
      <li key = {article.id}>
        <Article 
          article = {article} 
          openArticleId = {this.state.openArticleId}
          toggleAccordion = {this.toggleAccordion}
        />
      </li>
      )
    })
    
  	return(
  			<ul>{articleElements}</ul>
  	)
  }

  toggleAccordion(openArticleId){
    if (this.state.openArticleId == openArticleId) {
      this.setState({
        openArticleId: -1
      })
      return
    }
    this.setState({openArticleId})
  }
}

export default AccordionArticleList;