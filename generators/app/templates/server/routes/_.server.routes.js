/**
 * Copyright <%= createdYear %> Erealm Info & Tech.
 *
 * Created by <%= developer %> at <%= createdTime %>.
 */

'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    authHelper = require(path.resolve('./config/helper/auth')),
    <%= camelizedPluralName %> = require('../controllers/<%= slugifiedPluralName %>.server.controller');

module.exports = function(app) {
  // <%= humanizedPluralName %> Routes
  app.route('/app/<%= slugifiedPluralName %>').all(authHelper.isAllowed)
    .get(<%= camelizedPluralName %>.list)
    .post(<%= camelizedPluralName %>.create);

  app.route('/app/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id').all(authHelper.isAllowed)
    .get(<%= camelizedPluralName %>.read)
    .put(<%= camelizedPluralName %>.update)
    .delete(<%= camelizedPluralName %>.delete);

  // Finish by binding the <%= humanizedSingularName %> middleware
  app.param('<%= camelizedSingularName %>Id', <%= camelizedPluralName %>.<%= camelizedSingularName %>ByID);
};
