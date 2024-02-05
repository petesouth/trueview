
/**
 * http://usejsdoc.org/
 */
var gUtil = {};

/**
 * Takes responses (results from 1-n queries from Influx and churns them down
 * into the sturcture $scope.dataOrb points to. Mainly: { data: data, // ready
 * to graph [ { xVal:, yVal0: yVal1: yVal2... ] where yVal is an overlayed
 * metric upon xVal minY: minY, // In all the data.. The minY Value maxY: maxY, //
 * In all the data the maxY Value numberOfSeries: numberOfSeries, // The number
 * of metrics queries for responses: responses, // The raw responses from each
 * metric query title: title, // The calulcated Title (from each metrci
 * accounted for) calculatedSeriesgroups: calculatedSeriesgroups ( The Chart
 * Result Series that control JQWidget Chart's Overlay Y values ) }
 * 
 */
gUtil.getDataOrbFromResultSetsChart = function($scope, responses) {

	var resultSetCollection = [];
	var metricTitleString = "";
	var numberOfSeries = responses.length;
	var lastDate = new Date(); // Right Now

	for ( var i = 0; i < numberOfSeries; ++i) {
		var response = responses[i];
		var newData = gUtil.gInfluxDatabaseService
				.getDataFromInfluxResponse(response);
		resultSetCollection.push(newData);
		metricTitleString += " : " + response.metric;
	}

	var data = [];
	var numberOfSeries = resultSetCollection.length;
	var map = new Map();

	for ( var i = 0; i < numberOfSeries; ++i) {
		var resultSet = resultSetCollection[i];

		if (data.length == 0) {
			resultSet
					.forEach(function(resultData) {

						if (typeof (resultData.xVal) === "undefined"
								|| typeof (resultData.yVal) === "undefined"
								|| resultData.xVal === null
								|| resultData.yVal === null) {
							console.log("bad data ignored");
						} else {

							try {

								var javaScriptStructure = {};
								if( resultData.yVal >  Number.MAX_SAFE_INTEGER ) {
									resultDatay.yVal = Number.MAX_SAFE_INTEGER;
								}
								
								
								var value = resultData.yVal;
								
								value = value * $scope.resultMultiplyBy;
								value = value / $scope.resultDivideBy;
								if (typeof (value) === "undefined"
										|| value === null) {
									value = 0;
								}

								javaScriptStructure.xVal = resultData.xVal;
								javaScriptStructure.time = resultData.time;
								javaScriptStructure["yVal0"] = value;

								data.push(javaScriptStructure);
							} catch (error) {
								console
										.log("Error parsing return data:",
												error);
							}
						}

					});
		} else { // I share the date with the other datapoints so they line
			// up.
			// First loop goes through.. Makes the array.. and the first yVal
			// from the series.
			// Second loop (this one) copies the other y axis charts into the
			// datastructure... Giving you struct.xVal and
			// struct[yVal0-yVal(Total Fields)]
			for ( var i2 = 0; i2 < resultSet.length; ++i2) {
				var value = resultSet[i2].yVal;

				if (typeof (value) === "undefined" || value === null) {
					value = 0;
				}

				try {
					var fieldName = "yVal" + i;

					value = value * $scope.resultMultiplyBy;
					value = value / $scope.resultDivideBy;

					data[i2][fieldName] = value;
				} catch (error) {
					console.log("Error parsing return data:", error);
				}

			}
		}
	}

	var maxY = 0;
	var maxX = 0;
	var minY = 0;

	data.forEach(function(dataValue) {

		if (dataValue.xVal > maxX) {
			maxX = dataValue.xVal;
		}

		lastDate = dataValue.time;

		for ( var i = 0; i < numberOfSeries; ++i) {

			var fieldName = "yVal" + i;

			if (dataValue[fieldName] > maxY) {
				maxY = dataValue[fieldName];
			}

			if (dataValue.yVal < minY) {
				minY = dataValue[fieldName];
			}
		}
	});

	maxY *= 1.5;

	var calculatedSeries = [];

	for ( var i = 0; i < numberOfSeries; ++i) {

		var fieldName = "yVal" + i;
		calculatedSeries.push({
			dataField : fieldName,
			displayText : responses[i].metric,
			lineWidth : 4,
			symbolType : 'none',
			opacity : 0.5
		});
	}

	if ($scope.dataReverse === true) {
		data = data.reverse();
	}

	var returnObj = {
		data : data,
		minY : minY,
		lastDate : lastDate,
		maxY : (typeof ($scope.maxYVal) === 'undefined') ? maxY
				: $scope.maxYVal,
		numberOfSeries : numberOfSeries,
		responses : responses,
		calculatedSeries : calculatedSeries
	};

	console.log("returnObj:", returnObj);
	return returnObj;

};

