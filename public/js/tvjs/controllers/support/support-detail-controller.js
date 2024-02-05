'use strict';

/**
 * @ngdoc function
 * @name SnapshotsController
 * @module snapshots 
 * @kind function
 *
 */

angular.module('supportDetail', ['ngMaterial'])
    .controller('SupportDetailController', function($scope, Tickets, $stateParams) {
        console.log("support detail page");
        var ticketid = $stateParams.id;
        Tickets.getTicket(ticketid).success(function(data) {
            $scope.ticket = data[0];
            console.log("ticket:",$scope.ticket);
        });

    });

