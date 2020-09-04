'use strict';

require('./linshare-api-client.service');

angular.module('linagora.esn.linshare')
  .factory('linshareFileUpload', function($q, inBackground, linshareApiClient) {
    return {
      uploadFile
    };

    function uploadFile(unusedUrl, file, type, size, options, canceler) {
      const deferred = $q.defer();

      const uploadPromise = linshareApiClient.createDocument({
        file: file,
        fileSize: size
      }, {
        onUploadProgress: deferred.notify
      });

      if (canceler) {
        canceler.then(uploadPromise.cancel);
      }

      uploadPromise.then(deferred.resolve, deferred.reject);

      return inBackground(deferred.promise);
    }
  });
