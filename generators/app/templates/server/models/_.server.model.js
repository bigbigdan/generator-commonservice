/**
 * Copyright 2017 Erealm Info & Tech.
 *
 * Created by <%= developer %> at <%= createdTime %>.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * <%= humanizedSingularName %> Schema
 */
var <%= classifiedSingularName %>Schema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill <%= humanizedSingularName %> name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

<%= classifiedSingularName %>Schema.pre('validate', function(next) {
  var currentTime = new Date();
  if (this.isNew) {
    this.createTime = currentTime;
  } else {
    this.updateTime = currentTime;
  }
  next();
});

mongoose.model('<%= classifiedSingularName %>', <%= classifiedSingularName %>Schema, '<%= classifiedSingularName %>s');
