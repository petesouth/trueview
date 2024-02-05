'use strict';

/**
 * @ngdoc function
 * @name DashboardSystemsController
 * @module dashboardSystems
 * @kind function
 *
 */

angular.module('dashboardSystems', [])
.controller('DashboardSystemsController', function ($scope,  $rootScope, $sce, $location, $window, serverList) {
    $scope.servers = serverList.data;
    $scope.totalItems = $scope.servers.length;
    $scope.influxserver = $rootScope.configInfo.influx;
    
    $scope.dashboardMap = new Map();
    $scope.dashboardMap.set("influx_db_path", $scope.influxserver);
    	

});