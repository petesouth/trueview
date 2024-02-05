'use strict';
/**
 *  Get current logged in user info
 */

angular.module('tv').factory('Users', function ($http) {
    return {
        getUser: function () {
            return $http({
                url: '/api/tv/user',
                method: 'GET'
            });
        },
        getUsers: function () {
            return $http({
                url: '/api/tv/users',
                method: 'GET'
            });
        },
        getUserById: function (id) {
            return $http({
                url: '/api/tv/user/'+id,
                method: 'GET'
            });
        },
        updateUser: function ($data) {
            return $http({
                url: '/api/tv/user/update',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        },
        deleteUser: function ($id) {
            return $http({
                url: '/api/tv/user/delete/' + $id,
                method: 'DELETE',
                type: 'JSON',
            });
        },
        addUser: function ($data) {
            return $http({
                url: '/api/tv/user/add',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        }
    }
});
