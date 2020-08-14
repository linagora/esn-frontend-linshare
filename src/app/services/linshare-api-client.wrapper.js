'use strict';

const LinshareApiClient = require('linshare-api-client');

angular.module('linagora.esn.linshare')
  .factory('LinshareApiClient', function() {
    return LinshareApiClient;
  });
