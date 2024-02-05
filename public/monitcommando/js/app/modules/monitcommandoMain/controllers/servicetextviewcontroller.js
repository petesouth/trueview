/**
 * serviceChartViewController Controller
 */
monitcommandoMainModule.globalAppData.controllers.serviceTextViewController = function(
		$scope, $routeParams, $location, $window, influxDatabaseService) {

	gUtil.chartIncommingRequestParameterDecoratorPie($scope, $routeParams);
	
	$scope.getTextDivInstance = function() {
		var chartId = '#' + $scope.viewchartId;
		var chart = $(chartId);
		return chart;
	};

	$scope.loadGraphs = function(responses) {

		$scope.extradata.dataOrb = gUtil.getDataOrbFromResultSetsPie($scope,
				responses);
		var textDiv = $scope.getTextDivInstance();
		
		
		textDiv.empty();
		var elementText = '<span class="hundredpercenter"><font style="font-size: 80px; fill: lightgray; color: lightgray; font-weight: bold; font-family: Verdana;">' + $scope.extradata.dataOrb.lastNumberValueText + '</font></span>';
		
		textDiv.append(elementText);
		$scope.resizeMe();
		
		if ($scope.pollFrequency > 0) {
			gUtil.startPolling($scope, $scope.pollFrequency);
		}

	};
	
	$scope.resizeMe = function() {
		var paddingTop = Math.floor(($(window).height() - 80) / 2);
		$("#text_panel_container").attr('style', 'padding-top:' + paddingTop + "px;" );
	}
	

	$scope.updateGraphs = function(responses) {
		$scope.loadGraphs(responses);
	};
	
	$(window).resize(function(){
	    $scope.resizeMe();
	});

	angular.element(document).ready(function() {

		gUtil.asyncLoadGraphs($scope);
	});

};
