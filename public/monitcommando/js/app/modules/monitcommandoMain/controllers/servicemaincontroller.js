/**
 *  serviceMainController Controller
 */
monitcommandoMainModule.globalAppData.controllers.serviceMainController = function ($scope, $rootScope, $routeParams, $sce, $anchorScroll, $location, influxDatabaseService, elasticSearchService) {
    var metricsEmpty = "[]";
    $scope.UI_TYPE_CHART = "Chart";
    $scope.UI_TYPE_SPARKLINE = "Sparkline";
    $scope.UI_TYPE_LIQUID_GAUGE = "LiquidGauge";
    $scope.UI_TYPE_PARTIAL_PIE_CHART = "PartialPieChart";
    $scope.UI_TYPE_FULL_PIE_CHART = "FullPieChart";
    $scope.UI_TYPE_ELASTIC_PANEL = "ElasticPanel";
    $scope.UI_TYPE_TEXT_PANEL = "TextPanel";
    $scope.UI_TYPE_BAR_GAUGE_CHART = "BarGauge";
    
    $scope.knownServers = [];

    var influx = ( typeof($routeParams.ifdb) === "undefined" || $routeParams.ifdb === "" ) ? "trueview-demo.freehive.io" : $routeParams.ifdb;
    
	
	$scope.runQuery = function() {
		var influxdbserver = $scope.chartBuilderFormData.influxdbserver;
	    var query = $scope.chartBuilderFormData.runQuery;
	    var db = $scope.chartBuilderFormData.influx_db;
	    
	    var url = "http://" + influxdbserver + ":8086/query?db=" + db + "&pretty=true&q=" + query;
	    window.open( url );
	    
	}
	
	
	$scope.buildMetrics = function () {
		
	    var hostServer = $("#hostserver option:selected").text(); 
	    var influxDb = $("#influx_db").val();
	    var influxDbServer = $("#influxdbserver").val();
	    var elasticServer = $("#elasticserver").val();

	   
	    $('#selectedMetricsDropdown').find('option').remove();

	    
	    influxDatabaseService.getAllHosts(influxDbServer,
                                influxDb,
                                function (results) {
                                    $scope.knownServers = [""].concat(results);
                                }, true);

	    elasticSearchService.getAllIndices(elasticServer, function (response) {

	        $scope.existingIndices = ["filebeat-*"].concat(response.items);
	        $scope.chartBuilderFormData.elasticindexname = "filebeat-*";

	        $scope.$apply();
	        console.log("called apply");
	    });
	    
	    
	    influxDatabaseService.getAllMetrics(influxDbServer,
											influxDb,
											hostServer,
											function (results) {
												
												results.forEach(function(result) {
													$('#selectedMetricsDropdown').append('<option value="' + result + '">' + result + '</option>');
												});
												
											}, true);
				 
	};

	$scope.chartBuilderFormSubmit = function ($event) {
	    $event.stopPropagation();

	    $scope.influxdbserver = $scope.chartBuilderFormData.influxdbserver;
	    $scope.elasticserver = $scope.chartBuilderFormData.elasticserver;
	    $scope.hostserver = $scope.chartBuilderFormData.hostserver;
	    $scope.influx_db = $scope.chartBuilderFormData.influx_db;
	    $scope.valueColumnName = $scope.chartBuilderFormData.valueColumnName;
	    $scope.showLables = $scope.chartBuilderFormData.showLables;
	    $scope.showDates = $scope.chartBuilderFormData.showDates;
	    
	    var newMetricPaths = [];
	    
		$('#selectedMetricsDropdown :selected').each(function(i, selected){ 
			var metric = $(selected).val();
			newMetricPaths.push($scope.influx_db + ":" + $scope.valueColumnName + "//" + metric);
		});



		$scope.pollFrequency = $scope.chartBuilderFormData.pollFrequency;
		$scope.metrics = JSON.stringify(newMetricPaths);
		$scope.schemeName = $scope.chartBuilderFormData.schemeName;
		$scope.resultDivideBy = $scope.chartBuilderFormData.resultDivideBy;
		$scope.resultMultiplyBy = $scope.chartBuilderFormData.resultMultiplyBy;
		$scope.startDate = $scope.chartBuilderFormData.startDate;
		$scope.uiType = $scope.chartBuilderFormData.uiType;
		$scope.elasticindexname = $scope.chartBuilderFormData.elasticindexname;
		$scope.functionAverage = $scope.chartBuilderFormData.functionAverage;
		$scope.groupBy = "" + $scope.chartBuilderFormData.groupByUnitNumber + $scope.chartBuilderFormData.groupBy;
		$scope.chartType = $scope.chartBuilderFormData.chartType;
		$scope.numberOfPredictedValues = $scope.chartBuilderFormData.numberOfPredictedValues;
        $scope.seasonalPattern = $scope.chartBuilderFormData.seasonalPattern;
        $scope.displayReverse = $scope.chartBuilderFormData.displayReverse;
        $scope.x_title = $scope.chartBuilderFormData.x_title;
        $scope.pollSize = $scope.chartBuilderFormData.pollSize;
        $scope.maxVisiblePoints = $scope.chartBuilderFormData.maxVisiblePoints;
        
        $scope.elasticIndexBeg = $scope.chartBuilderFormData.elasticIndexBeg;
        $scope.elasticBatchSize = $scope.chartBuilderFormData.elasticBatchSize;

		var theNewUrl = "/monitcommando/nopage.html";
		
		if ($scope.uiType === $scope.UI_TYPE_CHART && newMetricPaths.length > 0) {
		    theNewUrl = "#/chartcontrol?host=" + $scope.hostserver + "&dr=" + $scope.displayReverse + "&mvps=" + $scope.maxVisiblePoints + "&ps=" + $scope.pollSize + "&fq=" + $scope.pollFrequency + "&mc=" + $scope.metrics + "&ifdb=" + $scope.influxdbserver + "&shd=" + $scope.showDates + "&shl=" + $scope.showLables + "&rmb=" + $scope.resultMultiplyBy + "&rdb=" + $scope.resultDivideBy + "&schemeName=" + $scope.schemeName + "&startDate=" + (($scope.startDate !== "") ? new Date($scope.startDate).getTime() : "") +  "&dr=" + $scope.displayReverse + "&gb=" + $scope.groupBy + "&fa=" + $scope.functionAverage + "&chartType=" + $scope.chartType + "&bigN=" +$scope.numberOfPredictedValues + "&bigS=" + $scope.seasonalPattern + "&x_title=" + $scope.x_title; 
		} else if ($scope.uiType === $scope.UI_TYPE_C3_CHART && newMetricPaths.length > 0) {
		    theNewUrl = "#/c3chartcontrol?host=" + $scope.hostserver + "&dr=" + $scope.displayReverse + "&mvps=" + $scope.maxVisiblePoints + "&ps=" + $scope.pollSize + "&fq=" + $scope.pollFrequency + "&mc=" + $scope.metrics + "&ifdb=" + $scope.influxdbserver + "&shd=" + $scope.showDates + "&shl=" + $scope.showLables + "&rmb=" + $scope.resultMultiplyBy + "&rdb=" + $scope.resultDivideBy + "&schemeName=" + $scope.schemeName + "&startDate=" + (($scope.startDate !== "") ? new Date($scope.startDate).getTime() : "") +  "&dr=" + $scope.displayReverse + "&gb=" + $scope.groupBy + "&fa=" + $scope.functionAverage + "&chartType=" + $scope.chartType + "&bigN=" +$scope.numberOfPredictedValues + "&bigS=" + $scope.seasonalPattern + "&x_title=" + $scope.x_title; 
		} else if ($scope.uiType === $scope.UI_TYPE_SPARKLINE && newMetricPaths.length > 0) {
		    theNewUrl = "#/sparklinecontrol?host=" + $scope.hostserver + "&mvps=" + $scope.maxVisiblePoints + "&ps=" + $scope.pollSize + "&fq=" + $scope.pollFrequency + "&mc=" + $scope.metrics + "&ifdb=" + $scope.influxdbserver + "&rmb=" + $scope.resultMultiplyBy + "&rdb=" + $scope.resultDivideBy + "&schemeName=" + $scope.schemeName + "&startDate=" + (($scope.startDate !== "") ? new Date($scope.startDate).getTime() : "") +  "&gb=" + $scope.groupBy + "&fa=" + $scope.functionAverage + "&chartType=" + $scope.chartType + "&bigN=" +$scope.numberOfPredictedValues + "&bigS=" + $scope.seasonalPattern;
		} else if ($scope.uiType === $scope.UI_TYPE_PARTIAL_PIE_CHART && newMetricPaths.length > 0) {
		    theNewUrl = "#/partialpiechartcontrol?host=" + $scope.hostserver + "&dr=" + $scope.displayReverse + "&mvps=" + $scope.maxVisiblePoints + "&ps=" + $scope.pollSize + "&fq=" + $scope.pollFrequency + "&mc=" + $scope.metrics + "&ifdb=" + $scope.influxdbserver + "&shd=" + $scope.showDates + "&shl=" + $scope.showLables + "&rmb=" + $scope.resultMultiplyBy + "&rdb=" + $scope.resultDivideBy + "&schemeName=" + $scope.schemeName + "&startDate=" + (($scope.startDate !== "") ? new Date($scope.startDate).getTime() : "") +  "&dr=" + $scope.displayReverse + "&gb=" + $scope.groupBy + "&fa=" + $scope.functionAverage + "&chartType=" + $scope.chartType + "&bigN=" +$scope.numberOfPredictedValues + "&bigS=" + $scope.seasonalPattern + "&x_title=" + $scope.x_title; 
		} else if ($scope.uiType === $scope.UI_TYPE_FULL_PIE_CHART && newMetricPaths.length > 0) {
		    theNewUrl = "#/fullpiechartcontrol?host=" + $scope.hostserver + "&dr=" + $scope.displayReverse + "&mvps=" + $scope.maxVisiblePoints + "&ps=" + $scope.pollSize + "&fq=" + $scope.pollFrequency + "&mc=" + $scope.metrics + "&ifdb=" + $scope.influxdbserver + "&shd=" + $scope.showDates + "&shl=" + $scope.showLables + "&rmb=" + $scope.resultMultiplyBy + "&rdb=" + $scope.resultDivideBy + "&schemeName=" + $scope.schemeName + "&startDate=" + (($scope.startDate !== "") ? new Date($scope.startDate).getTime() : "") +  "&dr=" + $scope.displayReverse + "&gb=" + $scope.groupBy + "&fa=" + $scope.functionAverage + "&chartType=" + $scope.chartType + "&bigN=" +$scope.numberOfPredictedValues + "&bigS=" + $scope.seasonalPattern + "&x_title=" + $scope.x_title; 
		} else if ($scope.uiType === $scope.UI_TYPE_BAR_GAUGE_CHART && newMetricPaths.length > 0) {
		    theNewUrl = "#/bargaugechartcontrol?host=" + $scope.hostserver + "&dr=" + $scope.displayReverse + "&mvps=" + $scope.maxVisiblePoints + "&ps=" + $scope.pollSize + "&fq=" + $scope.pollFrequency + "&mc=" + $scope.metrics + "&ifdb=" + $scope.influxdbserver + "&shd=" + $scope.showDates + "&shl=" + $scope.showLables + "&rmb=" + $scope.resultMultiplyBy + "&rdb=" + $scope.resultDivideBy + "&schemeName=" + $scope.schemeName + "&startDate=" + (($scope.startDate !== "") ? new Date($scope.startDate).getTime() : "") +  "&dr=" + $scope.displayReverse + "&gb=" + $scope.groupBy + "&fa=" + $scope.functionAverage + "&chartType=" + $scope.chartType + "&bigN=" +$scope.numberOfPredictedValues + "&bigS=" + $scope.seasonalPattern + "&x_title=" + $scope.x_title; 
		} else if ($scope.uiType === $scope.UI_TYPE_LIQUID_GAUGE && newMetricPaths.length > 0) {
		    theNewUrl = "/monitcommando/plugin_gauge/#/liquid?host=" + $scope.hostserver + "&dr=" + $scope.displayReverse + "&mvps=" + $scope.maxVisiblePoints + "&ps=" + $scope.pollSize + "&fq=" + $scope.pollFrequency + "&mc=" + $scope.metrics + "&ifdb=" + $scope.influxdbserver + "&shd=" + $scope.showDates + "&shl=" + $scope.showLables + "&rmb=" + $scope.resultMultiplyBy + "&rdb=" + $scope.resultDivideBy + "&schemeName=" + $scope.schemeName + "&startDate=" + (($scope.startDate !== "") ? new Date($scope.startDate).getTime() : "") +  "&dr=" + $scope.displayReverse + "&gb=" + $scope.groupBy + "&fa=" + $scope.functionAverage + "&chartType=" + $scope.chartType + "&bigN=" +$scope.numberOfPredictedValues + "&bigS=" + $scope.seasonalPattern + "&x_title=" + $scope.x_title; 
		} else if ($scope.uiType === $scope.UI_TYPE_TEXT_PANEL && newMetricPaths.length > 0) {
		    theNewUrl = "/monitcommando/#/textpanel?host=" + $scope.hostserver + "&dr=" + $scope.displayReverse + "&mvps=" + $scope.maxVisiblePoints + "&ps=" + $scope.pollSize + "&fq=" + $scope.pollFrequency + "&mc=" + $scope.metrics + "&ifdb=" + $scope.influxdbserver + "&shd=" + $scope.showDates + "&shl=" + $scope.showLables + "&rmb=" + $scope.resultMultiplyBy + "&rdb=" + $scope.resultDivideBy + "&schemeName=" + $scope.schemeName + "&startDate=" + (($scope.startDate !== "") ? new Date($scope.startDate).getTime() : "") +  "&dr=" + $scope.displayReverse + "&gb=" + $scope.groupBy + "&fa=" + $scope.functionAverage + "&chartType=" + $scope.chartType + "&bigN=" +$scope.numberOfPredictedValues + "&bigS=" + $scope.seasonalPattern + "&x_title=" + $scope.x_title; 
		} else if ($scope.uiType === $scope.UI_TYPE_ELASTIC_PANEL && $scope.chartBuilderFormData.elasticindexname !== "") {
		    theNewUrl = "#/elasticlogstashgridpanel?host=" + $scope.hostserver + "&indexName=" + $scope.elasticindexname + "&mvps=" + $scope.maxVisiblePoints + "&ps=" + $scope.pollSize + "&fq=" + $scope.pollFrequency + "&mc=" + $scope.metrics + "&ifdb=" + $scope.influxdbserver + "&rmb=" + $scope.resultMultiplyBy + "&rdb=" + $scope.resultDivideBy + "&schemeName=" + $scope.schemeName + "&begIndex=" + $scope.elasticIndexBeg + "&batchSize=" + $scope.elasticBatchSize + "&startDate=" + (($scope.startDate !== "") ? new Date($scope.startDate).getTime() : "");
        } else {
		    console.log("Warning unknown $scope.uiType or no metrics selected", $scope.uiType);
		}

		$scope.trustedChartUrl = $sce.trustAsResourceUrl(theNewUrl);

		setTimeout(function () {

		    document.getElementById("iframe_parent_trusted_chart_url_ifrm").innerHTML = "<iframe id='trusted_chart_url_ifrm' height='500' width='100%' frameBorder='0'></iframe>";
		    document.getElementById("trusted_chart_url_ifrm").contentWindow.location = theNewUrl;
		}, 0);
		   
    };
	
	$scope.initResetData = function() {
		 $scope.influxdbserver = influx;
		    $scope.elasticserver = influx; // Should be same server.. In most cases.
		    $scope.elasticindexname = "";
		    $scope.startDate = "";
		    $scope.hostserver = "";
		    $scope.metrics = metricsEmpty;
		    $scope.pollFrequency = 4000;
		    $scope.schemeName = "scheme01";
		    $scope.uiType = $scope.UI_TYPE_CHART;
		    $scope.resultDivideBy = 1;
		    $scope.resultMultiplyBy = 1;
		    $scope.influx_db = "";		
		    $scope.trustedChartUrl = "";
		    $scope.knownDatabases = [];
		    $scope.existingIndices = [];
		    $scope.chartType = "stackedsplinearea";
		    $scope.valueColumnName = "value";
		    $scope.elasticIndexBeg = 0;
		    $scope.elasticBatchSize = 100;
		    $scope.displayReverse = "true";
		    $scope.showLables = "true";
		    $scope.showDates = "true";
		    $scope.x_title = "";
		    $scope.pollSize = "1";
		    $scope.maxVisiblePoints = "50";
		    
		    $scope.chartTypes = ["splinearea", "spline", "column", "stackedcolumn", "stackedsplinearea", "stackedspline", "line", "area"];


		    $scope.groupBys = [ { name: "s", label: "seconds" },
			                    { name: "u", label: "microseconds" },
			                    { name: "ms", label: "milliseconds" },
			                    { name: "m", label: "minutes" },
			                    { name: "h", label: "hours" },
			                    { name: "d", label: "days" },
			                    { name: "w", label: "weeks" }];


		    $scope.groupBy = "1" + $scope.groupBys[0].name;

			$scope.functionAverage = "";

		    $scope.functionAverages = ["", 
		                               "COUNT", 
		                               "BOTTOM", 
		                               "CEILING", 
		                               "HOLT_WINTERS",
		                               "HOLT_WINTERS_WITH_FIT", 
		                               "DISTINCT", 
		                               "FIRST", 
		                               "CUMULATIVE_SUM", 
		                               "INTEGRAL", 
		                               "LAST", 
		                               "DERIVATIVE",
			                            "MEAN",
			                            "MIN",
			                            "ELAPSED",
			                            "MODE",
			                            "PERCENTILE",
			                            "FLOOR",
			                            "SPREAD",
			                            "SAMPLE",
			                            "HISTOGRAM",
			                            "STDDEV",
			                            "TOP",
			                           // "MOVING_AVERAGE",
			                            "SUM",
			                             "NON_NEGATIVE_DERIVATIVE"];
		    
		    
		    var query = "";
		    if(typeof($scope.chartBuilderFormData) !== "undefined" && 
		    		typeof($scope.chartBuilderFormData.runQuery) !== "undefined" &&
		    		$scope.chartBuilderFormData.runQuery.length > 0 ) {
		    	query = $scope.chartBuilderFormData.runQuery;
		    }
		    

			$scope.chartBuilderFormData = {
			        influxdbserver: influx,
			        elasticserver: influx,
			        elasticindexname: "",
			        influx_db: "",
			        hostserver: "",
			        startDate: "",
			        schemeName: "scheme01",
			        valueColumnName: "value",
					uiType: $scope.UI_TYPE_CHART,
					displayReverse: $scope.displayReverse,
					elasticIndexBeg: 0,
			        elasticBatchSize: 100,
		            pollFrequency: 4000,
					resultDivideBy: 1,
					resultMultiplyBy: 1,
					functionAverage: "",
					groupByUnitNumber: 1,
					numberOfPredictedValues: 0,
			        seasonalPattern: 0,
			        x_title: "",
			        pollSize: 1,
			        maxVisiblePoints: 50,
			        groupBy: $scope.groupBys[0].name,
		            chartType: "stackedsplinearea",
		            showLables: "true",
		            showDates: "true",
		            runQuery: query
			};
			
			influxDatabaseService.getAllDatabases($scope.influxdbserver,
			function (results) {
				    $scope.knownDatabases = results;
				    $scope.chartBuilderFormData.influx_db = $scope.knownDatabases[0];
			}, false);
	};
	
	// Create ant Init scope context
	$scope.initResetData();

	
	

	angular.element(document).ready(function () {

	    $("#chartBuilderFormDataStartDateInput").datetimepicker();
	    
		
		
	});
};