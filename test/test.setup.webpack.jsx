import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// setup enzyme
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// chai.use(chaiImmutable);

const {expect, assert} = chai;
global.expect = expect;
global.assert = assert;



// This will search for files ending in .js and require them
// so that they are added to the webpack bundle
var context = require.context('.', true, /.+\.js?$/);
context.keys().forEach(context);
module.exports = context;