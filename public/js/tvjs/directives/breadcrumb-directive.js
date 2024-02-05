'use strict';

/**
* @ngdoc directive
* @name breadcrumb
* @restrict A
* @scope
*
* @description
*
* Handles the default toolbar breadcrumbs - works together with the breadcrumb directive recusively
*
* @usage
* ```html
* <span breadcrumb="breadcrumb">
* ```
*/
angular.module('tv')
.directive('breadcrumb', function ($compile, $state) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            breadcrumb: '='
        },
       template: '<span><span translate>{{::breadcrumb.name}}</span><md-icon md-font-icon="icon-chevron-right" ng-show="breadcrumb.children.length > 0"></md-icon></span>',
//	template: '<div layouts= "rows"><md-button ng-repeat="menu in ::breadcrumb.submenu" ng-click="open_link(menu)">{{menu.name}}</md-button></div>', 
	link: function ($scope, $element) {
            if($scope.breadcrumb.children !== undefined) {
               // $element.find('span').attr('hide-sm', '');
            }
            var collectionSt = '<span breadcrumbs="breadcrumb.children"></span>';
            if (angular.isArray($scope.breadcrumb.children)) {
                $compile(collectionSt)($scope, function(cloned) {
                    $element.append(cloned);
                });
            }

	    $scope.open_link = function (menu){
                $state.go(menu.state, {});
                
            }
        }
    };
});
