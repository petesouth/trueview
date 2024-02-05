'use strict';

angular.module('tv').factory('Email', function ($http) {
    return {
        sendEmail: function ($data){
            return $http({
                url: '/api/tv/mail/add',
                method: 'POST',
                type: 'JSON',
                data: $data
            }); 
        }
    }
});