/**
 * Takes responses (results from 1-n queries from Influx and churns them down
 * into the sturcture $scope.dataOrb points to. Mainly: { data: data, // ready
 * to graph [ { xVal:, yVal0: yVal1: yVal2... ] where yVal is an overlayed
 * metric upon xVal numberOfSeries: numberOfSeries, // The number of metrics
 * queries for responses: responses, // The raw responses from each metric query
 * title: title, // The calulcated Title (from each metrci accounted for) }
 * 
 */
gUtil.getDataOrbFromResultSetsPie = function($scope, responses) {

	var metricTitleString = "";
	var numberOfSeries = responses.length;
	var data = [];
	var total = 0.0;
	var valueText = "0%";
	var valueMax = 0;
	var lastNumberValue = 0;
	var lastNumberValueText = "0";

	for ( var i = 0; i < numberOfSeries; ++i) {
		var response = responses[i];
		var newData = gUtil.gInfluxDatabaseService
				.getDataFromInfluxResponse(response);
		metricTitleString += " : " + response.metric;
		newData.forEach(function(resultData) {

			var value = resultData.yVal;
			value = value * $scope.resultMultiplyBy;
			value = value / $scope.resultDivideBy;

			var dataItem = {
				metric : response.metric,
				value : value
			};
			total += dataItem.value;
			valueMax = total;
			valueText = "" + (total).toFixed(0) + "%";
			lastNumberValueText = "" + (dataItem.value).toFixed(0);
			lastNumberValue = dataItem.value;
			data.push(dataItem);
		});

	}

	var totalLeft = 100.0 - total;
	var totalLeftDataItem = {
		metric : "",
		value : totalLeft
	};
	data.unshift(totalLeftDataItem);

	var title = $scope.serverHostName + metricTitleString;
	
	valueText += $scope.totalString;

	return {
		data : data,
		numberOfSeries : numberOfSeries,
		responses : responses,
		title : title,
		valueText : valueText,
		valueMax : valueMax,
		lastNumberValue : lastNumberValue,
		lastNumberValueText : lastNumberValueText

	};

};

/**
 * stopPolling()
 */
gUtil.stopPolling = function($scope) {
	if (typeof ($scope.myInterval) === "undefined") {
		$scope.myInterval = 0;
	} else {
		clearInterval($scope.myInterval);
	}

	window.stopPolling_Chart = function() {
		gUtil.stopPolling($scope);
	};

};



/**
 * startPolling()
 */
gUtil.startPolling = function($scope, frequency) {
	gUtil.stopPolling($scope);
	$scope.pollFrequency = frequency;

	$scope.myInterval = setInterval(function() {
		if (typeof ($scope.staticJsonUrl) !== "undefined") {

			gUtil.gInfluxDatabaseService.updateInfluxGraphStaticJson(
					$scope.staticJsonUrl, $scope.serviceHostName,
					$scope.metric, $scope.updateGraphs);

		} else {

			gUtil.gInfluxDatabaseService.updateInfluxGraph(
					$scope.influxServerUrl, $scope.serverHostName,
					$scope.serverHostName, $scope.metric, $scope.updateGraphs,
					$scope.pollSize, $scope.extradata.dataOrb.lastDate,
					$scope.functionAverage, $scope.groupBy, $scope.bigN,
					$scope.bigS);
		}
	}, $scope.pollFrequency);

	console.log("started polling:InervalId:" + $scope.myInterval
			+ ", pollSize:" + $scope.pollSize + ", $scope.pollFrequency:"
			+ $scope.pollFrequency);

	// This creates Global methods that point to these. These global methods are
	// used
	// externally by for an example.. An IFrame Parent.
	window.startPolling_Chart = function(frequency) {
		gUtil.startPolling($scope, frequency);
	};

};

/**
 * Calls the inital Timer. And if a polling flag was passed.. Starts polling.
 */
gUtil.asyncLoadGraphs = function($scope) {

	$(window).unload(function() {
		gUtil.stopPolling($scope);
		if (typeof ($scope.stopPollingEvent) !== "undefined") {
			$scope.stopPollingEvent($scope);
		}
		return "Handler for .unload() called.";
	});

	setTimeout(function() {

		if (typeof ($scope.staticJsonUrl) !== "undefined") {

			gUtil.gInfluxDatabaseService.updateInfluxGraphStaticJson(
					$scope.staticJsonUrl, $scope.serviceHostName,
					$scope.metric, $scope.loadGraphs);

		} else {

			gUtil.gInfluxDatabaseService.updateInfluxGraph(
					$scope.influxServerUrl, $scope.serverHostName,
					$scope.serverHostName, $scope.metric, $scope.loadGraphs,
					$scope.maxVisiblePointSize, $scope.startDate,
					$scope.functionAverage, $scope.groupBy, $scope.bigN,
					$scope.bigS);
		}

	}, 0);

};

