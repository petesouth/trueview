'use strict';

angular.module('tv')
    .factory('DataFormatter', function() {
        return {
            formatter: function(data) {
                var chartdata=[];
                var rs = data.results;
                angular.forEach(rs, function(key, index) {
                    if(key.series){
                        chartdata.push([]);
                        var data = key.series[0].values;
                        for(var i=0; i< data.length; i++) {
                            chartdata[index].push(data[i][1]);
                        }
                    }
                });
                return chartdata; 
            }
        }
    });
