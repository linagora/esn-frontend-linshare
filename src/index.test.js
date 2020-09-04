window.jstz = require('esn-frontend-common-libs/src/frontend/components/jstzdetect/jstz.js');
window.jQuery = require('jquery/dist/jquery.js');
window.$ = window.jQuery;
require('esn-frontend-common-libs/src/frontend/vendor-libs.js');

require('./index.js');
require('angular-mocks/angular-mocks.js');
require('../test/config/mocks/injector.js');
require('../test/config/mocks/module.js');

var sinonChai = require('sinon-chai/lib/sinon-chai.js');
var shallowDeepEqual = require('chai-shallow-deep-equal/chai-shallow-deep-equal.js');
var chaiDatetime = require('chai-datetime/chai-datetime.js');

/* global chai */
chai.use(sinonChai);
chai.use(shallowDeepEqual);
chai.use(chaiDatetime);

// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
const testsContext = require.context('.', true, /\.spec$/);

testsContext.keys().forEach(testsContext);
