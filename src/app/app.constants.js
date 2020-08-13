'use strict';

angular.module('linagora.esn.linshare')
  .constant('LINSHARE_NODE_ICON', {
    DOCUMENT: 'mdi-file'
  })
  .constant('LINSHARE_MODULE_METADATA', {
    id: 'linagora.esn.linshare',
    title: 'LinShare',
    icon: '/linagora.esn.linshare/images/linshare-icon.svg',
    disableable: true,
    isDisplayedByDefault: false,
    config: {
      template: 'linshare-config-form',
      displayIn: {
        user: false,
        domain: false,
        platform: true
      }
    }
  })

  // we choose 4 minutes because of LinShare 5 minutes limit
  // and we think it is acceptable to spend some time for round trip time (1 minute for now)
  .constant('LINSHARE_JWT_TOKEN_CACHE_TIMEOUT', 240000);
