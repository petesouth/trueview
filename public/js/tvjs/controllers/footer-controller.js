'use strict';

/**
 * @ngdoc function
 * @name FooterController
 * @module tv
 * @kind function
 *
 * @description
 *
 * Handles the footer view
 */
angular.module('tv').
controller('FooterController', function ($scope, APP) {
    $scope.footerInfo = {
        appName: APP.name,
        appLogo: APP.logo,
        date: new Date(),
        version: APP.version
    };
});