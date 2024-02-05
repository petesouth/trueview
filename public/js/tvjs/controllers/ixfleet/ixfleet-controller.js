'use strict';

/**
 * @ngdoc function
 * @name SnapshotsController
 * @module snapshots 
 * @kind function
 *
 */

angular.module('ixfleet', ['ngMaterial'])
    .controller('IxfleetController', function($scope, $rootScope, Servers, serverList, serverImageMap, $mdDialog, $state, $sce) {
        console.log("ixfleet");
        $scope.now = new Date();
        $scope.servers = serverList.data;
        $scope.isEmpty = serverList.data.length;
        $scope.serverImageMapArray = angular.fromJson(serverImageMap.data);

        $scope.showAdd = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'trueview/layouts/ixfleet/register-server.html',
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
                Servers.registerServer(newserver).success(function(data) {
                    var notice = $mdDialog.alert()
                        .title('Register Server')
                        .content('Server registration successfully!')
                        .ariaLabel('register_server')
                        .clickOutsideToClose(true)
                        .ok('Got it!');
                    $mdDialog.show(notice)
                        .finally(function() {
                            console.log('final step');
                            $state.go('admin-panel.default.dashboard_ixfleet', {}, {
                                reload: true
                            });
                        });

                });
            };
        };

        $scope.serverImage = function(model) {
            var base = '/assets/images/server/';
            var img = $scope.serverImageMapArray[model];
            
            if(img == ''){
                img = 'server.png'; //if server img is not exist
            } 
            return $sce.trustAsResourceUrl(base+img);
        };
    });

