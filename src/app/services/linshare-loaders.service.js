'use strict';

angular.module('linagora.esn.linshare')
  .factory('linshareFileBrowserLoaders', linshareFileBrowserLoaders);

function linshareFileBrowserLoaders(linshareApiClient, LINSHARE_NODE_ICON) {
  return {
    loadMySpace
  };

  function loadMySpace() {
    return linshareApiClient.listDocuments()
      .then(function(docs) {
        return docs.map(function(doc) {
          doc.icon = LINSHARE_NODE_ICON.DOCUMENT;
          doc.isSelectable = true;

          return doc;
        });
      });
  }
}
