'use strict';

/* global chai: false */
/* global sinon: false */

const { expect } = chai;

describe('The linshareFileUpload service', function() {
  let $q, $rootScope, linshareApiClient;
  let linshareFileUpload;

  beforeEach(angular.mock.module('linagora.esn.linshare'));

  beforeEach(angular.mock.inject(function(_$rootScope_, _$q_, _linshareApiClient_, _linshareFileUpload_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    linshareApiClient = _linshareApiClient_;
    linshareFileUpload = _linshareFileUpload_;
  }));

  describe('The uploadFile fn', function() {
    it('should call LinShare API to create document in My space', function() {
      linshareApiClient.createDocument = sinon.stub().returns($q.when({}));

      const file = { name: 'Learn_JS_in_6_hours.pdf' };
      const size = 12345;
      const fileType = 'text';

      linshareFileUpload.uploadFile(null, file, fileType, size);

      expect(linshareApiClient.createDocument).to.have.been.calledWith({
        file: file,
        fileSize: size
      });
    });

    it('should support upload progress by promise notification', function() {
      let onUploadProgress;

      linshareApiClient.createDocument = function(data, option) {
        onUploadProgress = option.onUploadProgress;

        return $q.when();
      };

      const file = { name: 'Learn_JS_in_6_hours.pdf' };
      const size = 12345;
      const fileType = 'text';
      const notifySpy = sinon.spy();

      linshareFileUpload.uploadFile(null, file, fileType, size).then(null, null, notifySpy);

      const progressEvent = { loaded: 7, total: 10 };

      onUploadProgress(progressEvent);
      $rootScope.$digest();

      expect(notifySpy).to.have.been.calledWith(progressEvent);
    });

    it('should support canceler by calling "cancel" function of the upload promise', function() {
      const promise = $q.when({});

      promise.cancel = sinon.spy();

      linshareApiClient.createDocument = sinon.stub().returns(promise);

      const file = { name: 'Learn_JS_in_6_hours.pdf' };
      const size = 12345;
      const fileType = 'text';
      const cancelerDeferred = $q.defer();

      linshareFileUpload.uploadFile(null, file, fileType, size, {}, cancelerDeferred.promise);

      cancelerDeferred.resolve();
      $rootScope.$digest();

      expect(promise.cancel).to.have.been.calledOnce;
    });
  });
});