gUtil.chartIncommingRequestParameterDecorator = function($scope, $routeParams) {
	$scope.viewchartId = "viewchartId";
	$scope.serverHostName = $routeParams.host;
	$scope.metric = $routeParams.mc;
	$scope.maxVisiblePointSize = $routeParams.mvps;
	$scope.pollSize = $routeParams.ps;
	$scope.pollFrequency = $routeParams.fq;
	$scope.influxServerUrl = $routeParams.ifdb;
	$scope.staticJsonUrl = $routeParams.sju;
	$scope.schemeName = $routeParams.schemeName;
	$scope.chartType = $routeParams.chartType;
	$scope.maxYVal = $routeParams.maxY;
	$scope.resultMultiplyBy = $routeParams.rmb;
	$scope.resultDivideBy = $routeParams.rdb;
	$scope.myInterval = null;
	$scope.startDate = $routeParams.startDate;
	$scope.functionAverage = $routeParams.fa;
	$scope.groupBy = $routeParams.gb;
	$scope.showLegend = $routeParams.shl;
	$scope.showDates = $routeParams.shd;
	$scope.valueUnits = $routeParams.vu;
	$scope.x_title = $routeParams.x_title;
	$scope.bigN = $routeParams.bigN;
	$scope.bigS = $routeParams.bigS;
	$scope.dataReverse = $routeParams.dr;

	if (typeof ($scope.dataReverse) === 'undefined') {
		$scope.dataReverse = false;
	} else {
		$scope.dataReverse = ($scope.dataReverse === "true") ? true : false;
	}

	if (typeof ($scope.showLegend) === 'undefined') {
		$scope.showLegend = true;
	} else {
		$scope.showLegend = ($scope.showLegend === "true") ? true : false;
	}

	if (typeof ($scope.showDates) === 'undefined') {
		$scope.showDates = true;
	} else {
		$scope.showDates = ($scope.showDates === "true") ? true : false;
	}

	if (typeof ($scope.startDate) !== 'undefined' && $scope.startDate !== '') {
		$scope.startDate = new Date(parseInt($scope.startDate));
	} else {
		$scope.startDate = null;
	}

	if (typeof ($scope.groupBy) === 'undefined') {
		$scope.groupBy = "";
	}

	if (typeof ($scope.functionAverage) === 'undefined') {
		$scope.functionAverage = "";
	}

	if (typeof ($scope.x_title) === 'undefined') {
		$scope.x_title = "";
	}

	if (typeof ($scope.resultDivideBy) === 'undefined') {
		$scope.resultDivideBy = 1;
	}

	if (typeof ($scope.resultDivideBy) === 'undefined') {
		$scope.resultDivideBy = 1;
	}

	if (typeof ($scope.schemeName) === 'undefined') {
		$scope.schemeName = "scheme05";
	}

	if (typeof ($scope.chartType) === 'undefined') {
		$scope.chartType = "splinearea";
	}

	if (typeof ($scope.maxVisiblePointSize) === 'undefined') {
		$scope.maxVisiblePointSize = 50;
	} else {
		$scope.maxVisiblePointSize = parseInt($scope.maxVisiblePointSize);
	}

	if (typeof ($scope.pollFrequency) === 'undefined'
			|| $scope.pollFrequency < 2000) {
		console.log("bull shit poll frequency rejected reseting to 2000");
		$scope.pollFrequency = 2000;
	}

	if (typeof ($scope.pollSize) === 'undefined') {
		$scope.pollSize = 1;
	} else {
		$scope.pollSize = parseInt($scope.pollSize);
	}

	$scope.extradata = {
		dataOrb : {
			data : [],
			lastDate : null,
			responses : [],
			calculatedSeries : [],
			numberOfSeries : 0,
			minY : 0,
			maxY : 0
		}
	};

};

gUtil.chartIncommingRequestParameterDecoratorPie = function($scope,
		$routeParams) {
	gUtil.chartIncommingRequestParameterDecorator($scope, $routeParams);

	$scope.maxVisiblePointSize = 1;
	$scope.pollSize = 1;
	$scope.totalString = $routeParams.total;
	
	
	if (typeof ($scope.totalString) === 'undefined' || $scope.totalString === "") {
		$scope.totalString = "";
	} else {
		$scope.totalString = "/" + $scope.totalString;
	}
};

