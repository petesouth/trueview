'use strict';

/**
 * @ngdoc function
 * @name DashboardServerExplorerController
 * @module dashboardServerExplorer
 * @kind function
 *
 */

angular.module('settingsTools', [])
.controller('SettingsToolsController', function ($scope, $stateParams, Servers, $rootScope, $sce, $mdDialog, $anchorScroll, $location, $timeout, $window) {
    
	$scope.influxserver = $rootScope.configInfo.influx;



    $scope.trustedMonitcommandoMain = (function () {
        var full_src = "/monitcommando/index.html#/main?ifdb=" + $scope.influxserver;
        return $sce.trustAsResourceUrl(full_src);
    })();


});
