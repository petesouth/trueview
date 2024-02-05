'use strict';

/**
 * @ngdoc function
 * @name DashboardServerController
 * @module dashboardServer
 * @kind function;
 * 
 */
function jsonDashboardController($sce, $localStorage) {
	var ctrl = this;
	ctrl.frame_id_dash_text = "json_dashboard_";
    
	ctrl.$onChanges = function(changesObj) {

	}
	
	
	if (typeof (ctrl.namerootid) === "undefined") {
		ctrl.namerootid = "root";
	}

	if (typeof (ctrl.dashboardmap) === "undefined") {
		ctrl.dashboardmap = new Map(); // Default. This parameter is a map.
	}
	
	if(typeof(ctrl.showtoolbar) === "undefined" ) {
		ctrl.showtoolbar = false;
	}
	

	ctrl.jsonUrl = $sce.trustAsResourceUrl(ctrl.dashboardpath);
	ctrl.dashBoardUrlRows = [];

	ctrl.clickcard = function(url) {
		window.open(url);
	};

	ctrl.loadJson = function() {

		var data = {};
		if (typeof (ctrl.renderedjson) === "undefined") {
			$.ajax({
				url : ctrl.jsonUrl,
				success : function(result) {
					data = result;
				},
				async : false
			});
		} else {
			data = ctrl.renderedjson; // Exterally CODE renedered JSON..
			// Rather then loading it from a
			// template
		}

		console.log("RENDERING DASHBOARD JSON: ", JSON.stringify(data));

		ctrl.dashBoardUrlRows = ( typeof(data) !== "undefined" && typeof(data.rows) !== "undefined") ? data.rows : [];
		var columnIdCount = 0;
		
		ctrl.dashBoardUrlRows.forEach(function(row) {
			
			row.forEach(function(column) {
				column.frameId = ctrl.frame_id_dash_text + columnIdCount;
				column.handleUrlChange = function(source) {
					column.url = source;
				};
				
				
				++columnIdCount;
				ctrl.dashboardmap.forEach(function(value, key, map) {
					column.title = column.title.replace(new RegExp('{{' + key
							+ '}}', 'g'), value);
					column.url = column.url.replace(new RegExp('{{' + key
							+ '}}', 'g'), value);
				});

			});
			// For each row.. Go through and replace any token in title/url in
			// the dashboard.

		});
	};

	ctrl.loadIFramesUrls = function() {
			ctrl.dashBoardUrlRows.forEach(function(row) {
				var columnIdCount = 0;

				row.forEach(function(column) {
					setTimeout(function() {
							var theFrameId = "#" + ctrl.namerootid + "_" + column.frameId;
							
							console.log("theFrameId: " + theFrameId);
							$(theFrameId).attr("src", column.url);

					}, 0);
				});
				// For each row.. Go through and replace any token in title/url
				// in
				// the dashboard.

			});

	};

	ctrl.loadJson();
	ctrl.loadIFramesUrls();

}

var jsonDashboardComponentSettings = {

	// isolated scope binding
	bindings : {
		namerootid: '<',
		showtoolbar : "<",
		dashboardpath : '<',
		renderedjson : '=', // This lets me pre-render json externally..
		// Basically giving me dynamic dash in code
		// abilities.
		dashboardmap : '=' // new Map() { whatever You want replaced.. In dash
	// template using {{tokenName}}
	},

	// Inline template which is binded to message variable
	// in the component controller
	templateUrl : 'trueview/components/dash/jsondash.html',

	// The controller that handles our component logic
	controller : jsonDashboardController
};