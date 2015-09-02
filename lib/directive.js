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

      attrs[style] = value;
      setCss(toElement, attrs);
    });
  }

  autocomplete.restrict = 'A';

  autocomplete.scope = {
    input : '=ngModel',
    withAutocomplete: '='
  };

  autocomplete.controller = ['$scope', function($scope)
  {
    this.doAutocomplete = function(value, delimiter, fill)
    {
      if(!value)
        return;

      var split = value.split(delimiter);
      var autocomplete = split[1];

      var toAutocomplete = split.length === 2 &&
                              (typeof fill === 'string' && fill ||
                                fill[autocomplete.charAt(0)]);

      if(toAutocomplete && toAutocomplete.search(split[1]) === 0)
      {
        $scope.value = toAutocomplete.replace(autocomplete, '');
      }
      else
      {
        $scope.value = '';
      }
    };
  }];

  autocomplete.link = function(scp, elem, attr, controller)
  {
    scp.value = '';

    var delimiter = attr.delimiter;

    var fill = scp.$eval(attr.fill) || attr.fill || '';
    var wrapper = angular.element('<div class="autocomplete-input-wrapper"></div>');
    var phantomSpan = angular.element('<span class="autocomplete-input-phantom-span">{{input}}</span>');
    var autocompleteSpan = angular.element('<span class="autocomplete-input-autocomplete-span">{{value}}</span>');

    setCss(wrapper[0], { position: 'relative', 'text-align': 'left'});
    setCss(elem[0], { position: 'absolute', 'z-index': 1 });
    setCss(phantomSpan[0], { position: 'relative', visibility: 'hidden', display: 'inline-block' });
    setCss(autocompleteSpan[0], { position: 'relative', 'z-index': 10, display: 'inline-block' });

    copyStyle(elem[0], wrapper[0], ['height', 'margin']);
    copyStyle(elem[0], phantomSpan[0], ['font-size', 'color', 'height' , 'padding-left', 'margin-left', 'border-left']);
    copyStyle(elem[0], autocompleteSpan[0], ['font-size', 'color', 'height']);
    ;
    phantomSpan[0].style['line-height'] = phantomSpan[0].style.height;
    autocompleteSpan[0].style['line-height'] = autocompleteSpan[0].style.height;

    elem.after(wrapper);
    wrapper.prepend(elem);
    wrapper.append(phantomSpan);
    wrapper.append(autocompleteSpan);

    $compile(phantomSpan)(scp);
    $compile(autocompleteSpan)(scp);

    scp.$watch('input', function(value)
    {
      controller.doAutocomplete(value, delimiter, fill);
    });

    elem.on('blur', function()
    {
      var autocomplete = scp.withAutocomplete && scp.value || '';

      scp.input = scp.input ? scp.input + autocomplete : '';
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
