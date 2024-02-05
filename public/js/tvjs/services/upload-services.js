'use strict';
/**
 *  @getServers: get all servers info of current user
 *  @getServer: get one server info
 */

angular.module('tv').factory('UploadFiles', function ($http) {
    return {
       getUploads: function (org_id, filetype) {
            return $http({
                url: '/api/tv/uploadfiles/' + org_id + '/' + filetype,
                method: 'GET'
            });
        }
        
    }
});
