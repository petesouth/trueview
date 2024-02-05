'use strict';

/**
 * @ngdoc function
 * @name AlertsController 
 * @module alerts 
 * @kind function
 *
 */

angular.module('alerts', ['ngMaterial'])
    .controller('AlertsController', function ($scope, $rootScope, Messages, $mdDialog, Servers, Users, Rules) {
        var currentUser = $rootScope.user;
        Servers.getServers(currentUser.org_id).success(function(data) {
            $scope.servers = data;
        });
        Users.getUsers().success(function(data) {
            $scope.users = data;
        });

        Messages.getAllMessages(currentUser.org_id).success(function(data) {
            $scope.notifications = data;
        });

        /* watch on rootScope.new_msg, update notifications once rootScope.new_msg changed*/
        $scope.$watch(function() {
            return $rootScope.new_msg;
        }, function() {
            Messages.getAllMessages(currentUser.org_id).success(function(data) {
                $scope.notifications = data;
            });
        }, true);

        $scope.read = function (notification){
            notification.is_read = 1;
            Messages.readMessage(notification).success(function(data){
                Messages.newMessages(currentUser.org_id).success(function(data){
                    $rootScope.new_msg = data[0].count;
                });
            }); 

            var notice = $mdDialog.alert()
                .title('Alert Info')
                .content('Show more alert info here!')
                .ariaLabel('alert_info')
                .clickOutsideToClose(true)
                .ok('Got it!');
            $mdDialog.show(notice)
                .finally(function() {
                    console.log("after dialog");
                    $state.reload();
                });
        }

        /*
         * Alert rules
         */
        $scope.rules = function () {
            Rules.getRules(currentUser.org_id).success(function(data) {
                $scope.alert_rules = data;
                console.log($scope.alert_rules);
            });
        };

        $scope.rules();

        $scope.add = function () {
            var new_rule = {"name": "new rule", "org": currentUser.org_id};
            Rules.addRule(angular.toJson(new_rule)).success(function(data){
                console.log("add successfully",data);
                $scope.rules();
            });
        };

        $scope.expand = function (rule) {
            console.log("expand");
            rule.expand = !rule.expand;
        };

        $scope.save = function (rule) {
            Rules.updateRule(rule).success(function(data){
                console.log("save",data);
            });
        };

        $scope.delete = function (rule) {
            Rules.deleteRule(rule).success(function(data){
                console.log("delete",data);
                $scope.rules();
            });
        };
    })
    .run(function ($rootScope, $mdToast, $location, Messages) {

        $rootScope.getLog = function () {
            var user = $rootScope.user;
            if(user){   
                Messages.isUpdate(user.org_id).success(function(data) {
                    if (data[0].is_update == '1') {
                        $rootScope.new_msg = data[0].new_msg;
                        if ($rootScope.user) {
                            var toast = $mdToast.simple()
                                .content('New notificaion!')
                                .position('top right')
                                .highlightAction(true)
                                .action('View it')
                                .hideDelay(6000);


                            $mdToast.show(toast).then(function (response) {
                                if (response == 'ok') {
                                    $location.path('/alerts');
                                }
                            });
                        }
                    }
                });
            }

            setTimeout($rootScope.getLog, 30000); // refresh every 30 seconds
        };

        $rootScope.getLog();
    })
