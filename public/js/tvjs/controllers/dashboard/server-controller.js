'use strict';

/**
 * @ngdoc function
 * @name DashboardServerController
 * @module dashboardServer
 * @kind function
 * 
 */
/**
 * 
 * ctrl.dashboardmap.forEach(function(value, key, map) { column.title =
 * column.title.replace(new RegExp('{{' + key + '}}', 'g'), value); column.url =
 * column.url.replace(new RegExp('{{' + key + '}}', 'g'), value); });
 */
angular
		.module('dashboardServer', [])
		.controller(
				'DashboardServerController',
				function($rootScope, $scope, $stateParams, Servers) {
					$scope.serverId = $stateParams.id;
					$scope.server = Servers.getServerSync($scope.serverId);
					$scope.influxserver = $rootScope.configInfo.influx;
					$scope.redrawMe = true;
					$scope.showInstances = false;
					$scope.dbName = "graphite";
					$scope.BY_SECOND = "BySecond";
					$scope.BY_MINUTE = "ByMinute";
					$scope.BY_HOUR = "ByHour";
					$scope.BY_DAY = "ByDay";
					$scope.BY_WEEK = "ByWeek";
					$scope.BY_MONTH = "ByMonth";

					$scope.presentGlobalStartDate = "";
					$scope.presentFunctionAggregation = "";
					$scope.presentGroupBy = "";

					console.log("$scope.server", $scope.server);

					$scope.dashboardMap = new Map();
					$scope.dashboardMap.set("hostname",
							$scope.server.system_serial);
					$scope.results = [];
					$scope.plugInSeriesNames = [];
					$scope.pluginData = gUtil.gInfluxDatabaseService
							.getAllHostMetricsAsMaps($scope.influxserver,
									$scope.dbName, $scope.server.system_serial);

					$scope.selectedPluginName = ($scope.pluginData.plugins.length > 0) ? $scope.pluginData.plugins[0].pluginName
							: "";
					
					$scope.selectDbName = function() {
						$scope.pluginData = gUtil.gInfluxDatabaseService
						.getAllHostMetricsAsMaps($scope.influxserver,
								$scope.dbName, $scope.server.system_serial);

						$scope.selectedPluginName = ($scope.pluginData.plugins.length > 0) ? $scope.pluginData.plugins[0].pluginName
													: "";
						$scope.selectedPluginChange();
					};
					

					/**
					 * Method $scope.selectedPluginChange
					 */
					$scope.selectedPluginChange = function() {
						$scope.redrawMe = false;

						
						setTimeout(function() {
							$scope.redrawMe = true;
							$scope
							.calculatePluginDashboard($scope.selectedPluginName);
						}, -1);

					};

					/**
					 * Kind of an irritating structure to enumerate.. So I wrote
					 * this as nod to the ole XSLT days.. This way.. I don't
					 * have to keep iterating this root.
					 * 
					 * pluginData (A Series/type/type_instance/instance based
					 * COllectd Schema Object Path Tree)
					 * 
					 * typeFunction(pluginData, type)
					 * typeInstanceFunction(pluginData, type, type_instance)
					 * instanceFunction(pluginData, type, type_instance,
					 * instance )
					 */
					$scope.enumeratePluginData = function(pluginData,
							typeFunction, typeInstanceFunction,
							instanceFunction) {

						// Basically.. Chunk through all the data and put it in
						// little buckets that make it easier
						// to layout the UI.
						if (typeof (pluginData.types) !== "undefined") {
							pluginData.types
									.forEach(function(type) {
										typeFunction(pluginData, type);

										if (typeof (type.typeInstances) !== "undefined") {
											type.typeInstances
													.forEach(function(
															typeInstance) {
														typeInstanceFunction(
																pluginData,
																type,
																typeInstance);

														if (typeof (typeInstance.instances) !== "undefined") {
															typeInstance.instances
																	.forEach(function(
																			instance) {
																		instanceFunction(
																				pluginData,
																				type,
																				typeInstance,
																				instance);
																	});
														}
													});
										}

									});

						}

					};

					/**
					 * $scope.calculatePluginDashboard(pluginName)
					 */
					$scope.calculatePluginDashboard = function(pluginName) {
						var pluginData = $scope.pluginData.pluginsMap
								.get(pluginName);

						var instanceChartListMap = new Map();

						var typesWithNoInstancesMap = new Map();

						var typesWithNoTypeInstancesMap = new Map();

						// Parse this data collect it into buckets.
						// Two buckets... A CHART SET is:
						// serries/type/type_instance (every one)
						// for each List of Instances
						//            
						// For Each Instance In a TYPE... Draw a
						// type/type_instance chart.. For that instance.
						// Damn.. My brain hurts.
						$scope
								.enumeratePluginData(
										pluginData,
										function(tPluginData, type) {
											console.log("type:", type.typeName);

											if (typeof (type.typeInstances) === "undefined"
													|| type.typeInstances.length < 1) {

												if (typesWithNoTypeInstancesMap
														.has(type.typeName) === false
														&& typesWithNoInstancesMap
																.has(type.typeName) === false) {
													typesWithNoTypeInstancesMap
															.set(type.typeName,
																	type);
												}

											} else if (typeof (type.typeInstances[0].instances) === "undefined"
													|| type.typeInstances[0].instances.length < 1) {

												if (typesWithNoTypeInstancesMap
														.has(type.typeName) === false
														&& typesWithNoInstancesMap
																.has(type.typeName) === false) {
													typesWithNoInstancesMap
															.set(type.typeName,
																	type);
												}
											}

										},
										function(tPluginData, type,
												type_instance) {

										},
										function(tPluginData, type,
												type_instance, instance) {

											if (instanceChartListMap
													.has(instance.instanceName) === false) {
												instanceChartListMap
														.set(
																instance.instanceName,
																{
																	instance : instance,
																	type : type
																});
											}

										});

						var currentSelectedDash = {
							rows : []
						};

						typesWithNoTypeInstancesMap
								.forEach(function(value, key, map) {
									console.log("MyNiggah:", value, key, map);

									var rowColumns = [];
									var type = value;
									var chartRootPath = $scope.dbName + ":value%2F%2F"
											+ pluginData.pluginName;

									var chartPath = "";

									chartPath = "%5B";
									var typeName = type.typeName;
									var path = '%22' + chartRootPath + "%2F"
											+ typeName + "%22";
									chartPath += path;
									chartPath += "%5D";

									var num = gUtil.randomNumber(1, 20);
									var scheme = (num < 10) ? "0" + num : ""
											+ num;

									rowColumns
											.push({
												title : type.typeName,
												flex_width : "100",
												chart_height : "300",
												url : "/monitcommando/index.html#/chartcontrol?host="
														+ $scope.server.system_serial
														+ "&dr=true&mvps=50&ps=1&fq=60000&mc="
														+ chartPath
														+ "&ifdb="
														+ $scope.influxserver
														+ "&shd=true&shl=true&rmb=1&rdb=1&schemeName=scheme"
														+ scheme
														+ "&x_title="
														+ type.typeName
														+ "&startDate="
														+ $scope.presentGlobalStartDate
														+ "&fa="
														+ $scope.presentFunctionAggregation
														+ "&chartType=splinearea&bigN=0&bigS=0"
														+ "&gb="
														+ $scope.presentGroupBy
											});

									if (rowColumns.length > 0) {
										currentSelectedDash.rows
												.push(rowColumns);
									}

								});

						typesWithNoInstancesMap
								.forEach(function(value, key, map) {
									console.log("MyNiggah:", value, key, map);

									var rowColumns = [];
									var type = value;
									var chartRootPath =  $scope.dbName + ":value%2F%2F"
											+ pluginData.pluginName;

									var chartPath = "";

									chartPath = "%5B";
									var typeName = type.typeName;
									var path = '%22' + chartRootPath + "%2F"
											+ typeName + "%22";
									chartPath += path;
									chartPath += "%5D";

									var num = gUtil.randomNumber(1, 20);
									var scheme = (num < 10) ? "0" + num : ""
											+ num;

									rowColumns
											.push({
												title : type.typeName,
												flex_width : "100",
												chart_height : "300",
												url : "/monitcommando/index.html#/chartcontrol?host="
														+ $scope.server.system_serial
														+ "&dr=true&mvps=50&ps=1&fq=60000&mc="
														+ chartPath
														+ "&ifdb="
														+ $scope.influxserver
														+ "&shd=true&shl=true&rmb=1&rdb=1&schemeName=scheme"
														+ scheme
														+ "&x_title="
														+ type.typeName
														+ "&startDate="
														+ $scope.presentGlobalStartDate
														+ "&fa="
														+ $scope.presentFunctionAggregation
														+ "&chartType=splinearea&bigN=0&bigS=0"
														+ "&gb="
														+ $scope.presentGroupBy
											});

									if (rowColumns.length > 0) {
										currentSelectedDash.rows
												.push(rowColumns);
									}

								});

						typesWithNoInstancesMap
								.forEach(function(value, key, map) {

									var rowColumns = [];
									var type = value;
									var chartRootPath = $scope.dbName + ":value%2F%2F"
											+ pluginData.pluginName;

									var meticPaths = [];
									var chartPath = "";

									chartPath = "%5B";
									var i = 0;
									var added = false;

									type.typeInstances
											.forEach(function(typeInstance) {
												var typeName = type.typeName;
												var typeInstanceName = typeInstance.typeInstanceName;
												if (typeof (typeInstanceName) === "undefined"
														|| typeInstanceName === "") {
													return;
												}

												var path = '%22'
														+ chartRootPath + "%2F"
														+ typeName + "%2F"
														+ typeInstanceName
														+ "%22";
												console.log("path=" + path);
												if (i < (type.typeInstances.length - 1)) {
													path += ",";
												}

												i += 1;
												added = true;
												chartPath += path;

											});

									chartPath += "%5D";

									if (added === true) {

										var num = gUtil.randomNumber(1, 20);
										var scheme = (num < 10) ? "0" + num
												: "" + num;

										rowColumns
												.push({
													title : type.typeName,
													flex_width : "100",
													chart_height : "300",
													url : "/monitcommando/index.html#/chartcontrol?host="
															+ $scope.server.system_serial
															+ "&dr=true&dr=true&mvps=50&ps=1&fq=60000&mc="
															+ chartPath
															+ "&ifdb="
															+ $scope.influxserver
															+ "&shd=true&shl=true&rmb=1&rdb=1&schemeName=scheme"
															+ scheme
															+ "&x_title="
															+ type.typeName
															+ "&startDate="
															+ $scope.presentGlobalStartDate
															+ "&fa="
															+ $scope.presentFunctionAggregation
															+ "chartType=splinearea&bigN=0&bigS=0"
															+ "&gb="
															+ $scope.presentGroupBy
												});
									}

									if (rowColumns.length > 0) {
										currentSelectedDash.rows
												.push(rowColumns);
									}

								});

						instanceChartListMap
								.forEach(function(value, key, map) {
									console.log("MyNiggah:", value, key, map);

									var rowColumns = [];
									var instance = value.instance;
									var type = value.type;

									var chartRootPath = $scope.dbName + ":value%2F%2F"
											+ pluginName
									var chartPath = "";

									if (typeof (type) !== "undefined"
											&& typeof (type.typeInstances) !== "undefined") {
										chartPath = "%5B";
										var i = 0;

										type.typeInstances
												.forEach(function(typeInstance) {
													var typeName = type.typeName;
													var typeInstanceName = typeInstance.typeInstanceName;
													var instanceName = instance.instanceName;
													var path = '%22'
															+ chartRootPath
															+ "%2F" + typeName
															+ "%2F"
															+ typeInstanceName
															+ "%2F"
															+ instanceName
															+ '%22';
													console.log("path=" + path);
													if (i < (type.typeInstances.length - 1)) {
														path += ","
													}

													i += 1;
													chartPath += path;

												});

										chartPath += "%5D";

									}

									var num = gUtil.randomNumber(1, 20);
									var scheme = (num < 10) ? "0" + num : ""
											+ num;

									rowColumns
											.push({
												title : type.typeName + " - "
														+ instance.instanceName,
												flex_width : "100",
												chart_height : "300",
												url : "/monitcommando/index.html#/chartcontrol?host="
														+ $scope.server.system_serial
														+ "&dr=true&mvps=50&ps=1&fq=60000&mc="
														+ chartPath
														+ "&ifdb="
														+ $scope.influxserver
														+ "&shd=true&shl=true&rmb=1&rdb=1&schemeName=scheme"
														+ scheme
														+ "&x_title="
														+ type.typeName
														+ "&startDate="
														+ $scope.presentGlobalStartDate
														+ "&fa="
														+ $scope.presentFunctionAggregation
														+ "&chartType=splinearea&bigN=0&bigS=0"
														+ "&gb="
														+ $scope.presentGroupBy
											});

									if (rowColumns.length > 0) {
										currentSelectedDash.rows
												.push(rowColumns);
									}

								});

						console.log("Created currentSelectedDash",
								currentSelectedDash);

						$scope.currentSelectedDash = currentSelectedDash;
						$scope.totalItems = $scope.currentSelectedDash.rows.length;

						var begin = (($scope.currentPage - 1) * $scope.numPerPage);
						var end = begin + $scope.numPerPage;

						$scope.currentSelectedDashPagination = {
							rows : $scope.currentSelectedDash.rows.slice(begin,
									end)
						};
					};

					/*
					 * 
					 * $scope.BY_SECOND = "BySecond"; $scope.BY_MINUTE =
					 * "ByMinute"; $scope.BY_HOUR = "ByHour"; $scope.BY_DAY =
					 * "ByDay"; $scope.BY_WEEK = "ByWeek"; $scope.BY_MONTH =
					 * "ByMonth";
					 * 
					 * 
					 * $scope.presentGlobalStartDate = "";
					 * $scope.presentFunctionAggregation = "";
					 * 
					 * 
					 */

					$scope.changeGroupBy = function($event, globalSummaryType) {
						$scope.presentFunctionAggregation = "";
						$scope.presentGlobalStartDate = "";
						$scope.presentGroupBy = "";

						if (globalSummaryType !== $scope.BY_SECOND) {
							$scope.presentFunctionAggregation = "MEAN";
						}

						var minuteMilli = 60000;
						var hourMilli = 60 * minuteMilli;
						var dayMilli = 24 * hourMilli;
						var weekMilli = 7 * dayMilli;
						var monthMilli = 4 * weekMilli;

						if (globalSummaryType === $scope.BY_MINUTE) {
							$scope.presentGlobalStartDate = ""
									+ ((new Date().getTime()) - hourMilli);
							$scope.presentGroupBy = "1m";
						} else if (globalSummaryType === $scope.BY_HOUR) {
							$scope.presentGlobalStartDate = ""
									+ ((new Date().getTime()) - dayMilli);
							$scope.presentGroupBy = "1h";
						} else if (globalSummaryType === $scope.BY_DAY) {
							$scope.presentGlobalStartDate = ""
									+ ((new Date().getTime()) - weekMilli);
							$scope.presentGroupBy = "1d";
						} else if (globalSummaryType === $scope.BY_WEEK) {
							$scope.presentGlobalStartDate = ""
									+ ((new Date().getTime()) - monthMilli);
							$scope.presentGroupBy = "1w";
						} else if (globalSummaryType === $scope.BY_MONTH) {
							$scope.presentGlobalStartDate = ""
									+ ((new Date().getTime()) - (12 * monthMilli));
							$scope.presentGroupBy = "4w";
						}

						$scope.selectedPluginChange();
						$event.stopPropagation();
					};

					/*
					 * pagination
					 */
					$scope.numPerPage = 5;
					$scope.currentPage = 1;

					$scope.init = function() {

						if (typeof ($scope.selectedPluginName) !== "undefined") {
							try {
								$scope
										.calculatePluginDashboard($scope.selectedPluginName);

							} catch (error) {
								console
										.error(
												"Error occured during $scope.calculatePluginDashboard:",
												error);
							}

						}

					};

					$scope.init();

				});
