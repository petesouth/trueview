'use strict';

/**
 * @ngdoc function
 * @name SettingsProfileController
 * @module settingsProfile 
 * @kind function
 *
 */

angular.module('settingsProfile', ['ngMaterial'])
.controller('SettingsProfileController', function($scope, $rootScope, Orgs, Users, $mdDialog) {
    $scope.user = $rootScope.user;

    Orgs.getOrg($scope.user.org_id).success(function(data){
        $scope.user.company = data[0].name;
    });

    $scope.update_profile = function(user){
        console.log(user);
        Users.updateUser(user).success(function(response) {
            var notice = $mdDialog.alert()
                .title('Update User')
                .content('User updated successfully!')
                .ariaLabel('update_user_setting')
                .clickOutsideToClose(true)
                .ok('Got it!');
            $mdDialog.show(notice)
                .finally(function() {
                    console.log("after dialog");
                    $state.reload();
                });
        })
        .error(function(response){
            if('name' in response){
                $scope.name_err = response.name[0];
            }

            if('email' in response){
                $scope.email_err = response.email[0];
            }
        });

    };
});
