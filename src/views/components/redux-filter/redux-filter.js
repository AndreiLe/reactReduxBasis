import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {filterActions} from 'Core/filter'
import ReactSelect from 'react-select'

import 'react-select/dist/react-select.css';

class ReduxFilter extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
        selected: []
    }
  }

  render() {
    const { articles, selected } = this.props
    const options = articles.toArray().map(article => ({
        label: article.title,
        value: article.id
    }))

    return (
      <ReactSelect
        options={options}
        value={selected}
        onChange={this.handleChange}
        multi
      />
    );
  }

  handleChange(selected){
    this.props.changeSelection(selected.map(option => option.value));
  }
}

ReduxFilter.propTypes = {
  articles: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    selected: state.filter.selected,
    articles: state.articles
  }
}
const mapDispatchToProps = {
  changeSelection: filterActions.changeSelection
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReduxFilter);
