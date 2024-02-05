'use strict';
/**
 *  Get all roles
 */

angular.module('tv').factory('Roles', function ($http) {
    return {
        getRoles: function () {
            return $http({
                url: '/api/tv/role',
                method: 'GET'
            });
        }
    }
});
