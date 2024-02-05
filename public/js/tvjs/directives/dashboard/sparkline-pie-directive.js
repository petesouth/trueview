'use strict';

/**
 * @ngdoc directive
 * @name dashboardSystemsContent
 * @restrict C
 * @scope
 * @usage
 * ```html
 * <span sparkline-pie >Loading...</span>
 * ```
 */

angular.module('dashboard')
    .directive('sparklinePie', ['graphite', '$http', '$sce', 'DataFormatter', function(graphite, $http, $sce, DataFormatter) {
        return {
            scope: {
                server: '=server',
                type: '@type'
            },
            controller: function($scope, $element) {
                $scope.config = {};
                
                setInterval($scope.getData, 60000);

                function successGet(res){
                    var datapoints = DataFormatter.formatter(res);
                    $scope.dataHelper(datapoints);
                };
                function errorGet(res) {
                    console.log(res);
                };

                this.getCapacity = function(server, config) {
                    $scope.server = server;
                    $scope.config = config;
                    $scope.getData();
                };
                
                $scope.getData = function(){
                    graphite.getCapacity($scope.server.system_serial, successGet, errorGet);
                };

                $scope.dataHelper = function(data){
                    $scope.chartdata = [];

                    angular.forEach(data, function(point) {
                        $scope.chartdata.push(point[0]);
                    });
                    
                    console.log($scope.chartdata);
                    $scope.sparkline();
                };

                $scope.sparkline = function() {
                    $element.sparkline($scope.chartdata, $scope.config);
                }
            },
            link: function(scope, element, attr, ctrl) {
                if(scope.type == 'capacity') {
                    var config = {
                        type: 'pie',
                        height: '35',
                        tooltipFormat: '<span style="color: {{color}}">{{offset:name}}</span> {{percent.2}}%</span>',
                        tooltipValueLookups: {
                            'name': {
                                0: 'Capacity-free'
                            }
                        }
                    };
                    ctrl.getCapacity(scope.server, config);
                }
            }

        }
    }]);
