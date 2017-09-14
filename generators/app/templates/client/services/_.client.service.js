/**
 * Copyright 2017 Erealm Info & Tech.
 *
 * Created by <%= developer %> at <%= createdTime %>.
 */

(function () {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .factory('<%= classifiedPluralName %>Service', <%= classifiedPluralName %>Service);

  <%= classifiedPluralName %>Service.$inject = ['$resource'];

  function <%= classifiedPluralName %>Service($resource) {
    return $resource('app/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', {
      <%= camelizedSingularName %>Id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
