'use strict';
/**
 *  @getServers: get all servers info of current user
 *  @getServer: get one server info
 */

angular.module('tv').factory('Orgs', function ($http) {
    return {
        getOrgs: function (){
            return $http({
                url: '/api/tv/org',
                method: 'GET',
                type: 'JSON'
            });
        },
        getOrg: function ($org_id) {
            return $http({
                url: '/api/tv/org/' + $org_id,
                method: 'GET'
            });
        },
        getOrgById: function ($id) {
            return $http({
                url: '/api/tv/org/id/' + $id,
                method: 'GET'
            });
        },
        updateOrg: function ($data) {
            return $http({
                url: '/api/tv/org/update',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        },
        deleteOrg: function ($org_id) {
            return $http({
                url: '/api/tv/org/delete/' + $org_id,
                method: 'DELETE',
                type: 'JSON',
            });
        },
        addOrg: function ($data) {
            return $http({
                url: '/api/tv/org/add',
                method: 'POST',
                type: 'JSON',
                data: $data
            });
        }
    }
});
