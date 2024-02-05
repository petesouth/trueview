'use strict';

/**
 * @ngdoc function
 * @name SettingsAdminController, SettingAdminEditController
 * @module settingsAdmin 
 * @kind function
 *
 */

angular.module('settingsAdmin', ['ngMaterial'])
    .controller('SettingsAdminController', function($scope, Users, Orgs, Servers, $location, $rootScope, $mdDialog, $state, serverList, orgList) {
        Users.getUsers().success(function(data) {
            $scope.users = data;
        });

        /*
        Orgs.getOrgs().success(function(data){
            $scope.orgs = data;
        });
        */
        $scope.orgs = orgList.data;
        $scope.totalOrgs = $scope.orgs.length;

        $scope.servers = serverList.data;
        $scope.totalServers = $scope.servers.length;

        $scope.addUser = function() {
            var path= '/settings/admin/add/user';
            $location.path( path );
        };

        $scope.goUser = function(id){
            var path = '/settings/admin/edit/user/'+ id;
            $location.path( path );
            $scope.editUser = id;
        };

        $scope.deleteUser = function(userid){
            console.log("delete user");
            var confirm = $mdDialog.confirm()
                .title('Delete User?')
                .textContent('Are you sure you want to delete this user?')
                .ariaLabel('delete_user')
                .ok('Delete User')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                Users.deleteUser(userid).success(function(data){
                    console.log(data);
                    var notice = $mdDialog.alert()
                        .title('Delete User')
                        .content('User deleted successfully!')
                        .ariaLabel('delete_user')
                        .clickOutsideToClose(true)
                        .ok('Got it!');
                    $mdDialog.show(notice)
                        .finally(function() {
                            console.log("after dialog");
                            $state.reload();
                        });
                });

            }, function() {
            });

        };

        /*
         * orgs pagination
         */
                $scope.numPerPageOrg = 25;
                $scope.currentPageOrg = 1;

        $scope.$watch('currentPageOrg + numPerPageOrg', function() {
            var begin = (($scope.currentPageOrg - 1) * $scope.numPerPageOrg);
            var end = begin + $scope.numPerPageOrg;

            $scope.filteredOrgs = $scope.orgs.slice(begin, end);
        });

        $scope.addOrg = function() {
            var path= '/settings/admin/add/org';
            $location.path(path);
        };

        $scope.goOrg = function(id){
            var path = '/settings/admin/edit/org/'+ id;
            $location.path( path );
            $scope.editOrg = id;
        };

        $scope.deleteOrg = function(orgid){
            console.log("delete org");
            var confirm = $mdDialog.confirm()
                .title('Delete Org?')
                .textContent('Are you sure you want to delete this org and all its servers?')
                .ariaLabel('delete_org')
                .ok('Delete Org')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                Orgs.deleteOrg(orgid).success(function(data){
                    console.log(data);
                    var notice = $mdDialog.alert()
                        .title('Delete Org')
                        .content('Org and its servers deleted successfully!')
                        .ariaLabel('delete_org')
                        .clickOutsideToClose(true)
                        .ok('Got it!');
                    $mdDialog.show(notice)
                        .finally(function() {
                            console.log("after dialog");
                            $state.reload();
                        });
                });
            }); 
        };

        /*
         * servers pagination
         */
        $scope.numPerPage = 25;
        $scope.currentPage = 1;

        $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage);
            var end = begin + $scope.numPerPage;

            $scope.filteredServers = $scope.servers.slice(begin, end);
        });

        $scope.goServer = function(id){
            var path = '/settings/admin/edit/server/'+ id;
            $location.path( path );
            $scope.editServer = id;
        };

        $scope.deleteServer = function(serverid){
            console.log("delete server");
            var confirm = $mdDialog.confirm()
                .title('Delete Server?')
                .textContent('Are you sure you want to delete this server?')
                .ariaLabel('delete_server')
                .ok('Delete Server')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                Servers.deleteServer(serverid).success(function(data){
                    console.log(data);
                    var notice = $mdDialog.alert()
                        .title('Delete Server')
                        .content('Server deleted successfully!')
                        .ariaLabel('delete_server')
                        .clickOutsideToClose(true)
                        .ok('Got it!');
                    $mdDialog.show(notice)
                        .finally(function() {
                            console.log("after dialog");
                            $state.reload();
                        });
                });
            });
        };
    })
    .controller('SettingsAdminEditUserController', function($scope, Users, Roles, Orgs, $stateParams, $mdDialog) {
        Roles.getRoles().success(function(data){
            $scope.roles = data;
        });

        Orgs.getOrgs().success(function(data){
            $scope.orgs = data;
        });

        var userId = $stateParams.id;

        Users.getUserById(userId).success(function(data){
            $scope.editUser=data[0];
        });

        $scope.update_profile = function(user){
            console.log(user);
            Users.updateUser(user).success(function(response) {
                if(response == ''){
                    $scope.company_err = 'Invalid compnay name!'; 
                }else{
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
                }
            })
                .error(function(response){
                    if('name' in response){
                        $scope.name_err = response.name[0];
                    }

                    if('company' in response){
                        $scope.company_err = response.company[0];
                    }

                    if('email' in response){
                        $scope.email_err = response.email[0];
                    }
                });

        };
    })
    .controller('SettingsAdminAddUserController', function($scope, Users, Roles, $mdDialog, Orgs) {
        Roles.getRoles().success(function(data){
            $scope.roles = data;
        });

        Orgs.getOrgs().success(function(data){
            $scope.orgs = data;
        });


        $scope.addUser = function(user){
            console.log(user);
            Users.addUser(user).success(function(response) {
                var notice = $mdDialog.alert()
                    .title('Create User')
                    .content('Create user successfully!')
                    .ariaLabel('add_new_user')
                    .clickOutsideToClose(true)
                    .ok('Got it!');
                $mdDialog.show(notice)
                    .finally(function() {
                        console.log("after dialog");
                        $state.reload();
                    });
            })
                .error(function(response){
                    console.log("error", response)
                });

        };

    })
    .controller('SettingsAdminEditOrgController', function($scope, Orgs, $stateParams, $mdDialog) {
        var id = $stateParams.id;

        Orgs.getOrgById(id).success(function(data){
            $scope.editOrg=data[0];
            console.log($scope.editOrg);
        });

        $scope.update_org = function(org){
            console.log(org);
            Orgs.updateOrg(org).success(function(response) {
                var notice = $mdDialog.alert()
                    .title('Update Organization')
                    .content('Org updated successfully!')
                    .ariaLabel('update_org_setting')
                    .clickOutsideToClose(true)
                    .ok('Got it!');
                $mdDialog.show(notice);
            })
                .error(function(response){
                    console.log(response);
                    if('name' in response){
                        $scope.name_err = response.name[0];
                    }
                });

        }
    })
    .controller('SettingsAdminAddOrgController', function($scope, Orgs, $mdDialog) {

        $scope.addOrg = function(org){
            Orgs.addOrg(org).success(function(response) {
                var notice = $mdDialog.alert()
                    .title('Add New Organization')
                    .content('Add new successfully!')
                    .ariaLabel('add_new_org')
                    .clickOutsideToClose(true)
                    .ok('Got it!');
                $mdDialog.show(notice);
            })
                .error(function(response){
                    console.log(response);
                });

        }
    })

    .controller('SettingsAdminEditServerController', function($scope, Orgs, Servers, $stateParams, $mdDialog) {
        var serverId = $stateParams.id;

        Orgs.getOrgs().success(function(data){
            $scope.orgs = data;
        });

        Servers.getServer(serverId).success(function(data){
            $scope.editServer=data[0];
            var wnty_expire = $scope.editServer.wnty_expire + 'T09:00:00';
            $scope.editServer.wnty_expire = new Date(wnty_expire);
        });

        $scope.update_server = function(server){
            Servers.updateServer(server).success(function(response) {
                if(response == ''){
                    $scope.company_err = 'Invalid compnay name!';
                }else{
                    var notice = $mdDialog.alert()
                        .title('Update Server')
                        .content('Server updated successfully!')
                        .ariaLabel('update_server_setting')
                        .clickOutsideToClose(true)
                        .ok('Got it!');
                    $mdDialog.show(notice);
                }
            })
                .error(function(response){
                    console.log("error",response);
                    if('system_serial' in response){
                        $scope.serial_err = response.system_serial[0];
                    }
                });

        }
    });
