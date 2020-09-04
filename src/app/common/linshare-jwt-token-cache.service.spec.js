'use strict';

/* global chai: false */
/* global sinon: false */

const { expect } = chai;

describe('The linshareJwtTokenCache service', function() {
  let cacheOption;
  let $rootScope, $q;
  let linshareApiService;

  beforeEach(function() {
    function CacheMock(_cacheOption_) {
      cacheOption = _cacheOption_;
    }
    angular.mock.module('esn.cache', function($provide) {
      $provide.value('Cache', CacheMock);
    });
    angular.mock.module('linagora.esn.linshare');

    // eslint-disable-next-line no-unused-vars
    angular.mock.inject(function(_$q_, _$rootScope_, _linshareApiService_, _linshareJwtTokenCache_) {
      $q = _$q_;
      $rootScope = _$rootScope_;
      linshareApiService = _linshareApiService_;
    });
  });

  describe('The loader fn', function() {
    it('should call linshareApiService to generate JWT token', function(done) {
      const token = '123';

      linshareApiService.generateJwtToken = sinon.stub().returns($q.when({ data: token }));

      cacheOption.loader().then(function(data) {
        expect(data).to.equal(token);
        done();
      });

      $rootScope.$digest();
    });
  });

  describe('The keyBuilder fn', function() {
    it('should the cache key', function() {
      expect(cacheOption.keyBuilder()).to.equal('token');
    });
  });
});
