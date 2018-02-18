import React from 'react'
import DumpComponent from 'Components/dump-component/'
import { shallow } from 'enzyme'

describe('Component/DumpComponent',()=>{
  let wrapper
  const data = 'test';
  beforeEach(()=>{
    wrapper = shallow(<DumpComponent data='test'/>)
  })
  it('should render the DUMB component', () => {
    expect(wrapper.length).to.eql(1);
  });
  it('should props data contain test', () => {
    expect(wrapper.props().children).to.eql('test');
  });
  it('should contains div', () => {
    expect(wrapper.find('div')).to.have.length(1);
  });
  it('should div contains test text', () => {
    expect(wrapper.find('div').text()).to.eql('test');
    expect(wrapper.find('div').html()).to.eql('<div>test</div>');
  });
});

function Test(){
  var value = 'some';
  this.self = this;
  function foo () {
    this.self 
    console.log(this.self.value)
  }
}

