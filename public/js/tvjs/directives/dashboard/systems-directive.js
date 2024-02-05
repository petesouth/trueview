'use strict';

/**
* @ngdoc directive
* @name dashboardSystemsContent
* @restrict C
* @scope
* @usage
* ```html
* <div layout="row" layout-wrap class="dashboard-systems-content">
* ```
*/

angular.module('tv')
.directive('dashboardSystemsContent', ['$mdDialog', '$sce','$rootScope','$mdUtil', '$mdSidenav', function($mdDialog,$sce,$rootScope,$mdUtil,$mdSidenav) {
     return {
        restrict : "C",
        link: function ($scope) {
	
		$scope.openSideNav = function(navID) {
                	$mdUtil.debounce(function(){
                    	$mdSidenav(navID).toggle();
                	}, 300)();
            	};
    
            	$scope.show_details = function(targetId){
                	console.log("show_details",targetId);
                	$rootScope.$broadcast('activeServer', targetId);
                	$scope.openSideNav('notifications');
            	};
	
	

        }
     }
}]);
