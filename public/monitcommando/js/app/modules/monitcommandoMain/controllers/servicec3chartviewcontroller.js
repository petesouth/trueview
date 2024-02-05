/**
 * serviceChartViewController Controller
 */
monitcommandoMainModule.globalAppData.controllers.serviceC3ChartViewController = function(
		$scope, $routeParams, $location, $window, influxDatabaseService) {

	gUtil.chartIncommingRequestParameterDecorator($scope, $routeParams);
	

	$scope.chart = null;
	
	$scope.convertToC3 = function(dataOrb) {
		var returnDataOrb = {
				columnsData: []
		};
		$.extend(returnDataOrb, dataOrb);
		
		var xcolumns = ["x"];
		
		dataOrb.data.forEach(function(dataObj){
			xcolumns.push(dataObj.time);
		});
		returnDataOrb.columnsData.push(xcolumns);

		returnDataOrb.calculatedSeries.forEach(function(calcSeries){
			var seriesKey = calcSeries.dataField;
			
			var dataVals = [];
			dataVals.push(calcSeries.displayText);
			
			dataOrb.data.forEach(function(dataObj){
				var value = dataObj[seriesKey];
				dataVals.push(value);
			});

			returnDataOrb.columnsData.push( dataVals );
			
		});

		console.log("returnDataOrb:", returnDataOrb);
		return returnDataOrb;

	};

	$scope.loadGraphs = function(responses) {

		var dataOrb = gUtil.getDataOrbFromResultSetsChart($scope, responses);
		var convertedOrb = $scope.convertToC3(dataOrb);

		$scope.chart = c3.generate({
			bindto : '#' + $scope.viewchartId,
			data : {
				x: 'x',
				columns : convertedOrb.columnsData,
				type : "spline"
			},
		    point: {
		        show: false
		    },
		    axis: {
		        x: {
		            type: 'timeseries',
		            tick: {
				 		rotate: 75,
				 		format: '%I:%H:%S %p %m/%d/%Y '
		            }
		        },
		        y: {
		            max: dataOrb.maxY,
		            min: dataOrb.minY
		            // Range includes padding, set 0 if no padding needed
		            // padding: {top:0, bottom:0}
		        }
		    }
		});

		$scope.extradata.dataOrb = dataOrb;

		if ($scope.pollFrequency > 0) {
			gUtil.startPolling($scope, $scope.pollFrequency);
		}

	};

	$scope.updateGraphs = function(responses) {

		var dataOrb = gUtil.getDataOrbFromResultSetsChart($scope, responses);
		
		if( typeof(dataOrb.data) !== 'undefined' && dataOrb.data.length > 0 ) {
		    var newTotalSize = $scope.extradata.dataOrb.data.length + dataOrb.data.length;
		    if(newTotalSize > $scope.pollSize ) {
		    	newTotalSize = $scope.pollSize;
		    }
		    	
		    	
		    if( $scope.pollSize === $scope.maxVisiblePointSize ) { // Then repainting the whole chart each time.
		    	$scope.extradata.dataOrb.data.splice(0, $scope.extradata.dataOrb.data.length);
		    } else if (newTotalSize +  $scope.extradata.dataOrb.data.length >= $scope.maxVisiblePointSize) {  // Remove the old dots.. Being replaced with the new dots.
		    	$scope.extradata.dataOrb.data.splice(0, newTotalSize);
		    }
		
		    for (var i = 0; i < newTotalSize; ++i) {
		        var dataStruct = dataOrb.data[i];
		        $scope.extradata.dataOrb.data.push(dataStruct);
		    }
		
		    $scope.extradata.dataOrb.lastDate = dataOrb.lastDate;
		    var convertedOrb = $scope.convertToC3($scope.extradata.dataOrb);

		    if (typeof ($scope.chart) !== 'undefined' && typeof ($scope.chart) !== null) {
		    	$scope.chart.load({
				x: 'x',
				columns : convertedOrb.columnsData,
				type : "area-spline"
			});
		    }
		}

	};

	angular.element(document).ready(function() {

		gUtil.asyncLoadGraphs($scope);

	});

};