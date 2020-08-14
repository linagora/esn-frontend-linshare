'use strict';

require('./linshare-api-client.wrapper');
require('../common/linshare-jwt-token-cache.service');

angular.module('linagora.esn.linshare')
  .factory('linshareApiClientProvider', function($q, esnConfig, LinshareApiClient, linshareJwtTokenCache) {
    let cachedToken = null;
    let cachedClient = null;

    return {
      get
    };

    function get() {
      return linshareJwtTokenCache.get().then(function(token) {
        if (!cachedClient || token !== cachedToken) {
          cachedClient = null;
          cachedToken = token;

          return createNewClientWithToken(token);
        }

        return cachedClient;
      }).then(function(client) {
        cachedClient = client;

        return cachedClient;
      });
    }

    function createNewClientWithToken(token) {
      return esnConfig('linagora.esn.linshare.apiBasePathFrontend')
        .then(function(apiBasePath) {
          if (!apiBasePath) {
            return $q.reject(new Error('LinShare API base path for frontend is not configured'));
          }

          return new LinshareApiClient.Client({
            baseUrl: apiBasePath,
            auth: {
              type: 'jwt',
              token: token
            }
          });
        });
    }
  });
