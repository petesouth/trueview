

monitcommandoMainModule.globalAppData.routes = function($routeProvider, $locationProvider) { 
	$routeProvider.when('/main', {
		controller: "serviceMainController",
		templateUrl: "html/views/monitcommandoMain/main.html"
	}).when('/chartcontrol', {
		controller: "serviceChartViewController",
		templateUrl: "html/views/monitcommandoMain/viewChart.html"
	}).when('/c3chartcontrol', {
		controller: "serviceC3ChartViewController",
	templateUrl: "html/views/monitcommandoMain/viewC3Chart.html"
	}).when('/sparklinecontrol', {
		controller: "serviceSparklineViewController",
		templateUrl: "html/views/monitcommandoMain/viewSparkline.html"
	}).when('/partialpiechartcontrol', {
		controller: "servicePartialPieChartViewController",
		templateUrl: "html/views/monitcommandoMain/viewPartialPieChart.html"
	}).when('/bargaugechartcontrol', {
		controller: "serviceBarGaugeChartViewController",
		templateUrl: "html/views/monitcommandoMain/viewBarGaugeChart.html"
	}).when('/textpanel', {
		controller: "serviceTextViewController",
		templateUrl: "html/views/monitcommandoMain/viewTextPanel.html"
	}).when('/fullpiechartcontrol', {
		controller: "serviceFullPieChartViewController",
		templateUrl: "html/views/monitcommandoMain/viewFullPieChart.html"
	}).when('/elasticlogstashgridpanel', {
	    controller: "serviceElasticLogstashGridController",
	    templateUrl: "html/views/monitcommandoMain/viewElasticLogstashGridDash.html"
	}).otherwise({ redirectTo: '/main' });


	
	
}
