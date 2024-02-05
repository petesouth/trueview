'use strict';

/**
 * @ngdoc function
 * @name SidebarRightController
 * @module tv
 * @kind function
 *
 * @description
 *
 * Handles the admin view
 */
angular.module('tv').
controller('SidebarRightController', function ($scope, $mdSidenav, $sce, Email, $mdDialog, $location) {
    $scope.$on('notifyCustomer', function($event,$data) {
        $scope.notifyURL = $data;
        $scope.emailType = 'notify';
    });

    $scope.$on('triSwitchNotificationTab', function($event) {
        $scope.emailType = 'email';
    });

    $scope.send_email = function (notification) {
        notification.type = $scope.emailType;
        notification.chart_url = $scope.notifyURL;
        notification.current_url = $location.path();

        /*  Problems with page loading in these links.. Removing till I can Fix. PJS.

        if(typeof($location.hash()) === 'string' && $location.hash().length > 0 ) {  
            notification.current_url += "#" + $location.hash();  
        }
        */
        Email.sendEmail(notification).success(function(data){
            var notice = $mdDialog.alert()
                .content('Send Email successfully!')
                .ariaLabel('email_notification')
                .clickOutsideToClose(true)
                .ok('Got it!');
            $mdDialog.show(notice)
                .finally(function() {
                    $scope.close();
                }); 
        })
        .error(function(response){
            if('from' in response){
                $scope.from_err = response.from[0];
            }

            if('to' in response){
                $scope.to_err = response.to[0];
            }

            if('subject' in response){
                $scope.subject_err = response.subject[0];
            }
        });
    };

    $scope.close = function () {
        $mdSidenav('notifications').close();
    };
});
