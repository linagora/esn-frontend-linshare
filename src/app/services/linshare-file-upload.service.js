'use strict';

angular.module('linagora.esn.linshare')
  .factory('linshareFileUpload', function($q, inBackground, linshareApiClient) {
    return {
      uploadFile
    };

    function uploadFile(unusedUrl, file, type, size, options, canceler) {
      let deferred = $q.defer();

      let uploadPromise = linshareApiClient.createDocument({
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
