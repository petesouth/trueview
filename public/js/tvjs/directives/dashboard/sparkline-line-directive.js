'use strict';

/**
 * @ngdoc directive
 * @name dashboardSystemsContent
 * @restrict C
 * @scope
 * @usage
 * ```html
 * <span sparkline-line >Loading...</span>
 * ```
 */

angular.module('dashboard')
    .directive('sparklineLine', ['graphite', '$http', '$sce', 'DataFormatter',function(graphite, $http, $sce, DataFormatter) {
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

                this.getLoad = function(server, config) {
                    $scope.server = server;
                    $scope.config = config;
                    $scope.getData();
                };

                $scope.getData = function() {
                    graphite.getLoad($scope.server.hostname, successGet, errorGet); 
                };

                $scope.dataHelper = function(data, index){
                    if(index == 0) {
                        $scope.config.composite = false;
                    }else {
                        $scope.config.composite = true;
                    }
                    $scope.config.lineColor = $scope.config.color[index];
                    $scope.config.tooltipFormat = '<span style="color: {{color}}">' + $scope.config.tooltips[index] +'</span>: {{y.2}}';
                    
                    
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
                if(scope.type == 'load') {
                    var config = {
                        type: 'line',
                        fillColor: '',
                        color: ['#F44336', '#2196F3', '#4CAF50'], 
                        tooltips: ['Load-longterm', 'Load-midterm', 'Load-shortterm'],
                        composite: false
                    };
                    ctrl.getLoad(scope.server, config);
                }
            }

        }
    }]);
