'use strict';

/**
 * @ngdoc function
 * @name DashboardLogController
 * @module dashboardLog
 * @kind function
 *
 */

angular.module('dashboardLog', [])
    .controller('DashboardLogController', function ($scope, $rootScope, $sce, serverList, $location) {
    	
		$scope.servers = serverList.data;
		$scope.totalItems = $scope.servers.length;
		$scope.influxserver = $rootScope.configInfo.influx;
		$scope.dashboardMap = new Map();
		$scope.dashboardMap.set("influx_db_path", $scope.influxserver);
		
		$scope.elasticLogPanelUrl = $sce.trustAsResourceUrl("/monitcommando/nopage.html");
		$scope.elasticIndexName = "";
		$scope.existingIndices = [];
		
		
		$scope.selectedIndexChange = function() {
			
			$scope.elasticLogPanelUrl = $sce.trustAsResourceUrl("/monitcommando/index.html#/elasticlogstashgridpanel?host=&indexName=" + $scope.elasticIndexName + "&mvps=50&ps=1&fq=4000&mc=%5B%5D&ifdb=" + $scope.influxserver + "&rmb=1&rdb=1&schemeName=scheme01&begIndex=0&batchSize=100&startDate=");
			
		}
		
		gUtil.gElasticService.getAllIndices($scope.influxserver, function (response) {
			$scope.existingIndices = [];
			
			response.items.forEach(function(item) {
				if( item !== ".kibana" && item !== "annotate" ) {
					$scope.existingIndices.push(item);
				}
				
			});
			
			$scope.elasticIndexName =  ($scope.existingIndices.length > 0 ) ? $scope.existingIndices[0] : "";
	
			
			$scope.selectedIndexChange();
			$scope.$apply();
		});

        
        
        
    });
