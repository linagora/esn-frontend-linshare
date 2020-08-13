'use strict';

angular.module('linagora.esn.linshare')
  .component('linshareMyspaceFileBrowser', {
    template: require('./linshare-myspace-file-browser.pug'),
    bindings: {
      selectedNodes: '='
    },
    controller: 'linshareMyspaceFileBrowserController'
  });
