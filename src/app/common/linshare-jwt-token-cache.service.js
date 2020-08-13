'use strict';

angular.module('linagora.esn.linshare')
  .factory('linshareJwtTokenCache', linshareJwtTokenCache);

function linshareJwtTokenCache(
  Cache,
  linshareApiService,
  LINSHARE_JWT_TOKEN_CACHE_TIMEOUT
) {
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
}
