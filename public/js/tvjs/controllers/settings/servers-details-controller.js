'use strict';

/**
 * @ngdoc function
 * @name SettingsServersDetailsController
 * @module settingsServersDetails 
 * @kind function
 *
 */

angular.module('settingsServersDetails', ['ngMaterial'])
.controller('SettingsServersDetailsController', function($scope, Servers,$stateParams,$mdDialog,$state) {
    var serverid = $stateParams.id;
    Servers.getServer(serverid).success(function(data){
        $scope.server=data[0];
    });

    $scope.update_server = function(key) {
        console.log(key);
        Servers.updateServer(key).success(function(data){
            var notice = $mdDialog.alert()
                .title('Update Server')
                .content('Server updated successfully!')
                .ariaLabel('update_server')
                .clickOutsideToClose(true)
                .ok('Got it!');
            $mdDialog.show(notice);

        });
    }

    $scope.delete_server = function(event) {

        var confirm = $mdDialog.confirm()
            .title('Delete Server?')
            .textContent('Are you sure you want to delete this server?')
            .ariaLabel('delete_server')
            .ok('Delete Server')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            // delete server
            Servers.deleteServer($scope.server.id).success(function(data){
                var notice = $mdDialog.alert()
                    .title('Delete Server')
                    .content('Server deleted successfully!')
                    .ariaLabel('deleted_server')
                    .clickOutsideToClose(true)
                    .ok('Got it!');
                $mdDialog.show(notice)
                    .finally(function() {
                        $state.go('admin-panel.default.settings_servers');
                    });

            });

        }, function() {
            // do not delete server 
        });
    }
});

