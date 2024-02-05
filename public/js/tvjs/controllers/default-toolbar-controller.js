'use strict';

/**
 * @ngdoc function
 * @name DefaultToolbarController
 * @module tv
 * @kind function
 *
 */

angular.module('tv')
    .controller('DefaultToolbarController', function ($scope, $state, $element, $mdUtil, $mdSidenav, $timeout, SideMenu, APP, $rootScope, $localStorage, $http) {
        $scope.menu = SideMenu.getMenu();
        /*
    var dashboardMenu = [];
    dashboardMenu.push(SideMenu.getMenuDashboard());
    $scope.dashboardMenu = dashboardMenu;
    $scope.settingMenu = SideMenu.getMenuSetting().submenu;
    */ 
        $scope.currentUser = $rootScope.user;

        $scope.toolbarTypeClass = function() {
            return $scope.extraClass;
        };

        $scope.$on('$stateChangeStart', initToolbar);

        function initToolbar() {
            $element.css('background-image', '');

            if($state.current.data !== undefined) {
                if($state.current.data.toolbar !== undefined) {
                    if($state.current.data.toolbar.extraClass !== false) {
                        $scope.extraClass = $state.current.data.toolbar.extraClass;
                    }

                    if($state.current.data.toolbar.background) {
                        $element.css('background-image', 'url(' + $state.current.data.toolbar.background + ')');
                    }
                }
            }
        }

        initToolbar();

        $scope.switchLanguage = function(languageCode) {
            $translate.use(languageCode).then(function() {
            });
        };

        $scope.openSideNav = function(navID) {
            $mdUtil.debounce(function(){
                $mdSidenav(navID).toggle();
            }, 300)();
        };

        $scope.toggleNotificationsTab = function(tab) {
            $scope.$parent.$broadcast('triSwitchNotificationTab', tab);
            $scope.openSideNav('notifications');
        };

        $scope.openLink = function(menu) {
            $state.go(menu.state, {});
        };

        $scope.sendEmail = function() {
            console.log("sendemail");
            $scope.$parent.$broadcast('triSwitchNotificationTab');
            $scope.openSideNav('notifications');
        };

        $scope.logout = function() {
            console.log("logout tv");
            $http({
                method: 'GET',
                url: '/api/logout',
            }).then(function successCallback(response) {
                delete $localStorage.token;
                console.log("success ++ ",response);
                window.location = "/";
            }, function errorCallback(response) {
                console.log("error -- ", response);
            });

            //$state.go('login');
            //window.location.href = '/logout';
        };

        // until we can get languages from angular-translate use APP constant
        $scope.languages = APP.languages;
    });
