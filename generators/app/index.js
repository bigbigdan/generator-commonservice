/**
 * Copyright 2017 Erealm Info & Tech.
 *
 * Created by <%= developer %> at <%= createdTime %>.
 */

'use strict';

const util = require('util'),
  inflections = require('underscore.inflections'),
  s = require('underscore.string'),
  _ = require('lodash'),
  mkdirp = require('mkdirp'),
  Generator = require('yeoman-generator');

var formatDate = function(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  askForModuleName() {
   var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'developer',
      default: 'erealm',
      message: 'What is the name of the developer?'
    }, {
      type: 'input',
      name: 'moduleName',
      default: 'erealm',
      message: 'What is the name of the module?'
    }];

    this.prompt(prompts).then(props => {
      this.props.moduleName = props.moduleName;
      this.props.developer = props.developer;
      this.props.createdTime = formatDate(new Date());
      done();
    });
  }

  askForFunctionName() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'functionName',
      default: this.props.moduleName,
      message: 'What is the name of the function?'
    }];

    this.prompt(prompts).then(props => {
      this.props.functionName = props.functionName;

      this.props.createdTime = formatDate(new Date());

      this.props.slugifiedName = s(this.props.functionName).slugify().value();

      this.props.slugifiedPluralName = inflections.pluralize(this.props.slugifiedName);
      this.props.slugifiedSingularName = inflections.singularize(this.props.slugifiedName);

      this.props.camelizedPluralName = s(this.props.slugifiedPluralName).camelize().value();
      this.props.camelizedSingularName = s(this.props.slugifiedSingularName).camelize().value();

      this.props.classifiedPluralName = s(this.props.slugifiedPluralName).classify().value();
      this.props.classifiedSingularName = s(this.props.slugifiedSingularName).classify().value();

      this.props.humanizedPluralName = s(this.props.slugifiedPluralName).humanize().value();
      this.props.humanizedSingularName = s(this.props.slugifiedSingularName).humanize().value();

      this.props.capitalizedSingularName = s(this.props.humanizedSingularName).capitalize().value();

      done();
    });
  }

  renderModule() {
    // Create module folder
    mkdirp.sync('modules/' + this.props.moduleName);

    // Render angular module files
    this.fs.copyTpl(this.templatePath('client/config/_.client.routes.js'),
      this.destinationPath('modules/' + this.props.moduleName + '/client/config/' + this.props.slugifiedPluralName + '.client.routes.js'), this.props);

    this.fs.copyTpl(this.templatePath('client/controllers/_.client.controller.js'),
      this.destinationPath('modules/' + this.props.moduleName + '/client/controllers/' + this.props.slugifiedPluralName + '.client.controller.js'), this.props);

    this.fs.copyTpl(this.templatePath('client/services/_.client.service.js'),
      this.destinationPath('modules/' + this.props.moduleName + '/client/services/' + this.props.slugifiedPluralName + '.client.service.js'), this.props);

    // Render angular module views
    this.fs.copyTpl(this.templatePath('client/views/_.client.view.html'),
      this.destinationPath('modules/' + this.props.moduleName + '/client/views/' + this.props.slugifiedSingularName + '.client.view.html'), this.props);

    // Render angular module definition
    this.fs.copyTpl(this.templatePath('client/_.client.module.js'),
      this.destinationPath('modules/' + this.props.moduleName + '/client/' + this.props.slugifiedPluralName + '.client.module.js'), this.props);

      // Render server module config
    this.fs.copyTpl(this.templatePath('server/config/_.server.config.js'),
      this.destinationPath('modules/' + this.props.moduleName + '/server/config/' + this.props.slugifiedPluralName + '.server.config.js'), this.props);

    // Render express module files
    this.fs.copyTpl(this.templatePath('server/controllers/_.server.controller.js'),
      this.destinationPath('modules/' + this.props.moduleName + '/server/controllers/' + this.props.slugifiedPluralName + '.server.controller.js'), this.props);
    this.fs.copyTpl(this.templatePath('server/models/_.server.model.js'),
      this.destinationPath('modules/' + this.props.moduleName + '/server/models/' + this.props.slugifiedSingularName + '.server.model.js'), this.props);
    this.fs.copyTpl(this.templatePath('server/routes/_.server.routes.js'),
      this.destinationPath('modules/' + this.props.moduleName + '/server/routes/' + this.props.slugifiedPluralName + '.server.routes.js'), this.props);

    // Render express policy
    this.fs.copyTpl(this.templatePath('server/policies/_.server.policy.js'),
      this.destinationPath('modules/' + this.props.moduleName + '/server/policies/' + this.props.slugifiedPluralName + '.server.policy.js'), this.props);
  }
};
