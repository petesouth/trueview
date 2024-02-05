'use strict';

/**
 * @ngdoc function
 * @name DashboardServerController
 * @module dashboardServer
 * @kind function;
 * 
 */
function systemlistController($rootScope, $scope, $location, $sce) {
	var ctrl = this;

	if (typeof (ctrl.servers) === "undefined") {
		ctrl.servers = [];
	}

	var activedServers = [];
	ctrl.filteredServers = [];

	ctrl.servers
			.forEach(function(item) {
				if (item.registered === 1) {
					activedServers.push(item);
					item.trustedLoadSparkline = $sce
							.trustAsResourceUrl("/monitcommando/index.html#/sparklinecontrol?host=&mvps=10&ps=1&fq=4000&mc=%5B%22shortterm:0%22,%22midterm:1%22,%22longterm:2%22%5D&sju=%2Fjson_repo%2F"
									+ item.system_serial
									+ "_overview_load_chart.json&rmb=1&rdb=1&schemeName=scheme01&startDate=&gb=1s&fa=&chartType=column&bigN=0&bigS=0");
					item.trustedThroughput = $sce
							.trustAsResourceUrl("/monitcommando/index.html#/sparklinecontrol?host=&dr=true&mvps=10&ps=1&fq=4000&mc=%5B%22TX%20if_packets:2%22%5D&sju=%2Fjson_repo%2F"
									+ item.system_serial
									+ "_overview_tx_rx_chart.json&shd=false&shl=true&rmb=1&rdb=1000000&schemeName=scheme11&startDate=&gb=1s&fa=&chartType=column&bigN=0&bigS=0&x_title=");
					item.trustedLatency = $sce
							.trustAsResourceUrl("/monitcommando/index.html#/sparklinecontrol?host=&dr=true&mvps=10&ps=1&fq=4000&mc=%5B%22w_disk_ops:4%22%5D&sju=%2Fjson_repo%2F"
									+ item.system_serial
									+ "_overview_disk_read_write_chart.json&shl=true&shd=false&rmb=1&rdb=1&schemeName=scheme08&startDate=&gb=1s&fa=&chartType=column&bigN=0&bigS=0&x_title=");
					item.trustedCapacitySparkline = $sce
							.trustAsResourceUrl("/monitcommando/index.html#/fullpiechartcontrol?host=&dr=true&dr=true&mvps=50&ps=1&fq=4000&mc=%5B%22bytes-used:0%22%5D&sju=%2Fjson_repo%2F"
									+ item.system_serial
									+ "_overview2_storage_gauge.json&shd=true&shl=true&rmb=1&rdb=1&schemeName=scheme01&startDate=&gb=1s&fa=&chartType=stackedsplinearea&bigN=0&bigS=0&x_title=&total=34G");
					item.trustedCpuSparkline = $sce
							.trustAsResourceUrl("/monitcommando/index.html#/fullpiechartcontrol?host=&dr=true&mvps=1&ps=1&fq=4000&mc=%5B%22usage_system:0%22%5D&sju=%2Fjson_repo%2F"
									+ item.system_serial
									+ "_overview2_cpu_gauge.json&shl=true&shd=true&rmb=1&rdb=1&schemeName=scheme01&startDate=&gb=1s&fa=&chartType=splinearea&bigN=0&bigS=0&x_title=");
					item.trustedMemorySparkline = $sce
							.trustAsResourceUrl("/monitcommando/index.html#/fullpiechartcontrol?host=&dr=true&mvps=1&ps=1&fq=4000&mc=%5B%22used_percent:0%22%5D&sju=%2Fjson_repo%2F"
									+ item.system_serial
									+ "_overview2_memory_gauge.json&shl=true&shd=true&rmb=1&rdb=10&schemeName=scheme12&startDate=&gb=1s&fa=&chartType=column&bigN=0&bigS=0&x_title=");

				}
			});

	ctrl.servers = activedServers;
	ctrl.totalItems = ctrl.servers.length;

	/*
	 * pagination
	 */
	ctrl.numPerPage = 4;
	ctrl.currentPage = 1;

	ctrl.changePagination = function() {
		var begin = ((ctrl.currentPage - 1) * ctrl.numPerPage);
		var end = begin + ctrl.numPerPage;

		ctrl.filteredServers = ctrl.servers.slice(begin, end);

		if (typeof (ctrl.filteredServers) !== "undefined") {
			ctrl.filteredServers.forEach(function(server) {

				setTimeout(function() {
					$("#" + server.id + "_Load").attr("src",
							server.trustedLoadSparkline);
				}, 0);

				setTimeout(function() {
					$("#" + server.id + "_Capacity").attr("src",
							server.trustedCapacitySparkline);
				}, 0);

				setTimeout(function() {
					$("#" + server.id + "_Throughput").attr("src",
							server.trustedThroughput);
				}, 0);

				setTimeout(function() {
					$("#" + server.id + "_Latency").attr("src",
							server.trustedLatency);
				}, 0);

				setTimeout(function() {
					$("#" + server.id + "_Cpu").attr("src",
							server.trustedCpuSparkline);
				}, 0);

				setTimeout(function() {
					$("#" + server.id + "_Memory").attr("src",
							server.trustedMemorySparkline);
				}, 0);
			});

		}

	};

	/*
	 * go to single server dashboard
	 */
	ctrl.go = function(server, $event) {
		var path = '/dashboard/overview/server/' + server.id;
		$location.path(path);
		$event.stopPropagation();
	};

	/*
	 * click card go to detail page
	 */
	ctrl.clickcard = function(type) {
		console.log("click card!!");
		ctrl.type = type;
		var path = '/dashboard/overview/details/' + type;
		$location.path(path);
	};

	ctrl.changePagination();

}

var systemlistComponentSettings = {

	// isolated scope binding
	bindings : {
		servers : '=' // list of servers t render
	},

	// Inline template which is binded to message variable
	// in the component controller
	templateUrl : 'trueview/components/dash/systemlist-component.html',

	// The controller that handles our component logic
	controller : systemlistController
};