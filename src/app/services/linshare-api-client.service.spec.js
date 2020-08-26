'use strict';

/* global chai: false */
/* global sinon: false */

let expect = chai.expect;

describe('The linshareApiClient service', function() {
  let $rootScope, $q, linshareApiClientProvider, linshareApiClient, esnConfigMock;

  beforeEach(angular.mock.module('linagora.esn.linshare', function($provide) {
    $provide.value('esnConfig', function() {
      return esnConfigMock;
    });
  }));

  beforeEach(angular.mock.inject(function(_$rootScope_, _$q_, _linshareApiClientProvider_, _linshareApiClient_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    linshareApiClientProvider = _linshareApiClientProvider_;
    linshareApiClient = _linshareApiClient_;
  }));

  describe('The createDocument fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      linshareApiClient.createDocument()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should create user document', function() {
      let client = {
        user: {
          documents: {
            create: sinon.stub().returns($q.when())
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      linshareApiClient.createDocument({
        file: { name: 'my file' },
        fileSize: 100
      });

      $rootScope.$digest();

      expect(client.user.documents.create).to.have.been.calledWith();
    });

    it('should support cancellation', function() {
      let promise = $q.when();
      let client = {
        user: {
          documents: {
            create: sinon.stub().returns(promise)
          }
        }
      };

      promise.cancel = sinon.spy();

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));

      let uploadPromise = linshareApiClient.createDocument({
        file: { name: 'my file' },
        fileSize: 100
      });

      $rootScope.$digest();

      uploadPromise.cancel();

      expect(promise.cancel).to.have.been.calledWith();
    });
  });

  describe('The createDocumentFromUrl fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      linshareApiClient.createDocumentFromUrl()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should create document from URL', function() {
      let client = {
        user: {
          documents: {
            createFromUrl: sinon.spy()
          }
        }
      };
      let data = { url: '123' };
      let options = { async: true };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      linshareApiClient.createDocumentFromUrl(data, options);

      $rootScope.$digest();

      expect(client.user.documents.createFromUrl).to.have.been.calledWith(data, options);
    });
  });

  describe('The getDocumentAsyncTaskById fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      linshareApiClient.getDocumentAsyncTaskById()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should get the async task', function() {
      let client = {
        user: {
          documents: {
            getAsyncTask: sinon.spy()
          }
        }
      };
      let asyncTaskId = '123';

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      linshareApiClient.getDocumentAsyncTaskById(asyncTaskId);

      $rootScope.$digest();

      expect(client.user.documents.getAsyncTask).to.have.been.calledWith(asyncTaskId);
    });
  });

  describe('The listWorkgroups fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      linshareApiClient.listWorkgroups()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should list work groups', function() {
      let client = {
        user: {
          workgroup: {
            list: sinon.spy()
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      linshareApiClient.listWorkgroups();

      $rootScope.$digest();

      expect(client.user.workgroup.list).to.have.been.calledWith();
    });
  });

  describe('The listNodes fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      linshareApiClient.listNodes()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should list nodes of a workgroup node', function() {
      let client = {
        user: {
          workgroup: {
            listNodes: sinon.spy()
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      linshareApiClient.listNodes();

      $rootScope.$digest();

      expect(client.user.workgroup.listNodes).to.have.been.calledWith();
    });
  });

  describe('The listDocuments fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      linshareApiClient.listDocuments()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should list user documents', function() {
      let client = {
        user: {
          documents: {
            list: sinon.spy()
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      linshareApiClient.listDocuments();

      $rootScope.$digest();

      expect(client.user.documents.list).to.have.been.calledWith();
    });
  });

  describe('The shareDocuments fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      linshareApiClient.shareDocuments()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should list user documents', function() {
      let client = {
        user: {
          shares: {
            shareDocuments: sinon.spy()
          }
        }
      };

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      linshareApiClient.shareDocuments();

      $rootScope.$digest();

      expect(client.user.shares.shareDocuments).to.have.been.calledWith();
    });
  });

  describe('The downloadDocument fn', function() {
    it('should reject if it cannot get client instance from provider', function(done) {
      linshareApiClientProvider.get = sinon.stub().returns($q.reject(new Error('an_error')));
      linshareApiClient.downloadDocument()
        .catch(function(error) {
          expect(error.message).to.equal('an_error');
          done();
        });

      $rootScope.$digest();
    });

    it('should download the document', function() {
      let client = {
        user: {
          workgroup: {
            downloadDocument: sinon.spy()
          }
        }
      };
      let workGroupUuid = 'toto';
      let documentUuid = 'tata';

      linshareApiClientProvider.get = sinon.stub().returns($q.when(client));
      linshareApiClient.downloadDocument(workGroupUuid, documentUuid);

      $rootScope.$digest();

      expect(client.user.workgroup.downloadDocument).to.have.been.calledWith(workGroupUuid, documentUuid);
    });
  });
});
