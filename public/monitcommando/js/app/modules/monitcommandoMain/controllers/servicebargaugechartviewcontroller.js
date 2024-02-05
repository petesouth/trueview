/**
 * serviceChartViewController Controller
 */
monitcommandoMainModule.globalAppData.controllers.serviceBarGaugeChartViewController = function(
		$scope, $routeParams, $location, $window, influxDatabaseService) {

	var windowPlus = 44;

	gUtil.chartIncommingRequestParameterDecoratorPie($scope, $routeParams);

	$scope.getChartInstance = function() {
		var chartId = '#' + $scope.viewchartId;
		var chartElement = $(chartId);
		return chartElement;
	};

	$scope.loadGraphs = function(responses) {

		$scope.extradata.dataOrb = gUtil.getDataOrbFromResultSetsPie($scope,
				responses);
		
		if(  typeof($scope.extradata.dataOrb.lastNumberValue) === "undefined" || $scope.extradata.dataOrb.lastNumberValue === 0 ) {
			$scope.extradata.dataOrb.lastNumberValue = 1;
		}
		

		var settings = {
			animationDuration : 500,
			width : $(window).width() + windowPlus,
			height : $(window).height() + windowPlus,
			values : [ $scope.extradata.dataOrb.lastNumberValue ],
			relativeInnerRadius : .7,
			barSpacing : 0,
			startAngle : 90,
			endAngle : 90
		};

		// setup the chart
		var chartId = '#' + $scope.viewchartId;
		$(chartId).jqxBarGauge(settings);
		$(chartId).css('visibility', 'visible');

		if ($scope.pollFrequency > 0) {
			gUtil.startPolling($scope, $scope.pollFrequency);
		}

	};

	$scope.updateGraphs = function(responses) {

		$scope.extradata.dataOrb = gUtil.getDataOrbFromResultSetsPie($scope,
				responses);
		
		if(  typeof($scope.extradata.dataOrb.lastNumberValue) === "undefined" || $scope.extradata.dataOrb.lastNumberValue === 0 ) {
			$scope.extradata.dataOrb.lastNumberValue = 1;
		}
		
		$("#bargauge_container").empty();
		$("#bargauge_container")
				.append(
				'<div id="'
						+ $scope.viewchartId
						+ '" class="hundredpercenter zero_padding_overflow_hidden bar_gauge" > </div>');


		var settings = {
			animationDuration : 100,
			width : $(window).width() + windowPlus,
			height : $(window).height() + windowPlus,
			values : [ $scope.extradata.dataOrb.lastNumberValue ],
			relativeInnerRadius : .7,
			barSpacing : 0,
			startAngle : 90,
			endAngle : 90
		};

		// setup the chart
		var chartId = '#' + $scope.viewchartId;
		$(chartId).jqxBarGauge(settings);
		$(chartId).css('visibility', 'visible');

	};

	$scope.resizeMe = function() {
		var chart = $scope.getChartInstance();
		chart.jqxBarGauge({
			width : $(window).width() + windowPlus
		});
		chart.jqxBarGauge({
			height : $(window).height() + windowPlus
		});
		$(window).width(windowPlus);
		$(window).height(windowPlus);
	};

	// reset viewbox once window resized
	$(window).resize(function() {
		$scope.resizeMe();
	});

	angular.element(document).ready(function() {
		$scope.updateGraphs([]);
		gUtil.asyncLoadGraphs($scope);
	});

};
