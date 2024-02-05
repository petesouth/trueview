'use strict';

/**
 * @ngdoc function
 * @name SettingsServersController
 * @module settingsServers 
 * @kind function
 *
 */

angular.module('settingsServers', ['ngMaterial'])
    .controller('SettingsServersController', function($scope, Servers, $mdDialog, $location, $rootScope, $state) {
        $user = $rootScope.user;
        console.log($user);
        Servers.getServers($user.org_id).success(function(data) {
            $scope.servers = data;
            console.log($scope.servers);
        });

        $scope.showAdd = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                template: '<md-dialog class="server-dialog">' +
                    '<md-toolbar class="md-theme-fn10 md-fn10-theme">' +
                    '<div class="md-toolbar-tools">' +
                    '<h2>Add New Server</h2>' +
                    '<span flex></span>' +
                    '</div>' +
                    '</md-toolbar>' +
                    '<md-content class="md-theme-fn10 md-fn10-theme md-padding"> ' +
                    '<form name="userForm" ng-submit> ' +
                    '<md-input-container layout="row" flex> ' +
                    '<label>Serial Number</label> ' +
                    '<input ng-model="newserver.system_serial"> ' +
                    '</md-input-container> ' +
                    '<md-input-container layout="row" flex> ' +
                    '<label>Server Name</label> ' +
                    '<input ng-model="newserver.model"> ' +
                    '</md-input-container> ' +
                    '<md-input-container layout="row" flex> ' +
                    '<label>Host Name</label> ' +
                    '<input ng-model="newserver.hostname"> ' +
                    '</md-input-container> ' +
                    '<md-input-container layout="row" flex> ' +
                    '<label>IP Address</label> ' +
                    '<input ng-model="newserver.ip"> ' +
                    '</md-input-container> ' +
                    '<md-input-container layout="row" flex> ' +
                    '<label>Config Name</label> ' +
                    '<input ng-model="newserver.config_name"> ' +
                    '</md-input-container> ' +
                    '<div layout="row" flex>' +
                    '<md-datepicker ng-model="newserver.wnty_expire" md-placeholder="Wnty Expire"></md-datepicker>' +
                    '</div>' +
                    '<div class="md-actions" layout="row"> ' +
                    '<span flex></span> ' +
                    '<md-button ng-click="cancel()"> Cancel </md-button> ' +
                    '<md-button  class="md-primary" ng-click="addServer(newserver)"> Save </md-button> ' +
                    '</div>' +
                    '</form> ' +
                    '</md-content> ' +
                    '</md-dialog>',
                targetEvent: ev,
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
            $scope.addServer = function(newserver) {
                $mdDialog.hide();
                newserver.customer_id = $rootScope.user.org_id;
                Servers.addServer(newserver).success(function(data) {
                    var notice = $mdDialog.alert()
                        .title('Add Server')
                        .content('Server added successfully!')
                        .ariaLabel('add_server')
                        .clickOutsideToClose(true)
                        .ok('Got it!');
                    $mdDialog.show(notice)
                        .finally(function() {
                            $state.go('admin-panel.default.settings_servers', {}, {
                                reload: true
                            });
                        });

                });
            };
        };

        $scope.goView = function(id) {
            var path = '/dashboard/overview/server/' + id;
            $location.path(path);
        };

        $scope.goSetting = function(id) {
            var path = '/settings/servers/' + id;
            $location.path(path);
        };

        $scope.registerServer = function(newserver) {
            Servers.registerServer(newserver).success(function(data) {
                var notice = $mdDialog.alert()
                    .title('Register Server')
                    .content('Server registered successfully!')
                    .ariaLabel('register_server')
                    .clickOutsideToClose(true)
                    .ok('Got it!');
                $mdDialog.show(notice)
                    .finally(function() {
                        $state.go('admin-panel.default.settings_servers', {}, {
                            reload: true
                        });
                    }); 
            })
            .error(function(error){
                console.log(error);
            });
        };
    });
