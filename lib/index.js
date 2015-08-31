'use strict';

var MODULE_NAME = 'bAutocompleteInput';

var angular = require('angular');
var autocompleteDirective = require('./directive');
var app = angular.module(MODULE_NAME, []);

app.directive('autocompleteInput',['$compile', autocompleteDirective]);

module.exports = MODULE_NAME;
