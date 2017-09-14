/**
 * Copyright 2017 Erealm Info & Tech.
 *
 * Created by <%= developer %> at <%= createdTime %>.
 */

(function () {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('<%= slugifiedPluralName %>', {
        url: '/<%= slugifiedPluralName %>',
        controller: '<%= classifiedPluralName %>Controller',
        template: 'modules/<%= moduleName %>/client/views/<%= slugifiedPluralName %>.client.view.html'
      });
  }

  get<%= classifiedSingularName %>.$inject = ['$stateParams', '<%= classifiedPluralName %>Service'];

  function get<%= classifiedSingularName %>($stateParams, <%= classifiedPluralName %>Service) {
    return <%= classifiedPluralName %>Service.get({
      <%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id
    }).$promise;
  }

  new<%= classifiedSingularName %>.$inject = ['<%= classifiedPluralName %>Service'];

  function new<%= classifiedSingularName %>(<%= classifiedPluralName %>Service) {
    return new <%= classifiedPluralName %>Service();
  }
}());