/**
 * Traverses the object (o) calling the func inputed with the same params of
 * this method but with each child of this main root object. It visits all of an
 * objects member variable children.
 */
gUtil.traversObject = function(o, func, parents) {

	if (typeof (parents) === "undefined") {
		parents = [];
	}

	var objects = [];

	for ( var i in o) {
		func(i, o[i], parents);

		if (o[i] !== null && typeof (o[i]) == "object") {
			// going on step down in the object tree!!
			objects.push({
				val : o[i],
				parent : i
			});
		}
	}

	objects.forEach(function(theObj) {
		parents.push(theObj.parent);
		gUtil.traversObject(theObj.val, func, parents);
	});
};

/**
 * Gets the name of all the member variables in an object and all of it's member
 * variable children. Utilizes above.. gUtil.traverseObject Reported back.. Like
 * paths
 */
gUtil.getAllFieldsInObjectAsPaths = function(data) {
	var objectFields = [];

	gUtil.traversObject(data, function(i, theObj, parents) {
		var path = "";

		parents.forEach(function(parent) {
			path += parent + ">";
		});

		path += i;

		if (theObj !== null && typeof (theObj) !== "object") {
			objectFields.push({
				path : path,
				value : theObj
			});
		}

	});

	return objectFields;
};

gUtil.randomNumber = function(minimum, maximum) {
	return Math.round(Math.random() * (maximum - minimum) + minimum);
};

gUtil.isNull = function(val) {
	return (typeof (val) === 'undefined' || val === null);
};

gUtil.isEmpty = function(val) {
	return (gUtil.isNull(val) || typeof (val) !== 'string' || val.length < 1);
};

gUtil.createNumberStringLeaZeros = function(numZeros, number) {
	var returnVal = "";

	for ( var i = 0; i < numZeros; ++i) {
		returnVal += "0";
	}

	returnVal += number;
	return returnVal;
};

/**
 * INFLUX SUPPORT
 */
