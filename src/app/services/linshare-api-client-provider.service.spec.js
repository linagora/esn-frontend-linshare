'use strict';

/* global chai: false */
/* global sinon: false */

let expect = chai.expect;

describe('The linshareApiClientProvider service', function() {
  let $rootScope, $q;
  let linshareJwtTokenCache, linshareApiClientProvider;
  let ClientMock, esnConfigMock;

  beforeEach(function() {
    ClientMock = sinon.spy();
    esnConfigMock = sinon.stub();

    module('esn.configuration', function($provide) {
      $provide.value('esnConfig', esnConfigMock);
    });

    module('linagora.esn.linshare', function($provide) {
      $provide.value('LinshareApiClient', {
        Client: ClientMock
      });
    });

    inject(function(_$q_, _$rootScope_, _linshareJwtTokenCache_, _linshareApiClientProvider_) {
      $q = _$q_;
      $rootScope = _$rootScope_;
      linshareJwtTokenCache = _linshareJwtTokenCache_;
      linshareApiClientProvider = _linshareApiClientProvider_;

      linshareJwtTokenCache.get = sinon.stub().returns($q.when('token'));
      esnConfigMock.returns($q.when('baseUrl'));
    });
  });

  describe('The get fn', function() {
    it('should reject if baseUrl is not configured', function(done) {
      esnConfigMock.returns($q.when());

      linshareApiClientProvider.get().catch(function(err) {
        expect(err.message).to.equal('LinShare API base path for frontend is not configured');
        done();
      });

      $rootScope.$digest();
    });

    it('should resolve a LinshareApiClient instance', function(done) {
      linshareApiClientProvider.get().then(function(client) {
        expect(client).to.be.instanceof(ClientMock);
        expect(ClientMock).to.have.been.calledWith({
          baseUrl: 'baseUrl',
          auth: {
            type: 'jwt',
            token: 'token'
          }
        });
        done();
      });

      $rootScope.$digest();
    });

    it('should cache the LinshareApiClient instance for further calls', function(done) {
      linshareApiClientProvider.get().then(function(client1) {
        linshareApiClientProvider.get().then(function(client2) {
          expect(client1).to.equal(client2);
          expect(ClientMock).to.have.been.calledOnce;
          done();
        });
      });

      $rootScope.$digest();
    });

    it('should recreate the LinshareApiClient instance when JWT token changed (cache expired)', function(done) {
      linshareApiClientProvider.get().then(function(client1) {
        linshareJwtTokenCache.get = sinon.stub().returns($q.when('new token'));
        linshareApiClientProvider.get().then(function(client2) {
          expect(client1).to.not.equal(client2);
          expect(ClientMock).to.have.been.calledTwice;
          done();
        });
      });

      $rootScope.$digest();
    });
  });
});
