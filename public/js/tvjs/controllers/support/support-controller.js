'use strict';

/**
 * @ngdoc function
 * @name SnapshotsController
 * @module snapshots 
 * @kind function
 *
 */

angular.module('support', ['ngMaterial'])
    .controller('SupportController', function($scope, Tickets, ticketList, $location) {
        console.log("support");
        $scope.tickets = ticketList.data;
        $scope.totalItems = $scope.tickets.length;
        /*
        Tickets.getTickets().success(function(data){
            $scope.tickets = data;
            console.log('tickets', $scope.tickets);
        });
        */
        /*
         * pagination
         */
        $scope.numPerPage = 100;
        $scope.currentPage = 1;

        $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage);
            var end = begin + $scope.numPerPage;

            $scope.filteredTickets = $scope.tickets.slice(begin, end);
        });

        $scope.go = function(id){
            var path= '/support/' + id;
            $location.path( path );
        };
    });