gUtil.influxDatabaseService = function() {
	var self = this;

	/**
	 * Construct Influx Query for all hosts that have our aggregation-cpu-sum
	 * and thus probably configured to go with trueview.
	 */
	self.constructAllDatabasesQuery = function(influxServerUrl) {

		var query = "show databases";
		var queryUrl = "http://" + influxServerUrl + ":8086/query?db=&q="
				+ gUtil.extendedEncodeURIComponent(query);
		return queryUrl;
	};

	/**
	 * Construct Influx Query for all hosts that have our aggregation-cpu-sum
	 * and thus probably configured to go with trueview.
	 */
	self.constructAllValidHostsQuery = function(influxServerUrl, influx_db) {

		var query = "show series from \"cpu_value\" where host!='' and type_instance='system'";
		var queryUrl = "http://" + influxServerUrl + ":8086/query?db="
				+ influx_db + "&q=" + gUtil.extendedEncodeURIComponent(query);
		return queryUrl;
	};

	/**
	 * Construct Influx Query for all metrics in the DB
	 */
	self.constructAllMetricsQuery = function(influxServerUrl, influx_db) {

		var query = "show series where host != ''";
		var queryUrl = "http://" + influxServerUrl + ":8086/query?db="
				+ influx_db + "&q=" + gUtil.extendedEncodeURIComponent(query);
		return queryUrl;
	};

	/**
	 * Construce Influx Query
	 */
	self.constructHostMetricsQuery = function(influxServerUrl, host, influx_db) {

		var query = "show series where host='" + host + "' ";
		var queryUrl = "http://" + influxServerUrl + ":8086/query?db="
				+ influx_db + "&q=" + gUtil.extendedEncodeURIComponent(query);

		return queryUrl;
	};

	/**
	 * Construce Influx Query
	 */
	self.constructMetricInstancesQuery = function(influxServerUrl, host,
			metric, influx_db) {
		var metrics = metric.split("/");
		var query = "show series from " + metrics[0] + " " + "where host='"
				+ host + "' ";

		if (metrics.length > 1) {
			query += "and " + "type='" + metrics[1] + "' ";

		}

		if (metrics.length > 2) {
			query += "and " + "type_instance='" + metrics[2] + "' ";

		}

		var queryUrl = "http://" + influxServerUrl + ":8086/query?db="
				+ influx_db + "&q=" + gUtil.extendedEncodeURIComponent(query);

		return queryUrl;
	};

	/**
	 * Path should look like: DBNAme metric ValueColumn
	 * telegraf://cpu/percentBytes
	 * 
	 * DBName Metric Type ValueCoumn graphite://cpu-0/percent-system/value
	 * 
	 * DBName Metric Type TypeInst Int ValueColumn
	 * collectd://cpu/percent/system/0/value
	 * 
	 * 
	 * Constructs series value query for a host given a specific metric
	 */
	self.constructQuery = function(influxServerUrl, host, metric, limit,
			startDate, functionAverage, groupBy, bigN, bigS) {
		var metricSplit = metric.split("//");
		var dataSourcePortion = metricSplit[0];
		var dataSourcePortionSplit = dataSourcePortion.split(":");
		var influx_db = dataSourcePortionSplit[0];
		var valueColumn = dataSourcePortionSplit[1];

		var metrics = metricSplit[1].split("/");
		var anyAdded = false;
		var haveWhere = (metrics.length > 1 || (typeof (host) !== "undefined" && host !== "")) ? true
				: false;

		/*
		 * var query = (typeof (functionAverage) === "undefined" ||
		 * functionAverage === "") ? 'select * from "' + metrics[0] + '" where ' :
		 * 'select ' + functionAverage + '(value) from "' + metrics[0] + '"
		 * where ';
		 */
		var query = "";

		if (typeof (functionAverage) === "undefined" || functionAverage === "") {
			query = 'select ' + valueColumn + ' as value, host, * from /' + metrics[0]
					+ '.*/ ' + ((haveWhere === true) ? ' where ' : ' ');
		} else if (functionAverage === 'HOLT_WINTERS'
				|| functionAverage === 'HOLT_WINTERS_WITH_FIT') {
			query = 'select ' + functionAverage + '(first(' + valueColumn
					+ '), ' + bigN + ',' + bigS + ') as value from /'
					+ metrics[0] + '.*/ '
					+ ((haveWhere === true) ? ' where ' : ' ');
		} else {
			query = 'select ' + functionAverage + '(' + valueColumn
					+ ')  as value from /' + metrics[0] + '.*/'
					+ ((haveWhere === true) ? ' where ' : ' ');
		}

		if (typeof (host) !== 'undefined' && host.length > 0) {
			query += "host='" + host + "' "

			if (metrics.length > 1) {
				query += "and " + "type='" + metrics[1] + "' ";
			}

			anyAdded = true;
		} else {
			if (metrics.length > 1) {
				query += "type='" + metrics[1] + "' ";
				anyAdded = true;
			}
		}

		if (metrics.length > 2) {
			query += "and " + "type_instance='" + metrics[2] + "' ";

		}

		if (metrics.length > 3) {
			query += "and " + "instance='" + metrics[3] + "' ";

		}

		var evaludationUseDate = (startDate !== null
				&& typeof (startDate) !== 'undefined' && startDate instanceof (Date)) ? true
				: false;

		if (evaludationUseDate === true) {
			if (haveWhere === true) {
				query += "and time > " + startDate.getTime() + "ms ";
			} else {
				query += "where time > " + startDate.getTime() + "ms ";
			}
		} else {
			if (haveWhere === true) {
				query += "and time > now() - 2w ";
			} else {
				query += "where time > now() - 2w ";
			}
		}	
		
		
		if (typeof (groupBy) !== "undefined" && groupBy !== "" 
				&& typeof (functionAverage) !== "undefined"
				&& functionAverage !== "") {
			query += "GROUP BY time(" + groupBy + ") ";
		} 

		query += "ORDER BY time DESC LIMIT " + limit;
		
		console.log("query=", query);

		var queryUrl = "http://" + influxServerUrl + ":8086/query?db="
				+ influx_db + "&q=" + gUtil.extendedEncodeURIComponent(query);

		return queryUrl;
	};

	/**
	 * Get the metrics for a given host on an influxDB successFunction( results );
	 * where.. Results is a string [] of names for each mountpoint the host has
	 * in the given influxdb database
	 */
	self.getMetricInstances = function(influxServerUrl, host, metric,
			influx_db, successFunction) {

		var queryUrl = self.constructMetricInstancesQuery(influxServerUrl,
				host, metric, influx_db);

		$.ajax({
			url : queryUrl,
			async : false,
			error : function(response) {
				successFunction([]);
			},
			success : function(response) {

				var results = [];

				if (typeof (response.results) !== 'undefined'
						&& response.results.length > 0
						&& typeof (response.results[0].series) !== 'undefined'
						&& response.results[0].series.length > 0) {

					response.results[0].series[0].values.forEach(function(
							iterValue) {
						var resultSet = iterValue[0].split(",");

						for ( var i = 0; i < resultSet.length; ++i) {
							var value = resultSet[i];

							if (value.startsWith("instance=") === true) {
								results.push(value.split("instance=")[1]);
							}
						}
					});
				}
				successFunction(results);

			}
		});

	};

	/**
	 * Get the metrics for a given host on an influxDB successFunction( response );
	 */
	self.getAllMetrics = function(influxServerUrl, influx_db, host,
			successFunction, async) {

		if (typeof (async) === "undefined") {
			async = false;
		}

		var queryUrl = (typeof (host) === 'undefined' || host === null || host === "") ? self
				.constructAllMetricsQuery(influxServerUrl, influx_db)
				: self.constructHostMetricsQuery(influxServerUrl, host,
						influx_db);

		$
				.ajax({
					url : queryUrl,
					async : async,
					error : function(response) {
						successFunction([]);
					},
					success : function(response) {

						var results = [];
						var map = new Map();

						if (typeof (response.results) !== 'undefined'
								&& response.results.length > 0
								&& typeof (response.results[0].series) !== 'undefined'
								&& response.results[0].series.length > 0) {

							response.results[0].series[0].values
									.forEach(function(valueIterVal) {
										var resultSet = valueIterVal[0]
												.split(",");
										var resultFields = {
											name : "",
											type : "",
											type_instance : "",
											instance : ""
										};

										for ( var i = 0; i < resultSet.length; ++i) {
											var value = resultSet[i];

											if (i == 0) {
												resultFields.name = value;
											} else if (value
													.startsWith("type=") === true) {
												resultFields.type = value
														.split("type=")[1];
											} else if (value
													.startsWith("type_instance=") === true) {
												resultFields.type_instance = value
														.split("type_instance=")[1];
											} else if (value
													.startsWith("instance=") === true) {
												resultFields.instance = value
														.split("instance=")[1];
											}
										}

										var path = resultFields.name;

										if (resultFields.type !== "") {
											path += "/" + resultFields.type;
										}

										if (resultFields.type_instance !== "") {
											path += "/"
													+ resultFields.type_instance;
										}

										if (resultFields.instance !== "") {
											path += "/" + resultFields.instance;
										}

										if (map.has(path) === false) {
											map.set(path, true);
											results.push(path);
										}
									});

						}

						console.log("found metrics", results);
						successFunction(results);

					}
				});

	};

	/**
	 * Get the metrics for a given host on an influxDB successFunction( response );
	 */
	self.getAllHosts = function(influxServerUrl, influx_db, successFunction,
			async) {

		if (typeof (async) === "undefined") {
			async = false;
		}

		var queryUrl = self
				.constructAllMetricsQuery(influxServerUrl, influx_db);

		$.ajax({
			url : queryUrl,
			async : async,
			error : function(response) {
				successFunction([]);
			},
			success : function(response) {

				var results = [];
				var map = new Map();

				if (typeof (response.results) !== 'undefined'
						&& response.results.length > 0
						&& typeof (response.results[0].series) !== 'undefined'
						&& response.results[0].series.length > 0) {

					response.results[0].series[0].values.forEach(function(
							valueIterVal) {
						var resultSet = valueIterVal[0].split(",");
						var host = "";

						for ( var i = 0; i < resultSet.length; ++i) {
							var value = resultSet[i];

							if (value.startsWith("host=") === true) {
								host = value.split("host=")[1];
							}
						}

						if (map.has(host) === false && "" !== host) {
							map.set(host, true);
							results.push(host);
						}
					});

				}

				console.log("found hosts", results);
				successFunction(results);

			}
		});

	};

	/**
	 * Get the metrics for a given host on an influxDB successFunction( response );
	 */
	self.getAllDatabases = function(influxServerUrl, successFunction, async) {

		if (typeof (async) === "undefined") {
			async = false;
		}

		var queryUrl = self.constructAllDatabasesQuery(influxServerUrl);

		$.ajax({
			url : queryUrl,
			async : async,
			error : function(response) {
				successFunction([]);
			},
			success : function(response) {

				var results = [];
				var map = new Map();

				if (typeof (response.results) !== 'undefined'
						&& response.results.length > 0
						&& typeof (response.results[0].series) !== 'undefined'
						&& response.results[0].series.length > 0) {

					response.results[0].series[0].values.forEach(function(
							valueIterVal) {
						if (valueIterVal[0] !== "_internal") {
							results.push(valueIterVal[0]);
						}
					});

				}

				console.log("found databases", results);
				successFunction(results);

			}
		});

	};

	/**
	 * For a given influxdb/host.. Get the metrics data responses Metrics
	 * parameter is a json array ["cpu/cpu_value/user", "cpu/cpu_value/system"]
	 * successFunction( response );
	 */
	self.updateInfluxGraph = function(influxServerUrl, chartId, host, metrics,
			successFunction, limit, startDate, functionAverage, groupBy, bigN,
			bigS) {

		var metricList = JSON.parse(metrics);
		var dataCollection = [];

		for ( var i = 0; i < metricList.length; ++i) {

			var metric = metricList[i];
			var queryUrl = self.constructQuery(influxServerUrl, host, metric,
					limit, startDate, functionAverage, groupBy, bigN, bigS);

			var functionPtr = new function() {

				var me = this;

				me.myMetric = (typeof (functionAverage) === "undefined" || functionAverage === "") ? metric
						: functionAverage + "(" + metric + ")";
				me.myHost = host;
				me.myChartId = chartId;
				me.metricsLength = metricList.length;
				me.functionAverage = functionAverage;

				me.responseFunction = function(response) {
					var newDataItem = {};

					$.extend(newDataItem, response);
					newDataItem.host = me.myHost;
					newDataItem.metric = me.myMetric;
					newDataItem.chartId = me.myChartId;

					dataCollection.push(newDataItem);

					if (dataCollection.length == me.metricsLength) {
						successFunction(dataCollection);
					}
				};
			};

			$.ajax({
				url : queryUrl,
				async : true,
				timeout : 300000,
				success : functionPtr.responseFunction
			});

		}
	};

	/**
	 * For a given influxdb/host.. Get the metrics data responses Metrics
	 * parameter is a json array ["cpu/cpu_value/user", "cpu/cpu_value/system"]
	 * successFunction( response );
	 */
	self.updateInfluxGraphStaticJson = function(staticJsonUrl, chartId,
			metrics, successFunction) {

		$.ajax({
			url : staticJsonUrl,
			async : true,
			timeout : 300000,
			success : function(results) {
				var metricList = JSON.parse(metrics);
				var dataCollection = [];

				for ( var i = 0; i < metricList.length; ++i) {

					var metricSplits = metricList[i].split(":");

					var metricName = metricSplits[0];
					var metricIndex = parseInt(metricSplits[1]);
					var newDataItem = {};

					$.extend(newDataItem, results[metricIndex]);
					newDataItem.metric = metricName;
					newDataItem.chartId = chartId;
					newDataItem.metricIndex = metricIndex;

					dataCollection.push(newDataItem);

				}

				successFunction(dataCollection);
			}
		});

	};

	self.getDataFromInfluxResponse = function(response) {

		var data = [];

		if (typeof (response) !== 'undefined' && response !== null
				&& typeof (response.results) !== "undefined"
				&& response.results !== null) {

			response.results.forEach(function(result) {
				if (typeof (result.series) !== 'undefined'
						&& result.series !== null) {
					result.series.forEach(function(series) {
						if (typeof (series.values) !== 'undefined'
								&& series.values !== null) {

							series.values.forEach(function(values) {
								var time = values[0];
								var value = values[values.length - 1];

								var date = new Date(time);
								var dateTime = date.toLocaleTimeString() + " "
										+ date.toLocaleDateString();
								data.push({
									xVal : dateTime,
									yVal : value,
									time : date
								});
							});
						}
					});
				}
			});
		}

		return data;

	};

	self.getAllHostMetricsAsMaps = function(influxserver, influx_db, host) {
		var pluginReturnData = {
			pluginsMap : new Map(),
			plugins : []
		};
		var myResults = [];

		self.getAllMetrics(influxserver, influx_db, host, function(results) {

			if (typeof (results) !== "undefined") {
				myResults = results;
			}
		}, false);

		myResults.forEach(function(metricPath) {
			var pathEntries = metricPath.split("/");

			var seriesName = (pathEntries.length > 0) ? pathEntries[0] : "";
			var type = (pathEntries.length > 1) ? pathEntries[1] : "";
			var type_instance = (pathEntries.length > 2) ? pathEntries[2] : "";
			var instance = (pathEntries.length > 3) ? pathEntries[3] : "";

			if (pluginReturnData.pluginsMap.has(seriesName) === false) {
				var data = {
					pluginName : seriesName,
					typesMap : new Map(),
					types : []
				};

				pluginReturnData.pluginsMap.set(seriesName, data);
				pluginReturnData.plugins.push(data);

			}

			if (type === "") {
				return;
			}

			var pluginData = pluginReturnData.pluginsMap.get(seriesName);

			if (pluginData.typesMap.has(type) === false) {
				var data = {
					typeName : type,
					seriesPlugin : pluginData,
					typeInstancesMap : new Map(),
					typeInstances : []
				};

				pluginData.typesMap.set(type, data);
				pluginData.types.push(data);
			}

			if (type_instance === "") {
				return;
			}

			var typeData = pluginData.typesMap.get(type);

			if (typeData.typeInstancesMap.has(type_instance) === false) {
				var data = {
					typeInstanceName : type_instance,
					type : typeData,
					instancesMap : new Map(),
					instances : []
				};

				typeData.typeInstancesMap.set(type_instance, data);
				typeData.typeInstances.push(data);
			}

			if (instance === "") {
				return

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																				

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																								

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																				

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																												

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																				

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																								

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																				

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																																

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																				

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																								

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																				

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																												

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																				

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																								

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

																				

				

								

				

												

				

								

				

																

				

								

				

												

				

								

				

			}

			var typeInstance = typeData.typeInstancesMap.get(type_instance);
			typeInstance.instances.push({
				instanceName : instance,
				typeInstance : typeInstance
			});

		});

		return pluginReturnData;
	};

};

