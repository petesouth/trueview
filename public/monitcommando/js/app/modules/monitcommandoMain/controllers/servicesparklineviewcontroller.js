/**
 * serviceSparklineViewController Controller
 */
monitcommandoMainModule.globalAppData.controllers.serviceSparklineViewController = function(
		$scope, $routeParams, $location, $window, influxDatabaseService) {

	gUtil.chartIncommingRequestParameterDecorator($scope, $routeParams);
	
	$scope.getChartInstance = function() {
	        var chartId = '#' + $scope.viewchartId;
	        var chart = $(chartId).jqxChart("getInstance");
	        return chart;
	};

	 $scope.loadGraphs = function(responses) {


            var dataOrb = gUtil.getDataOrbFromResultSetsChart($scope, responses);


            var settings = {
                title : $scope.x_title,
                description : " ", //($scope.pollFrequency < 1) ? "" : "Update freq:" + $scope.pollFrequency + " ms",
                enableAnimations: false,
                backgroundColor: " #232323",
                showLegend: false,
                showBorderLine: false,
                borderLineWidth: 0,
                padding: { left: 0, top: 0, right: 0, bottom: 10 },
                titlePadding: { left: 0, top: 0, right: 0, bottom: 10 },
                source : dataOrb.data,
                xAxis : {
                    dataField: 'xVal',
                    unitInterval: 10,
                    valuesOnTicks: false,
                    labels: {
                	    visible: false,
                        angle: -45,
                        offset: { x: -17, y: 10 },
                        interval: 5,
                        color: 'white'
                    },
                    tickMarks: {
                        visible: false,
                        interval: 3,
                        color: '#404040'
                    },
                    gridLines: {
                        visible: false,
                        interval: 3,
                        color: '#404040'
                    }
                },
                valueAxis : {
                	visible: false,
	                position: 'left',
	                padding: { left: 0, right: 0},
                    minValue : dataOrb.minY,
                    maxValue : dataOrb.maxY,
                    title : {
                        text : ""
                    },
                    tickMarks: { color: '#404040', visible: false },
                    gridLines: { color: '#404040', interval: 3 },
                    lables: { color: '#e0e5e5' }

                },
                colorScheme: $scope.schemeName,
                seriesGroups : [{
                    type: $scope.chartType,
                    useGradientColors: false,
                    columnsGapPercent: 50,
                    alignEndPointsWithIntervals: false,
                    series : dataOrb.calculatedSeries
                }]
            };

            // setup the chart
            var chartId =  '#' + $scope.viewchartId;
            $(chartId).jqxChart(settings);
            $(chartId).css('visibility', 'visible');


            $scope.extradata.dataOrb = dataOrb;

            if ($scope.pollFrequency > 0) {
                gUtil.startPolling($scope, $scope.pollFrequency);
            }

        };

	$scope.updateGraphs = function(responses) {

		var dataOrb = gUtil.getDataOrbFromResultSetsChart($scope, responses);

		if (typeof (dataOrb.data) !== 'undefined' && dataOrb.data.length > 0) {
			var chart = $scope.getChartInstance();

			var newTotalSize = $scope.extradata.dataOrb.data.length
					+ dataOrb.data.length;
			if (newTotalSize > $scope.pollSize) {
				newTotalSize = $scope.pollSize;
			}

			if ($scope.pollSize === $scope.maxVisiblePointSize) { // Then
																	// repainting
																	// the whole
																	// chart
																	// each
																	// time.
				$scope.extradata.dataOrb.data.splice(0,
						$scope.extradata.dataOrb.data.length);
			} else if (newTotalSize + $scope.extradata.dataOrb.data.length >= $scope.maxVisiblePointSize) { // Remove
																											// the
																											// old
																											// dots..
																											// Being
																											// replaced
																											// with
																											// the
																											// new
																											// dots.
				$scope.extradata.dataOrb.data.splice(0, newTotalSize);
			}

			for ( var i = 0; i < newTotalSize; ++i) {
				var dataStruct = dataOrb.data[i];
				$scope.extradata.dataOrb.data.push(dataStruct);
			}

			$scope.extradata.dataOrb.lastDate = dataOrb.lastDate;

			if (typeof (chart) !== 'undefined'
					&& typeof (chart.update) !== "undefined") {
				chart.update();
			}
		}
	};

	angular.element(document).ready(function() {

		gUtil.asyncLoadGraphs($scope);
	});

};