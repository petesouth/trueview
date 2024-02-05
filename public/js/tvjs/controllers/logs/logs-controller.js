'use strict';

/**
 * @ngdoc function
 * @name SnapshotsController
 * @module snapshots 
 * @kind function
 *
 */

angular.module('logs', ['ngMaterial'])
.controller('LogsController', function($rootScope, $scope,  $mdDialog, uploadedFiles) {
    console.log("logs");
    $user = $rootScope.user;
    console.log($user);
    
    $scope.logUploads = uploadedFiles.data;
    
$scope.showAdd = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        template: '<md-dialog class="server-dialog">' +
            '<md-toolbar class="md-theme-fn10 md-fn10-theme">' +
            '<div layout="row"><iframe id="upload_target" name="upload_target" src="#" style="width:0;height:0;border:0px solid #fff;"></iframe></div>' +
            '<div class="md-toolbar-tools">' +
            '<h2>Add New Log Upload</h2>' +
            '<span flex></span>' +
            '</div>' +
            '</md-toolbar>' +
            '<md-content class="md-theme-fn10 md-fn10-theme md-padding"> ' +
            '<form id="uploadFileform" name="uploadFileform" action="/api/uploadfile" method="post" enctype="multipart/form-data" target="upload_target"> ' +
            '<input name="org_id" value="' + $user.org_id + '" type="hidden"> ' +
            '<input name="filetype" value="1" type="hidden"> ' +
            '<md-input-container layout="row" flex> ' +
            '<label>Description</label> ' +
            '<input name="desc"> ' +
            '</md-input-container> ' +
            '<md-input-container layout="row" flex> ' +
            '<input name="uploadedFile" type="file"> ' +
            '</md-input-container> ' +
            '<div class="md-actions" layout="row"> ' +
            '<span flex></span> ' +
            '<md-button ng-click="cancel()"> Cancel </md-button> ' +
            '<md-button  ng-click="submiForm()" class="md-primary"> Save </md-button> ' +
            '</div>' +
            '</form> ' +
            '<div layout="row"><p id="result"></p></div>' +
            '</md-content> ' +
            '</md-dialog>',
        targetEvent: ev
    })
        .then(function(server) {
            $scope.alert = 'You said the information was "' + server + '".';
        }, function() {
            $scope.alert = 'You cancelled the dialog.';
        });
};

function DialogController($scope, $mdDialog) {
    $scope.newserver = {};
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    $scope.submiForm = function(){
    	$("#uploadFileform").submit();
    	setTimeout(function(){
    		$mdDialog.cancel();
    		window.location.reload();
    	}, 0);
    };
    
	
	
	
    
};

    
    console.log("$scope.logUploads:", $scope.logUploads);
    
});

