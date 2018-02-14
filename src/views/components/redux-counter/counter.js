import React,{Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {counterActions} from 'Core/counter';
import { getTranslate } from 'react-localize-redux';

export class ReduxCounter extends Component {
  constructor(props) {
    super(props);

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleRandrom = this.handleRandrom.bind(this);
  }

  render() {

    const { translate} = this.props;

    return (
      <Fragment>
        <h2>{this.props.counter}</h2>
        <button onClick={this.handleIncrement}>{translate('Increment me')}</button>
        <button onClick={this.handleRandrom}>{translate('Random')}</button>
      </Fragment>
    );
  }

  handleIncrement(){
    this.props.changeCounter();
  }

  handleRandrom(){
    this.props.randomCounter();
  }
}

ReduxCounter.propTypes = {
  /*from redux connect*/
  counter: PropTypes.number,
  changeCounter: PropTypes.func.isRequired,
  translate: PropTypes.func
}


function mapStateToProps(state) {
  return {
    counter: state.counter,
    translate: getTranslate(state.locale)
  }
}

const mapDispatchToProps = {
  changeCounter: counterActions.changeCounter,
  randomCounter: counterActions.randomCounter
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReduxCounter);
