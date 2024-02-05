'use strict';
/**
 *  @getServers: get all servers info of current user
 *  @getServer: get one server info
 */

angular.module('tv').factory('Rules', function ($http,$localStorage) {
    return {
        getRules: function ($user_company) {
            return $http({
                url: '/api/tv/rule/' + $user_company,
                method: 'GET'
            });
        },
        addRule: function ($data) {
            return $http({
                url: '/api/tv/rule/add',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        },
        updateRule: function ($data) {
            return $http({
                url: '/api/tv/rule/update',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        },
        deleteRule: function ($data) {
            return $http({
                url: '/api/tv/rule/delete',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        }
    }
});
