'use strict';

describe('The linshareApiService service', function() {
  let $httpBackend;
  let linshareApiService;

  beforeEach(function() {
    angular.mock.module('linagora.esn.linshare');

    angular.mock.inject(function(_$httpBackend_, _linshareApiService_) {
      $httpBackend = _$httpBackend_;
      linshareApiService = _linshareApiService_;
    });
  });

  describe('The generateJwtToken fn', function() {
    it('should POST to the right endpoint to generate JWT token', function() {
      $httpBackend.expectPOST('/linagora.esn.linshare/api/token').respond(200);

      linshareApiService.generateJwtToken();

      $httpBackend.flush();
    });
  });
});
