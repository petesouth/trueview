angular.module('gauge', ['ngRoute','services','liquidGauge'])
    .config(function ($httpProvider, $routeProvider, $locationProvider) {
        $routeProvider
            .when("/liquid", {
                templateUrl: "/monitcommando/plugin_gauge/components/liquidGauge/liquidGauge.html",
                controller: "liquidGaugeCtrl"
            })
            .when('/error', {
                templateUrl: "/monitcommando/plugin_gauge/403.html"
            });
    });
