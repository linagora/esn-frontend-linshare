'use strict';

/* global chai: false */
/* global sinon: false */

let expect = chai.expect;

describe('The linshareFileUpload service', function() {
  let $q, $rootScope, linshareApiClient;
  let linshareFileUpload;

  beforeEach(module('linagora.esn.linshare'));

  beforeEach(inject(function(_$rootScope_, _$q_, _linshareApiClient_, _linshareFileUpload_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    linshareApiClient = _linshareApiClient_;
    linshareFileUpload = _linshareFileUpload_;
  }));

  describe('The uploadFile fn', function() {
    it('should call LinShare API to create document in My space', function() {
      linshareApiClient.createDocument = sinon.stub().returns($q.when({}));

      let file = { name: 'Learn_JS_in_6_hours.pdf' };
      let size = 12345;
      let fileType = 'text';

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

      let file = { name: 'Learn_JS_in_6_hours.pdf' };
      let size = 12345;
      let fileType = 'text';
      let notifySpy = sinon.spy();

      linshareFileUpload.uploadFile(null, file, fileType, size).then(null, null, notifySpy);

      let progressEvent = { loaded: 7, total: 10 };

      onUploadProgress(progressEvent);
      $rootScope.$digest();

      expect(notifySpy).to.have.been.calledWith(progressEvent);
    });

    it('should support canceler by calling "cancel" function of the upload promise', function() {
      let promise = $q.when({});

      promise.cancel = sinon.spy();

      linshareApiClient.createDocument = sinon.stub().returns(promise);

      let file = { name: 'Learn_JS_in_6_hours.pdf' };
      let size = 12345;
      let fileType = 'text';
      let cancelerDeferred = $q.defer();

      linshareFileUpload.uploadFile(null, file, fileType, size, {}, cancelerDeferred.promise);

      cancelerDeferred.resolve();
      $rootScope.$digest();

      expect(promise.cancel).to.have.been.calledOnce;
    });
  });
});
