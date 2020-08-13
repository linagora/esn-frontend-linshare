'use strict';

angular.module('linagora.esn.linshare')
  .run(function(esnModuleRegistry, LINSHARE_MODULE_METADATA) {
    esnModuleRegistry.add(LINSHARE_MODULE_METADATA);
  });
