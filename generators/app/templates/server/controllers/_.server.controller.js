/**
 * Copyright 2017 Erealm Info & Tech.
 *
 * Created by <%= developer %> at <%= createdTime %>.
 */

'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  <%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
  responseHandler = require(path.resolve('./config/helper/responseHelper')),
  _ = require('lodash');

/**
 * Create a <%= humanizedSingularName %>
 */
exports.create = function(req, res) {
  var <%= camelizedSingularName %> = new <%= classifiedSingularName %>(req.body);

  <%= camelizedSingularName %>.save(function(err) {
    if (err) {
      return res.send(responseHandler.getMongoErrorMessage(err));
    } else {
      return res.send(responseHandler.getResponseData({
        code: 'CMSV_SHOW_SUCCESS_MESSAGE',
        messageInfo: ['<%= camelizedSingularName %> has been updated']
      }));
    }
  });
};

/**
 * Show the current <%= humanizedSingularName %>
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %> ? req.<%= camelizedSingularName %>.toJSON() : {};

  return res.send(responseHandler.getSuccessData(<%= camelizedSingularName %>));
};

/**
 * Update a <%= humanizedSingularName %>
 */
exports.update = function(req, res) {
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %>;

  <%= camelizedSingularName %> = _.extend(<%= camelizedSingularName %>, req.body);

  <%= camelizedSingularName %>.save(function(err) {
    if (err) {
      return res.status(400).send(responseHandler.getMongoErrorMessage(err));
    } else {
      return res.send(responseHandler.getSuccessData(<%= camelizedSingularName %>));
    }
  });
};

/**
 * Delete an <%= humanizedSingularName %>
 */
exports.delete = function(req, res) {
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %>;

  <%= camelizedSingularName %>.remove(function(err) {
    if (err) {
      return res.status(400).send(responseHandler.getMongoErrorMessage(err));
    } else {
      return res.send(responseHandler.getSuccessData(<%= camelizedSingularName %>));
    }
  });
};

/**
 * List of <%= humanizedPluralName %>
 */
exports.list = function(req, res) {
  <%= classifiedSingularName %>.find().sort('-created').exec(function(err, <%= camelizedPluralName %>) {
    if (err) {
      return res.status(400).send(responseHandler.getMongoErrorMessage(err));
    } else {
      return res.send(responseHandler.getSuccessData(<%= camelizedSingularName %>));
    }
  });
};

/**
 * <%= humanizedSingularName %> middleware
 */
exports.<%= camelizedSingularName %>ByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      code: 400,
      message: '<%= humanizedSingularName %> is invalid'
    });
  }

  <%= classifiedSingularName %>.findById(id).exec(function (err, <%= camelizedSingularName %>) {
    if (err) {
      return next(err);
    } else if (!<%= camelizedSingularName %>) {
      return res.status(404).send({
        code: 404,
        message: 'No <%= humanizedSingularName %> with that identifier has been found'
      });
    }
    req.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
    next();
  });
};
