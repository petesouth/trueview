/**
 * serviceChartViewController Controller
 */
monitcommandoMainModule.globalAppData.controllers.serviceElasticLogstashGridController = function(
		$scope, $routeParams, $location, $window, elasticSearchService) {
	

    $scope.viewchartId = "viewchartId";
    $scope.elasticUrl = $routeParams.ifdb;
    $scope.elasticIndexName = $routeParams.indexName;
    $scope.begIndex = $routeParams.begIndex;
    $scope.batchSize = $routeParams.batchSize;


    $scope.getChartInstance = function() {
        var chartId = '#' + $scope.viewchartId;
        var chart = $(chartId).jqxChart("getInstance");
        return chart;
    };
	
    $scope.loadGraphs = function(response) {
		
        var data = elasticSearchService.getDataFromInfluxResponse(response);
        console.log("elastic data:", data);

        var objectPathFields = gUtil.getAllFieldsInObjectAsPaths(data[0]);
        var dataFields = [];
        var dataColumns = [];

        objectPathFields.forEach(function (objectPathField) {
            var name = objectPathField.path.split(">").join("-");
            name = name.split("@").join("");

            dataFields.push({
                name: name,
                type: (objectPathField.path.endsWith("timestamp")) ? "date" :"string",
                    map: objectPathField.path
        });

        dataColumns.push({
            text: name,
            width: 100,
            datafield: name
        });
    });


    var source = {
        datatype: 'json',
        localdata: data,
        datafields: dataFields
    };
    var dataAdapter = new $.jqx.dataAdapter(source);


    var settings = {
        width: "100%",
        source: dataAdapter,
        selectionmode: 'multiplerowsextended',
        sortable: true,
        pageable: true,
        editable: true,
        pagesizeoptions: ['50'],
        pageSize: 50,
        pagerheight: 20,
        autoheight: true,
        autoloadstate: false,
        autosavestate: false,
        columnsresize: true,
        columnsreorder: true,
        showfilterrow: true,
        theme: 'dark',
        filterable: true,
        columns: dataColumns
    };


    // setup the chart
    var chartId = '#' + $scope.viewchartId;
    $(chartId).jqxGrid(settings);
    $(chartId).css('visibility', 'visible');
		
};


angular.element(document).ready(function() {
    elasticSearchService.getAllLogs($scope.elasticUrl, $scope.elasticIndexName, $scope.begIndex, $scope.batchSize, $scope.loadGraphs);
    $("body").css("padding-left", "0px");
    $("body").css("padding-right", "0px");
    $("body").css("margin-left", "0px");

});

};
