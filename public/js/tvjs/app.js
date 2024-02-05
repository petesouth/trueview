'use strict';
angular.module('tv', [ 
    'ngMaterial', 'ui.router', 'ngStorage', 'dndLists', 'ui.bootstrap', 'angularMoment', 
    'tvModules', 'dashboard', 'dashboardLog', 'dashboardSystems', 'dashboardServer', 'dashboardDetails',
    'ixfleet',
    'alerts',
    'support','supportDetail',
    'logs',
    'downloads',    
    'snapshots',
    'settingsAdmin', 'settingsProfile', 'settingsServers', 'settingsServersDetails', 
    'settingsTools',

])
    .constant('APP', {
        name: 'TrueView',
        logo: '../../assets/images/trueview_icon.svg',
        version: '1.0.0',
        defaultSkin: 'sharky-cove'
    })
    .constant('API_CONFIG', {
        'url': ''
    })
/**
 *  SETUP ROUTES
 */
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $location) {
        console.log("tv");
        // Routes config using ui-router
        $urlRouterProvider
            .when('',['$localStorage', '$state', '$location', function($localStorage, $state, $location){
                if($location.search().token){
                    $localStorage.token = $location.search().token;
                }

                if(typeof ($localStorage.token) === 'undefined'){
                    window.location = '/login';
                }else{
                    $state.go('admin-panel.default.dashboard_systems');
                }
                
            }])
            .when('/', '/dashboard/systems') 
            .when('/dashboard', '/dashboard/systems')
            .when('/settings', '/settings/admin')
            .otherwise('/404');

        $stateProvider.state('admin-panel', {
            abstract: true,
            controller: 'AdminPanelController',
            templateUrl: 'trueview/components/admin-panel/admin-panel.tmpl.html',
            resolve: {
                user: function($q, Users) {
                    return Users.getUser();
                },
                config: function($q, Configs) {
                    return Configs.getConfig();
                }
            },
            data: {
                toolbar: {
                    extraClass: '',
                    background: false,
                    shrink: true
                }
            }
        }).state('admin-panel.default', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'trueview/components/sidebar-left/sidebar-left.tmpl.html',
                    controller: 'SidebarLeftController'
                },
                sidebarRight: {
                    templateUrl: 'trueview/components/sidebar-right/sidebar-right.tmpl.html',
                    controller: 'SidebarRightController'
                },
                toolbar: {
                    templateUrl: 'trueview/components/toolbars/default.tmpl.html',
                    controller: 'DefaultToolbarController'
                },
                content: {
                    template: '<div id="admin-panel-content-view" flex ui-view class="admin-panel-content"></div>'
                }
            }
        }).state('404', {
            url: '/404',
            templateUrl: 'trueview/layouts/page-404.html',
            controller: function($scope, $state, APP) {
                $scope.app = APP;
                console.log("404 controller app.js");

                $scope.goHome = function() {
                    $state.go('admin-panel.default.dashboard_main');
                };
            },
            data: {
                authorizedRoles: [3]
            }
        }).state('500', {
            url: '/500',
            templateUrl: 'trueview/layouts/page-500.html',
            controller: function($scope, $state, APP) {
                $scope.app = APP;
                console.log("500 controller app.js");
                $scope.goHome = function() {
                    $state.go('admin-panel.default.dashboard_main');
                };
            },
            data: {
                authorizedRoles: [3]
            }
        });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        delete $localStorage.token;
                        window.location="/login";
                    }
                    return $q.reject(response);
                }
            };
        }]);

    }

    ])
/**
 *  PALETTES & THEMES & SKINS oh my.....
 */


    .config(function($mdThemingProvider, tvThemingProvider, tvSkinsProvider, APP) {

        $mdThemingProvider.definePalette('fn10', {
            '50': 'FF0000',
            '100': 'FF7F00',
            '200': 'FFFF00',
            '300': '00FF00', 
            '400': '404040', //light gray widget header
            '500': '2b9cd8', //menu color
            '600': '929E9F', //body color
            '700': '232629', //li color
            '800': '4B0082',
            '900': '0000FF',
            'A100': '2b9cd8',
            'A200': 'FFFF00',
            'A400': 'FF7F00',
            'A700': 'FF0000',
            'contrastDefaultColor': 'light' // whether, by default, text (contrast)
        });    
        $mdThemingProvider.definePalette('blue_grey', {
            '50': 'ECEFF1',
            '100': 'CFD8DC',
            '200': 'B0BEC5',
            '300': '90A4AE',
            '400': '78909C',
            '500': '607D8B',
            '600': '546E7A',
            '700': '455A64',
            '800': '37474F',
            '900': '263238',
            'A100': 'ECEFF1',
            'A200': '90A4AE',
            'A400': '546E7A',
            'A700': '263238',
            'contrastDefaultColor': 'light' // whether, by default, text (contrast)
        });


        tvThemingProvider.theme('fn10_tool')
            .primaryPalette('fn10', {
                'default': '500'
            })
            .accentPalette('yellow')
            .warnPalette('red');

        tvThemingProvider.theme('fn10_content')
            .primaryPalette('fn10', {
                'default': '500'
            })
            .accentPalette('blue_grey')
            .warnPalette('red');

        tvThemingProvider.theme('blue_grey')
            .primaryPalette('blue_grey', {
                'default': '500'
            })
            .accentPalette('yellow')
            .warnPalette('red');

        tvThemingProvider.theme('fn10_sidebar')
            .primaryPalette('fn10', {
                'default': '700'
            })
            .accentPalette('yellow')
            .warnPalette('red');

        tvThemingProvider.theme('fn10_footer')
            .primaryPalette('fn10', {
                'default': '700' 
            })
            .accentPalette('yellow')
            .warnPalette('red');
/*
        tvThemingProvider.theme('fn10')
            .primaryPalette('fn10',{
                'default': '700'
            })
*/ 
       /* 
      $mdThemingProvider.theme('fn10')
            .primaryPalette('fn10', {
                'default': '700'
            })
*/
        tvSkinsProvider.skin('tvSkin_fn10')
            .sidebarTheme('fn10_sidebar')
            .toolbarTheme('fn10_tool')
            .logoTheme('fn10_tool')
            .footerTheme('fn10_footer')
            .contentTheme('fn10_content');


        tvSkinsProvider.setSkin('tvSkin_fn10');
    }).component('systemlistComponent', systemlistComponentSettings)
    .component('chartsearchComponent', charttoolbarComponentSettings)
    .component('jsondashboardComponent', jsonDashboardComponentSettings)
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on("$stateChangeStart", function (event, next, toState, fromState) {
            if (typeof ($rootScope.user) === 'undefined' || typeof ($rootScope.user.role_id) === 'undefined') {
                return;
            }

            var userRole = $rootScope.user.role_id;
            if(userRole > next.data.authorizedRoles[0]){
                event.preventDefault(); 
                $state.go('404')
            }
        });

    }]);
