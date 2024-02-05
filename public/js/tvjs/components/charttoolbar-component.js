'use strict';

/**
 * @ngdoc function
 * @name DashboardServerController
 * @module dashboardServer
 * @kind function;
 *
 */
function chartToolbarController() {
    var ctrl = this;

    var RAW = "RAW";
    ctrl.showHolts = false;
    ctrl.funtionSelect = "RAW";
    
    ctrl.chartTypes = ["splinearea", "stackedsplinearea", "spline", "column", "stackedcolumn", "stackedspline", "line", "area"];

    ctrl.groupBys = [{ name: "s", label: "seconds" },
                     { name: "m", label: "minutes" },
                     { name: "h", label: "hours" },
                     { name: "d", label: "days" },
                     { name: "w", label: "weeks" }];


    ctrl.functionAverages = [RAW,
                               "COUNT",
                               "FIRST",
                               "CUMULATIVE_SUM",
                               "HOLT_WINTERS",
                               "HOLT_WINTERS_WITH_FIT",
                               "LAST",
                               "MEAN",
	                           "MIN",
	                           "MAX",
	                           "STDDEV"];
    
    ctrl.startPollingChart = function ($event, id) {
        $event.stopPropagation();
        $("#" + id)[0].contentWindow.startPolling_Chart(5000);

        $("#" + id + "_start_button").prop("disabled", true);
        $("#" + id + "_stop_button").prop("disabled", false);

    };

    ctrl.stopPollingChart = function ($event, id) {
        $event.stopPropagation();
        $("#" + id)[0].contentWindow.stopPolling_Chart();

        $("#" + id + "_start_button").prop("disabled", false);
        $("#" + id + "_stop_button").prop("disabled", true);

    };

    ctrl.stopPropagation = function ($event, id) {
        $event.stopPropagation();
    };



    ctrl.repaintMeWithDate = function ($event, id, dateInputId, functionAverageId, groupById, groupByNumberId, chartTypeId, numberOfPredictedValuesId, seasonalPatternId, batchSizeId) {
        $event.stopPropagation();

        var theFrame = $('#' + id)[0];
        var source = theFrame.src;

        var array = source.split("&startDate=");
        source = array[0];

        var dateValue = $("#" + dateInputId).val();
        var functionAverage = $("#" + functionAverageId + " :selected").val();
        var chartType = $("#" + chartTypeId + " :selected").val();
        var groupBy = $("#" + groupById + " :selected").val();
        var groupByNumber = $("#" + groupByNumberId).val();
        var numberOfPredictedValues = $("#" + numberOfPredictedValuesId).val();
        var seasonalPattern = $("#" + seasonalPatternId).val();
        var batchSize = $("#" + batchSizeId).val();

        if (RAW === functionAverage) {
            functionAverage = "";
        }
        console.log("dateValue=" + dateValue);
        console.log("functionAverage=" + functionAverage);
        console.log("groupBy=" + groupBy);

        if (typeof (dateValue) !== "undefined" && dateValue !== "") {
            source += "&startDate=" + new Date(dateValue).getTime();
        } else {
            source += "&startDate=";
        }

        if (typeof (functionAverage) !== "undefined" && functionAverage !== "") {
            source += "&fa=" + functionAverage;
        } else {
            source += "&fa=";
        }

        if (typeof (groupBy) !== "undefined" && groupBy !== "") {
            source += "&gb=" + groupByNumber + groupBy;
        } else {
            source += "&gb=";
        }

        if (typeof (chartType) !== "undefined" && chartType !== "") {
            source += "&chartType=" + chartType;
        } else {
            source += "&chartType=";
        }

        if (typeof (numberOfPredictedValues) !== "undefined" && numberOfPredictedValues !== "") {
            source += "&bigN=" + numberOfPredictedValues;
        } else {
            source += "&bigN=";
        }


        if (typeof (seasonalPattern) !== "undefined" && seasonalPattern !== "") {
            source += "&bigS=" + seasonalPattern;
        } else {
            source += "&bigS=";
        }

        if (typeof (batchSize) !== "undefined" && batchSize !== "") {
            source += "&mvps=" + batchSize;
        } else {
            source += "&mvps=50";
        }

        setTimeout( function(){
        	theFrame.src = source;
        }, 0);
                theFrame.contentWindow.location.reload(true);

        ctrl.stopPollingChart($event, id);
        
        if(typeof(ctrl.externalurlhandler) !== "undefined" && typeof(ctrl.externalurlhandler.handleUrlChange !== "undefined")) {
        	ctrl.externalurlhandler.handleUrlChange(source);
        }

    };
    
    
    ctrl.functionTypeChange = function() {
    	ctrl.showHolts = (ctrl.funtionSelect.indexOf("HOLT_WINTERS") !== -1) ? true : false;
    };
    
 
    
    var name = "#" + ctrl.namerootid + "_ifrm_datetime";

    setTimeout(function () {
        console.log("date time picker name=" + name);
        $(name).datetimepicker({ theme: 'dark' });
    }, 0);


}


var charttoolbarComponentSettings = {

    // isolated scope binding
    bindings: {
        namerootid: '<',
        externalurlhandler: "=" // object implementing handleUrlChange(source)
    },

    // Inline template which is binded to message variable
    // in the component controller
    templateUrl: 'trueview/components/toolbars/charttoolbar.html',

    // The controller that handles our component logic
    controller: chartToolbarController
};