'use strict';

function autocompleteDirective($compile)
{
  var autocomplete = {};

  function getCss(elm, attr)
  {
    return window.getComputedStyle(elm, null).getPropertyValue(attr);
  }

  function setCss(elm, attrs)
  {
    for(var style in attrs)
    {
      if(attrs.hasOwnProperty(style))
      {
        elm.style[style] = attrs[style];
      }
    }
  }


  function copyStyle(fromElement, toElement, styles)
  {
    styles.forEach(function(style)
    {
      var attrs = {};
      var value = getCss(fromElement, style);

      if(style === 'font-size')
      {
        value = (parseInt(value) + 2) + 'px';
      }

      attrs[style] = value;
      setCss(toElement, attrs);
    });
  }

  autocomplete.restrict = 'A';

  autocomplete.scope = true;

  autocomplete.controller = ['$scope', function($scope)
  {
    this.doAutocomplete = function(value, delimiter, fill)
    {
      var split = value.split(delimiter);
      var autocomplete = split[1];

      var toAutocomplete = split.length === 2 &&
                              (typeof fill === 'string' && fill ||
                                fill[autocomplete.charAt(0)]);

      if(toAutocomplete && toAutocomplete.search(split[1]) === 0)
      {
        $scope.autocomplete.value = toAutocomplete.replace(autocomplete, '');
      }
      else
      {
        $scope.autocomplete.value = '';
      }
    };
  }];

  autocomplete.link = function(scp, elem, attr, controller)
  {
    scp.autocomplete = {
      input : '',
      value : ''
    };

    var delimiter = attr.delimiter;

    var fill = scp.$eval(attr.fill) || attr.fill || '';
    var wrapper = angular.element('<div class="autocomplete-input-wrapper"></div>');
    var phantomSpan = angular.element('<span class="autocomplete-input-phantom-span">{{autocomplete.input}}</span>');
    var autocompleteSpan = angular.element('<span class="autocomplete-input-autocomplete-span">{{autocomplete.value}}</span>');

    setCss(wrapper[0], { position: 'relative' });
    setCss(elem[0], { position: 'absolute', 'z-index': 1 });
    setCss(phantomSpan[0], { position: 'relative', visibility: 'hidden' });
    setCss(autocompleteSpan[0], { position: 'relative', 'z-index': 10 });

    copyStyle(elem[0], phantomSpan[0], ['font-size', 'color', 'padding-left', 'margin-left', 'border-left']);
    copyStyle(elem[0], autocompleteSpan[0], ['font-size', 'color']);

    elem.after(wrapper);
    wrapper.prepend(elem);
    wrapper.append(phantomSpan);
    wrapper.append(autocompleteSpan);

    $compile(phantomSpan)(scp);
    $compile(autocompleteSpan)(scp);

    scp.$watch('autocomplete.input', function(value)
    {
      controller.doAutocomplete(value, delimiter, fill);
    });

    elem.on('blur', function()
    {
      scp.autocomplete.input = scp.autocomplete.input + scp.autocomplete.value;
      scp.$apply();
    });

    scp.$on("$destroy", function() {
      wrapper.after(elem);
      wrapper.remove();
    });
  };

  return autocomplete;
}

module.exports = autocompleteDirective;
