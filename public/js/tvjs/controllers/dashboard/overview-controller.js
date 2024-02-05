'use strict';

/**
 * @ngdoc function
 * @name DashboardServerController
 * @module dashboardServer
 * @kind function
 * 
 */

angular.module('dashboard', []).controller('DashboardOverviewController',
		function($scope, $rootScope, $sce, $location, $window, serverList) {
			$scope.servers = serverList.data;
			$scope.totalItems = $scope.servers.length;
			$scope.influxserver = $rootScope.configInfo.influx;
			
			$scope.dashboardMap = new Map();
			$scope.dashboardMap.set("influx_db_path", $scope.influxserver);
			$scope.dashboardMap.set("hostname", "");
			
			var activedServers = [];

			$scope.servers.forEach(function(item) {
				if (item.registered === 1) {
					activedServers.push(item);
				}
			});

			$scope.servers = activedServers;
			$scope.ALL = "Summary of All"
			$scope.selectedServer = $scope.ALL;

			$scope.redrawMe = true;

			$scope.selectedServerChange = function() {
				$scope.redrawMe = false;

				var hostname = "";

				if ($scope.ALL !== $scope.selectedServer) {
					$scope.servers.forEach(function(server) {
						if ( ("" + server.id) === $scope.selectedServer) {
							hostname = server.system_serial + "_";
						}

					});

				}

				$scope.dashboardMap.set("hostname", hostname);

				setTimeout(function() {
					$scope.redrawMe = true;
				}, -1);

			};

		});
