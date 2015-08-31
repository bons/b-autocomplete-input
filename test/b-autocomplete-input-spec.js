'use strict';

require('angular');
require('angular-mocks');
var app = require('../lib/');

describe('Test Suite: bAutocompleteInput', function()
{
  var $compile,
      $rootScope;

  var addElement = function()
  {
    var body = document.querySelector('body');
    body.innerHTML = '<input type="text" autocomplete-input ng-model="autocomplete.input" delimiter="." fill="bons.me">';
    return $compile(body)($rootScope);
  };

  beforeEach(angular.mock.module(app));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should be defined', function()
  {
    expect(app).toBeDefined();
  });

  describe('Autocomplete directive', function()
  {
    it('should add the appropiate elements', function()
    {
      var element = addElement();

      $rootScope.$digest();

      expect(element.html()).toBeDefined();
    });
  });

});