gUtil.gInfluxDatabaseService = new gUtil.influxDatabaseService();

/**
 * ELASTIC SUPPORT
 */
gUtil.elasticService = function() {
	var self = this;

	self.construceAllLogsQuery = function(begIndex, indexName, batchSize) {
		var date = new Date();
		console.log("elastic query to indexName:", indexName);

		var query = {
			"from" : begIndex,
			"size" : batchSize,
			"index" : indexName,
			"filter" : [],
			"query" : {
				"query_string" : {
					"query" : "*",
					"analyze_wildcard" : true
				}
			}
		};

		console.log("query:" + JSON.stringify(query));

		return query;
	};

	/**
	 * indexName - Name of the index. Examnple. 'filebeat-*' begIndex - Begining
	 * index bartchSizie - Max limit return size responseFunction - handler to
	 * get return response in success case function( response ) is the form.
	 * responseErrorFunction - Error handler method function(error) - Not
	 * required uses default to browser console.error
	 */
	self.getAllLogs = function(elasticSearchServer, indexName, begIndex,
			batchSize, responseFunction, responseErrorFunction) {

		var client = new $.es.Client({
			hosts : elasticSearchServer + ":9200"
		});

		var query = self.construceAllLogsQuery(begIndex, indexName, batchSize);

		if (typeof (responseErrorFunction) === "undefined"
				|| responseErrorFunction === null) {
			responseErrorFunction = function(error) {
				console.error("Error:", error);
			};
		}
		client.search(query).then(responseFunction, responseErrorFunction);
	};

	/**
	 * indexName - Name of the index. Examnple. 'filebeat-*' begIndex - Begining
	 * index bartchSizie - Max limit return size responseFunction - handler to
	 * get return response in success case function( response ) is the form.
	 */
	self.getAllIndices = function(elasticSearchServer, responseFunction) {

		var client = new $.es.Client({
			hosts : elasticSearchServer + ":9200"
		});

		client.cat.indices("v", function(r, q) {
			if (typeof (q) !== "undefined") {
				var array = q.split("\n");
				var responseItems = [];
				var map = new Map();
				if (typeof (array) !== "undefined" && array.length > 0) {
					array.forEach(function(row) {
						var foundIndexName = "";

						var indexCount = 0;

						var columns = row.split(" ");
						columns.forEach(function(column) {
							if (column.length > 0) {
								indexCount++;

								if (indexCount === 3 && foundIndexName === "") {
									foundIndexName = column;
								}
							}

						});

						if (typeof (foundIndexName) !== "undefined"
								&& foundIndexName !== ""
								&& map.has(foundIndexName) === false) {
							map.set(foundIndexName, true);
							responseItems.push(foundIndexName);
						}

					});

					responseItems = responseItems.sort();
					console.log("found indices:", responseItems);
					responseFunction({
						items : responseItems
					});
				} else {
					responseFunction({
						items : []
					});
				}

			} else {
				responseFunction({
					items : []
				});
			}
		});
	};

	self.getDataFromInfluxResponse = function(response) {

		var data = [];

		if (typeof (response) !== 'undefined' && response !== null
				&& typeof (response.hits) !== "undefined"
				&& response.hits !== null) {

			response.hits.hits.forEach(function(result) {

				data.push(result);

			});
		}

		return data;

	};

};

gUtil.gElasticService = new gUtil.elasticService();


gUtil.extendedEncodeURIComponent = function(str) {
	return encodeURIComponent(str).replace(/\-/g, "%2D").replace(/\_/g, "%5F")
			.replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E")
			.replace(/\"/g, "%27").replace(/\'/g, "%27").replace(/\(/g, "%28")
			.replace(/\)/g, "%29");
};



