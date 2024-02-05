'use strict';

/**
 * @ngdoc function
 * @name DashboardServerController
 * @module dashboardServer
 * @kind function
 *
 */

angular.module('dashboardDetails', [])
    .controller('DashboardDetailsController', function ($scope, serverList, $stateParams, $location, $anchorScroll) {
        $scope.servers = serverList.data;
        var target = 'anchor' + $stateParams.type;
        $location.hash(target);
        $anchorScroll();
    });

