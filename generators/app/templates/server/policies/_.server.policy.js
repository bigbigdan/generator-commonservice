/**
 * Copyright 2017 Erealm Info & Tech.
 *
 * Created by <%= developer %> at <%= createdTime %>.
 */

'use strict';

/**
 * Invoke <%= humanizedPluralName %> Permissions
 */
exports.invokeRolesPolicies = function (acl) {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/app/<%= slugifiedPluralName %>',
      permissions: '*'
    }, {
      resources: '/app/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/app/<%= slugifiedPluralName %>',
      permissions: ['get', 'post']
    }, {
      resources: '/app/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/app/<%= slugifiedPluralName %>',
      permissions: ['get']
    }, {
      resources: '/app/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id',
      permissions: ['get']
    }]
  }]);
};
