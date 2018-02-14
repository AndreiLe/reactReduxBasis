import { counterReducer } from 'Core/counter';

describe('counterReducer', () => {
  it('should return initial state', () => {
    expect(counterReducer(undefined, {})).to.eql(0)
  })
  it('should initialize and increment', () => {
    expect(counterReducer(null, {type:'INCREMENT'})).to.eql(1);
  })
  it('should get value and increment', () => {
    expect(counterReducer(1, {type:'INCREMENT'})).to.eql(2);
  })
});



