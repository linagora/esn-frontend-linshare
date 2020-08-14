'use strict';

angular.module('linagora.esn.linshare', [
  'ui.router',
  'op.dynamicDirective',
  'restangular',
  'esn.http',
  'esn.configuration',
  'esn.cache',
  'esn.background',
  'esn.i18n',
  'esn.file-browser',
  'esn.module-registry',
  'esn.lodash-wrapper'
]);

require('esn-frontend-common-libs/src/frontend/js/modules/background');
require('esn-frontend-common-libs/src/frontend/js/modules/cache');
require('esn-frontend-common-libs/src/frontend/js/modules/file');
require('esn-frontend-common-libs/src/frontend/js/modules/http');
require('esn-frontend-common-libs/src/frontend/js/modules/i18n/i18n.module');
require('esn-frontend-common-libs/src/frontend/js/modules/file-browser/file-browser.module')
require('esn-frontend-common-libs/src/frontend/js/modules/module-registry/module-registry.module');
require('esn-frontend-common-libs/src/frontend/js/modules/lodash-wrapper');

require('./app.constants');
require('./common/linshare-api.service');
require('./common/linshare-jwt-token-cache.service');
require('./common/linshare-restangular.service');
require('./config-form/linshare-config-form.component');
require('./myspace-file-browser/linshare-myspace-file-browser.component');
require('./myspace-file-browser/linshare-myspace-file-browser.controller');
require('./services/linshare-api-client.wrapper');
require('./services/linshare-api-client-provider.service');
require('./services/linshare-api-client.service');
require('./services/linshare-file-upload.service');
require('./services/linshare-loaders.service');
