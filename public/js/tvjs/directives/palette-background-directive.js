'use strict';

/**
* @ngdoc directive
* @name paletteBackground
* @restrict A
* @scope
*
* @description
*
* Adds a palette colour and contrast CSS to an element
*
* @usage
* ```html
* <div palette-background="green:500">Coloured content</div>
* ```
*/
angular.module('tv')
.directive('paletteBackground', function (tvTheming) {
    return {
        restrict: 'A',
        link: function ($scope, $element, attrs) {
            var splitColor = attrs.paletteBackground.split(':');
            var color = tvTheming.getPaletteColor(splitColor[0], splitColor[1]);

            if(color !== undefined) {
                $element.css({
                    'background-color': tvTheming.rgba(color.value),
                    'border-color': tvTheming.rgba(color.value),
                    'color': tvTheming.rgba(color.contrast)
                });
            }
        }
    };
});
