'use strict';

/**
 * @ngdoc filter
 * @name tableImage
 * @module tv
 * @kind filter
 *
 * Used for table pagination
 */
angular.module('tv')
.filter('startFrom',function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    };
});