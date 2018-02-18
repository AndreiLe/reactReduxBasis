import ConnectedClass, { ReduxCounter } from 'Components/redux-counter/counter'
import React from 'react'
import DumpComponent from 'Components/dump-component/'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store';
//snapshot testing with mocha
//https://github.com/bahmutov/snap-shot-it 

const mapStateToProps = {
  counter: 0,
  translate: ()=>{},
  locale: {
    languages: []
  }
};
const mapDispatchToProps = {
  changeCounter: ()=>{},
  randomCounter: ()=>{}
};

describe('Component/ReduxCounter', function () {
  let wrapper
  const data = 'test';

  const mockStore = configureStore();
  let store,container;

  beforeEach(()=>{
    store = mockStore(mapStateToProps);
    container = shallow(<ConnectedClass store={store} /> );
  })
  it('should render the DUMB component', () => {
    expect(container.length).to.eql(1);
    expect(container.html()).to.eql('<h2>0</h2><button></button><button></button>');
  });
  it('should props contains counter and translate', () => {
    expect(container.props().counter).to.eql(0);
    assert.isFunction(container.props().translate);
  });
});




