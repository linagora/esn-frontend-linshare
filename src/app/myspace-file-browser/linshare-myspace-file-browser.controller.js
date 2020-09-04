'use strict';

require('../services/linshare-loaders.service');

angular.module('linagora.esn.linshare')
  .controller('linshareMyspaceFileBrowserController', linshareMyspaceFileBrowserController);

function linshareMyspaceFileBrowserController(linshareFileBrowserLoaders, esnI18nService) {
  const self = this;

  self.options = {
    multipleSelect: true,
    rootName: esnI18nService.translate('My space').toString()
  };
  self.loadNode = linshareFileBrowserLoaders.loadMySpace();
}
