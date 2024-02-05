'use strict';

angular.module('tv').factory('Messages', function ($http) {
    return {
        getAllMessages: function ($org_id){
            return $http({
                url: '/api/tv/message/' + $org_id,
                method: 'GET',
            });
        },
        isUpdate: function ($org_id){
            return $http({
                url: '/api/tv/message/' + $org_id + '/updated',
                method: 'GET'
            });
        },
        newMessages: function ($org_id){
            return $http({
                url: '/api/tv/message/' + $org_id + '/new',
                method: 'GET'
            });
        },
        readMessage: function ($data){
            return $http({
                url: '/api/tv/message/read',
                method: 'POST',
                type: 'JSON',
                data: $data
            }); 
        }
    }
});
