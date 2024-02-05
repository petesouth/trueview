'use strict';

angular.module('tv').factory('Configs', function($http) {
    return {
        getConfig: function (){
            return $http({
                url: '/api/tv/config',
                method: 'GET'
            });
        },
        updateConfig: function($data){
            return $http({
                method: 'POST',
                url: '/api/tv/config/update_admin',
                type: 'JSON',
                data: $data
            })
        }
    }
});
