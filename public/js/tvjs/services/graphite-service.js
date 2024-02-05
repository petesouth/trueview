'use strict';

angular.module('dashboard').factory('graphite', function ($http) {
    return {
        getCpu: function (id, success, error){
            return $http({
                url: 'http://trueview-demo.freehive.io:8086/query?db=telegraf&pretty=true&q=select%20usage_system%20from%20cpu%20where%20host=%27'+ id + '%27%20order%20by%20time%20desc%20limit%2015'
                
            }).success(success).error(error);
        },
        getCapacity: function (id, success, error){
            return $http({
                url: 'http://trueview-demo.freehive.io:8086/query?db=telegraf&pretty=true&q=select%20used_percent%20from%20disk%20where%20host=%27'+ id + '%27%20order%20by%20time%20desc%20limit%2015'
            }).success(success).error(error);
        },
        getMemory: function (id, success, error){
            return $http({
                url: 'http://trueview-demo.freehive.io:8086/query?db=telegraf&pretty=true&q=select%20used_percent%20from%20mem%20where%20host=%27'+ id + '%27%20order%20by%20time%20desc%20limit%2015'
            }).success(success).error(error);                         
        },
        getLoad: function (id, success, error){
            return $http({
                url: 'http://trueview-demo.freehive.io:8086/query?db=collectd&q=select%20value%20as%20value%20from%20%2Fload_longterm%2E*%2F%20%20where%20host%3D%27'+ id + '%27%20and%20type%3D%27load%27%20and%20type_instance%3D%27relative%27%20ORDER%20BY%20time%20DESC%20LIMIT%201'
            }).success(success).error(error);
        },
        getLatency: function (id, success, error){
            return $http({
                url: 'http://trueview-demo.freehive.io:8086/query?db=graphite&q=select+value+from+"geom_stat"+where+host+%3D+%27'+ id +'%27+and+type%3D+%27geom_latency-ada1p2%27+and+type_instance%3D+%27read%27+and+time+>+now()+-+1m+limit+15%3B+select+value+from+"geom_stat"+where+host+%3D+%27'+ id +'%27+and+type%3D+%27geom_latency-ada1p2%27+and+type_instance%3D+%27write%27+and+time+>+now()+-+1m+limit+15'
            }).success(success).error(error);
        },
        getThroughput: function (id, success, error){
            return $http({
                url: 'http://trueview-demo.freehive.io:8086/query?db=graphite&q=select+value+from+/interface_*/+where+host+%3D+%27'+ id +'%27+and+type%3D+%27if_octets%27+and+type_instance%3D+%27rx%27+and+time+>+now()+-+1m+limit+15%3B+select+value+from+/interface_*/+where+host+%3D+%27'+ id +'%27+and+type%3D+%27if_octets%27+and+type_instance%3D+%27tx%27+and+time+>+now()+-+1m+limit+15'
            }).success(success).error(error);
        }
    }
});

