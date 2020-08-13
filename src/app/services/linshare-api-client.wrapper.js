'use strict';

const { Client } = require('linshare-api-client');

angular.module('linagora.esn.linshare')
  .factory('LinshareApiClient', function() {
    return Client;
  });
