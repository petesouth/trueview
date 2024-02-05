/**
 * serviceChartViewController Controller
 */
monitcommandoMainModule.globalAppData.controllers.servicePartialPieChartViewController = function(
		$scope, $routeParams, $location, $window, influxDatabaseService) {

	gUtil.chartIncommingRequestParameterDecoratorPie($scope, $routeParams);
	
	$scope.getChartInstance = function() {
		var chartId = '#' + $scope.viewchartId;
		var chart = $(chartId).jqxChart("getInstance");
		return chart;
	};

	$scope.loadGraphs = function(responses) {

		$scope.extradata.dataOrb = gUtil.getDataOrbFromResultSetsPie($scope,
				responses);

		var settings = {
			title : "",
			description : "",
			enableAnimations : false,
			backgroundColor : " #232323",
			showLegend : false,
			showBorderLine : false,
			borderLineWidth : 0,
			legendLayout : {
				flow : 'horizontal'
			},
			padding : {
				left : 0,
				top : 0,
				right : 0,
				bottom : 0
			},
			titlePadding : {
				left : 0,
				top : 0,
				right : 0,
				bottom : 0
			},
			source : $scope.extradata.dataOrb.data,
			colorScheme : $scope.schemeName,
			drawBefore : function(renderer, rect) {
				sz = renderer.measureText($scope.extradata.dataOrb.valueText,
						0, {
							'class' : 'chart-inner-text'
						});
				renderer.text($scope.extradata.dataOrb.valueText, rect.x
						+ (rect.width - sz.width) / 2, rect.y - 10
						+ (rect.height / 2), 0, 0, 0, {
					'class' : 'chart-inner-text'
				});
			},
			seriesGroups : [ {
				type : 'donut',
				showLabels : true,
				series : [ {
					dataField : 'value',
					displayText : 'metric',
					showLabels : false,
					labelRadius : "80%",
					labelLinesEnabled : true,
					labelLinesAngles : true,
					labelsAutoRotate : false,
					initialAngle : 0,
					radius : "90%",
					innerRadius : "80%",
					centerOffset : 0,
					minAngle : 0,
					maxAngle : 180,
					offsetY : "150%",
					formatSettings : {
						sufix : '%',
						decimalPlaces : 2
					}
				} ]
			} ]
		};

		// setup the chart
		var chartId = '#' + $scope.viewchartId;
		$(chartId).jqxChart(settings);
		$(chartId).css('visibility', 'visible');

		if ($scope.pollFrequency > 0) {
			gUtil.startPolling($scope, $scope.pollFrequency);
		}

	};

	$scope.updateGraphs = function(responses) {
		$scope.loadGraphs(responses);
	};

	angular.element(document).ready(function() {

		gUtil.asyncLoadGraphs($scope);
	});

};
