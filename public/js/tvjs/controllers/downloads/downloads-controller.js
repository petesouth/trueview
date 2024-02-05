'use strict';

/**
 * @ngdoc function
 * @name SnapshotsController
 * @module snapshots 
 * @kind function
 *
 */

angular.module('downloads', ['ngMaterial'])
.controller('DownloadsController', function($scope) {
    console.log("downloads");
    
    
	$scope.downloadData = {};
	
	$.ajax({
        url: '/trueview/downloads.json',
        success: function (result) {
			$scope.downloadData = result;
        },
        async: false
    });
	

});

