'use strict';

/**
* @ngdoc directive
* @name triLoader
* @restrict E
* @scope
*
* @description
*
* Adds a loader screen that takes up 100%
*
* @usage
* ```html
* <tri-loader></tri-loader>
* ```
*/
(function() {
    'use strict';

    angular
        .module('tv')
        .directive('triLoader', TriLoader);

    /* @ngInject */
    function TriLoader ($rootScope) {
        var directive = {
            bindToController: true,
            controller: TriLoaderController,
            controllerAs: 'vm',
            template: '<md-content flex class="loader" ng-show="vm.status.active" layout="column" layout-fill layout-align="center center"><div class="loader-inner"><md-progress-circular md-mode="indeterminate"></md-progress-circular></div><h3 class="md-headline">{{vm.appName}}</h3></md-content>',
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
            }
        };
        return directive;

        function link($scope, element, attrs) {
            $rootScope.$on('$viewContentLoading', function() {
                $scope.vm.setLoaderActive(true);
            });

            $rootScope.$on('$viewContentLoaded', function() {
                $scope.vm.setLoaderActive(false);
            });
        }
    }

    /* @ngInject */
    function TriLoaderController ($rootScope, LoaderService, APP) {
        var vm = this;

        vm.appName = APP.name;
        vm.status = LoaderService.status;
        vm.setLoaderActive = LoaderService.setLoaderActive;
    }
})();