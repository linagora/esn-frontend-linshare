'use strict';

angular.module('linagora.esn.linshare')
  .factory('linshareApiService', linshareApiService);

function linshareApiService(linshareRestangular) {
  return {
    generateJwtToken
  };

  /**
   * Generate JWT token to authenticate against LinShare APIs
   * @return {Promise}          - On success, resolves with the response containing the token
   */
  function generateJwtToken() {
    return linshareRestangular.one('token').post();
  }
}
