'use strict';
/**
 *  Get tickets
 */

angular.module('tv').factory('Tickets', function ($http) {
    return {
        getAllTickets: function () {
            return $http({
                url: '/api/tv/ticket',
                method: 'GET'
            });
        },
        getTickets: function ($org_id) {
            return $http({
                url: '/api/tv/ticket/' + $org_id,
                method: 'GET'
            }); 
        },
        getTicket: function ($id) {
            return $http({
                url: '/api/tv/ticket/id/' + $id,
                method: 'GET'
            });
        } 
    }
});
