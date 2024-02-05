'use strict';
/**
 *  @getServers: get all servers info of current user
 *  @getServer: get one server info
 */

angular.module('tv').factory('Servers', function ($http,$localStorage) {
    return {
        getAllServers: function (){
            return $http({
                url: '/api/tv/server',
                method: 'GET'
            });
        },
        getServers: function ($user_company) {
            return $http({
                url: '/api/tv/server/org/' + $user_company,
                method: 'GET'
            });
        },
        getRegisteredServers: function ($user_company) {
            return $http({
                url: '/api/tv/server/org/' + $user_company + '/registered',
                method: 'GET'
            });
        },
        getActivedServers: function ($user_company) {
            return $http({
                url: '/api/tv/server/org/' + $user_company + '/actived',
                method: 'GET'
            });
        },
        getServer: function ($server_id) {
            return $http({
                url: '/api/tv/server/' + $server_id,
                method: 'GET'
            });
        },
        getServerSync: function ($server_id) {
            return $.ajax({
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", 'Bearer ' + $localStorage.token);
                },
                url: '/api/tv/server/' + $server_id,
                type: "GET",
                dataType: "JSON",
                async: false
            }).responseJSON[0];
        },
        addServer: function ($data) {
            return $http({
                url: '/api/tv/server/add',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        },
        updateServer: function ($data) {
            return $http({
                url: '/api/tv/server/update',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        },
        deleteServer: function ($id) {
            return $http({
                url: '/api/tv/server/delete/' + $id,
                method: 'DELETE',
                type: 'JSON',
            });
        },
        registerServer: function ($data) {
            return $http({
                url: '/api/tv/server/register',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        },
        getServerImageMap: function () {
            return $http({
                url: '/trueview/serverImageMap.json',
                method: 'GET',
                type: 'JSON'
            });
        }
    }
});
