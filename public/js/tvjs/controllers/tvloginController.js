'use strict';

/**
 * @ngdoc function
 * @name tvloginController
 * @module tvlogin 
 * @kind function
 *
 */

angular.module('tvlogin',['ngMaterial','ngStorage'])
    .factory('Auth', ['$http', '$localStorage', function ($http, $localStorage) {
        return {
            login: function(data, success, error) {
                $http.post('/api/login',data).success(success).error(error)
            },
            register: function(data, success, error) {
                $http.post('/api/register',data).success(success).error(error)
            },
            reset: function(data, success, error){
                $http.post('/api/reset', data).success(success).error(error)
            },
            active: function(data, success, error){
                $http.post('/api/active', data).success(success).error(error)
            }
        };
    }])
    .controller('tvloginController', ['$scope', '$http', '$localStorage','Auth',
        function ($scope, $http, $localStorage, Auth) {
            console.log("exec tvloginController");
            function successAuth(res) {
                if(res.message){
                    $scope.err_email = res.message;
                };

                if(res.email){
                    $scope.err_email = res.email;
                };

                if(res.token){
                    $localStorage.token = res.token;
                    window.location = "/";
                };

            }
            $scope.tvlogin = function() {
                Auth.login($scope.user, successAuth, function(res){
                    $scope.err_email = '';
                    $scope.err_password = '';

                    if(res.email){
                        $scope.err_email = res.email[0];
                    };
                    if(res.password){
                        $scope.err_password = res.password[0];
                    };
                });
            };

            $scope.tvregister = function() {
                console.log("tv register");
                Auth.register($scope.user, successAuth, function(res){
                    $scope.err_name = '';
                    $scope.err_email = '';
                    $scope.err_org_id = '';
                    $scope.err_password = '';
                    $scope.err_password_confirmation = '';

                    if(res.name){
                        for(var i=0; i < res.name.length; i++){
                            $scope.err_name += res.name[i] + ' ';
                        }    
                    };
                    if(res.email){
                        for(var i=0; i < res.email.length; i++){
                            $scope.err_email += res.email[i] + ' ';
                        }
                    };
                    if(res.org_id){
                        for(var i=0; i < res.org_id.length; i++){
                            $scope.err_org_id += res.org_id[i] + ' ';
                        }
                    };
                    if(res.password){
                        for(var i=0; i< res.password.length; i++){
                            $scope.err_password += res.password[i] + ' ';
                        }
                    };
                    if(res.password_confirmation){
                        for(var i=0; i < res.password_confirmation.length; i++){
                            $scope.err_password_confirmation = res.password_confirmation[i] + ' ';
                        }
                    }

                });
            };

            $scope.tvreset = function() {
                console.log("tv reset");
                $scope.err_email = '';
                $scope.err_password = '';

                var data = {
                    token: document.getElementsByName("token")[0].value,
                    email: document.getElementsByName("email")[0].value,
                    password: document.getElementsByName("password")[0].value,
                    password_confirmation: document.getElementsByName("password_confirmation")[0].value,
                };

                Auth.reset(data, successAuth, function(res){
                    console.log(res);
                    if(res.email){
                        for(var i=0; i < res.email.length; i++){
                            $scope.err_email += res.email[i] + ' ';
                        }
                    };
                    if(res.password){
                        for(var i=0; i < res.password.length; i++){
                            $scope.err_password += res.password[i] + ' ';
                        }
                    };


                });    
            };

            $scope.tvactive = function() {
                console.log("tv active account");
                $scope.err_password = '';

                var data = {
                    confirmation_code: document.getElementsByName("token")[0].value,
                    password: document.getElementsByName("password")[0].value,
                    password_confirmation: document.getElementsByName("password_confirmation")[0].value,
                };

                Auth.active(data, successAuth, function(res){
                    console.log(res);
                    if(res.password){
                        for(var i=0; i < res.password.length; i++){
                            $scope.err_password += res.password[i] + ' ';
                        }
                    };
                });
            };




        }
    ]);

