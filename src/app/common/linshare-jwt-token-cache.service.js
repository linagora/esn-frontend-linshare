'use strict';

require('./linshare-api.service');
require('../app.constants');

angular.module('linagora.esn.linshare')
  .factory('linshareJwtTokenCache', function(Cache, linshareApiService, LINSHARE_JWT_TOKEN_CACHE_TIMEOUT) {
    return new Cache({
      loader: function() {
        return linshareApiService.generateJwtToken().then(function(resp) {
          return resp.data;
        });
      },
      keyBuilder: function() {
        return 'token';
      },
      ttl: LINSHARE_JWT_TOKEN_CACHE_TIMEOUT
    });
  });
