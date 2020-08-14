'use strict';

angular.module('linagora.esn.linshare')
  .component('linshareConfigForm', {
    template: require('./linshare-config-form.pug'),
    bindings: {
      configurations: '='
    }
  });
