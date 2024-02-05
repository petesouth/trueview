'use strict';

/**
 * @ngdoc directive
 * @name dashboardSystemsContent
 * @restrict C
 * @scope
 * @usage
 * ```html
 * <span sparkline-bar >Loading...</span>
 * ```
 */

angular.module('dashboard')
    .directive('sparklineBar', ['graphite', '$http', '$sce', 'DataFormatter',function(graphite, $http, $sce, DataFormatter) {
        return {
            scope: {
                server: '=server',
                type: '@type'
            },
            controller: function($scope, $element) {
                var mpoints_max = 15;
                $scope.chartdata = [[],[],[]];
                $scope.config = {};
                
                setInterval($scope.getData, 60000);
                
                function successGet(res){
                    var datapoints = DataFormatter.formatter(res);
                    angular.forEach(datapoints, function(data, index) {
                        $scope.dataHelper(data,index);
                    });
                };
                function errorGet(res) {
                    console.log(res);
                };

                this.getChart = function(server, config, type) {
                    $scope.type = type;
                    $scope.server = server;
                    $scope.config = config;
                    $scope.getData();
                };

                $scope.getData = function() {
                    if($scope.type == 'cpu'){
                        graphite.getCpu($scope.server.system_serial, successGet, errorGet);
                    }else if($scope.type == 'memory'){
                        graphite.getMemory($scope.server.system_serial, successGet, errorGet);
                    }else if($scope.type == 'capacity'){
                        graphite.getCapacity($scope.server.system_serial, successGet, errorGet);
                    }else if($scope.type == 'latency') {
                        graphite.getLatency($scope.server.system_serial, successGet, errorGet);
                    }else if($scope.type == 'throughput'){
                        graphite.getThroughput($scope.server.system_serial, successGet, errorGet);
                    }
                    
                };

                $scope.dataHelper = function(data, index){
                    if(index == 0) {
                        $scope.config.composite = false;
                    }else {
                        $scope.config.composite = true;
                    }

                    $scope.config.barColor = $scope.config.color[index];
                    $scope.config.tooltipFormat = '<span style="color: {{color}}">' + $scope.config.tooltips[index] +'</span>: {{value}}';

                    //$scope.chartdata = data;
                    for(var i=0; i<data.length; i++) {
                        $scope.chartdata[index].push(data[i]);
                        if ($scope.chartdata[index].length > mpoints_max){
                            $scope.chartdata[index].splice(0,1);
                        }
                    };
                    
                    $scope.sparkline(index);
                };

                $scope.sparkline = function(index) {
                    $element.sparkline($scope.chartdata[index], $scope.config);
                }
            },
            link: function(scope, element, attr, ctrl) {
                if(scope.type == 'cpu') {
                    var config = {
                        type: "bar",
                        color: ["#E57373","#F44336"],  /* red 300 500 */
                        tooltips: ['CPU-system', 'CPU-user'],
                        composite: false
                    };
                    //ctrl.getChart(scope.server, config, scope.type);
                }else if(scope.type == 'memory') {
                    var config = {
                        type: "bar",
                        color: ["#FFB74D","#FF9800"], /* orange */
                        tooltips: ['Memory-free', 'Memory-active'],
                        composite: false
                    };
                    //ctrl.getMemory(scope.server, config);
                }else if(scope.type == 'capacity') {
                    var config = {
                        type: "bar",
                        color: ["#64B5F6","#2196F3"], /* blue */
                        tooltips: ['Capacity-free', 'Capacity-used'],
                        composite: false
                    };
                    //ctrl.getCapacity(scope.server, config);
                }else if(scope.type == 'latency') {
                    var config = {
                        type: "bar",
                        color: ["#ff6680","#ff99aa"], /* pink */
                        tooltips: ['Latency-read', 'Latency-write'],
                        composite: false
                    };
                    //ctrl.getLatency(scope.server, config);
                }else if(scope.type == 'throughput') {
                    var config = {
                        type: "bar",
                        color: ["#723365","#b861a6"], /* purple */
                        tooltips: ['if_octets-rx', 'if_octets-tx'],
                        composite: false
                    };
                    //ctrl.getThroughput(scope.server, config);
                }
                ctrl.getChart(scope.server, config, scope.type);
            }

        }
    }])
    .directive('sparklineCharts', [function() {
        return {
            scope: {
                data: '='
            },
            link: function(scope, element) {
                element.sparkline([[1,5], [2, 3], [4, 2], [6, 2] ], {
                    type: 'bar',
                    barColor: 'green'
                });
            }
        }
    }]);

