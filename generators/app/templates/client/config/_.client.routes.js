/**
 * Copyright <%= createdYear %> Erealm Info & Tech.
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
      .state('dashboard.<%= slugifiedPluralName %>', {
        url: 'dashboard/<%= slugifiedPluralName %>',
        controller: '<%= classifiedPluralName %>Controller',
        templateUrl: 'modules/<%= moduleName %>/client/views/<%= slugifiedSingularName %>.client.view.html',
        controllerAs: 'vm',
        resolve: {
            <%= slugifiedSingularName %>Resolve: new<%= classifiedSingularName %>
        },
        data: {
            roles: ['admin'],
            pageTitle: 'Edit <%= humanizedSingularName %> {{ <%= slugifiedSingularName %>Resolve.name }}'
        }
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
