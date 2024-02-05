'use strict';

/**
 * @ngdoc filter
 * @name tableImage
 * @module tv
 * @kind filter
 *
 * Creates a div with an image backround
 */
 angular.module('tv')
 .filter('tableImage', function ($sce) {
    return function (value) {
        return $sce.trustAsHtml('<div style=\"background-image: url(\'' + value + '\')\"/>');
    };
});