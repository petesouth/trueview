

'use strict';

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// All url parameters are available via the ARGS object
var ARGS;

var server_host_name = 'Unknown';
var influx_server_url = 'Unknown';
var start_index = -1;
var end_index = -1;

if(!_.isUndefined(ARGS.start_index)) {
    start_index = ARGS.start_index;
}

if(!_.isUndefined(ARGS.end_index)) {
    end_index = ARGS.end_index;
}

if(!_.isUndefined(ARGS.server_host_name)) {
    server_host_name = ARGS.server_host_name;
}

if(!_.isUndefined(ARGS.influx_server_url)) {
    influx_server_url = ARGS.influx_server_url;
}



var gUtil = {
    randomNumber: function(minimum, maximum){
        return Math.round( Math.random() * (maximum - minimum) + minimum);
    },

    isNull: function(val) {
        return (typeof(val) === 'undefined' || val === null);
    },

    isEmpty: function(val) {
        return ( gUtil.isNull(val) || typeof(val) !== 'string' || val.length < 1 );
    },

    extendedEncodeURIComponent: function (str) {
        return encodeURIComponent(str).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\"/g, "%27").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
    }

};


/**
 * Service Definitions for the monitcommandoMainModule
 */
var influxDatabaseService = new function() {
    var self = this;

    /**
     * Construce Influx Query 
     */
    self.constructHostMetricsQuery = function (influxServerUrl, host) {

        var query = "show series where host='" + host + "' "

        var queryUrl = "http://" + influxServerUrl + ":8086/query?db=collectd&q="
		+ gUtil.extendedEncodeURIComponent(query);

        return queryUrl;
    };

   

    /**
    * Construce Influx Query 
    */
    self.constructMetricInstancesQuery = function (influxServerUrl, host, metric) {
        var metrics = metric.split("/");
        var query = "show series from " + metrics[0] + " " + "where host='" + host + "' "


        if (metrics.length > 1) {
            query += "and " + "type='" + metrics[1] + "' ";

        }

        if (metrics.length > 2) {
            query += "and " + "type_instance='" + metrics[2] + "' ";

        }

        var queryUrl = "http://" + influxServerUrl + ":8086/query?db=collectd&q="
		+ gUtil.extendedEncodeURIComponent(query);

        return queryUrl;
    };


    /**
    * Constructs series value query for a host given a specific metric
    */
    self.constructQuery = function (influxServerUrl, host, metric, limit) {
        var metrics = metric.split("/");

        var query = "select * from " + metrics[0] + " " + "where host='" + host + "' "


        if (metrics.length > 1) {
            query += "and " + "type='" + metrics[1] + "' ";

        }

        if (metrics.length > 2) {
            query += "and " + "type_instance='" + metrics[2] + "' ";

        }

        if (metrics.length > 3) {
            query += "and " + "instance='" + metrics[3] + "' ";

        }
        query += "order by time desc LIMIT " + limit;

        var queryUrl = "http://" + influxServerUrl + ":8086/query?db=collectd&q="
		+ gUtil.extendedEncodeURIComponent(query);

        return queryUrl;
    };

   
    /**
     * Get the metrics for a given host on an influxDB
     * successFunction( results );  where.. Results is a string [] of names for each mountpoint the host has in the given influxdb database
     */
    self.getMetricInstances = function (influxServerUrl,
								host,
                                metric,
    							successFunction) {

        var queryUrl = self.constructMetricInstancesQuery(influxServerUrl, host, metric);
        console.log("Im here");

        var response = $.ajax({
            url: queryUrl,
            type: "GET",
            dataType: "JSON",
            async: false
        }).responseJSON;

        console.log("response:", response);

        var results = [];

        if(typeof(response.results) !== 'undefined' &&
            response.results.length > 0 &&
            typeof(response.results[0].series) !== 'undefined' &&
            response.results[0].series.length > 0) {

            response.results[0].series[0].values.forEach(function (values) {
                var resultSet = values[0].split(",");

                for (var i = 0; i < resultSet.length; ++i) {
                    var value = resultSet[i];

                    if (value.startsWith("instance=") === true) {
                        results.push(value.split("instance=")[1]);
                    }
                }
            });
        }

        console.log("results:", results);
        successFunction(results);
        

    };

};

var dynamicChartPanels = [];

influxDatabaseService.getMetricInstances(influx_server_url,
                              server_host_name,
                              "df_value/percent_bytes/free",
                              function(mountPoints) {
                                  if( start_index !== -1 && end_index !== -1 ) {
                                      mountPoints = mountPoints.splice( start_index, end_index );
                                  }

                                  console.log("successFunction: mountPoints:", mountPoints);
                                  mountPoints.forEach(function(mountPoint){

                                        console.log( "mountPoint:", mountPoint);

                                          var newChartPanel = {
                                              "title": mountPoint + " : Free/Reserved/Used Drive Percentage",
                                              "error": false,
                                              "span": 12,
                                              "editable": true,
                                              "type": "graph",
                                              "isNew": true,
                                              "id": dynamicChartPanels.length + 1,
                                              "targets": [
                                                {
                                                    "policy": "default",
                                                    "dsType": "influxdb",
                                                    "resultFormat": "time_series",
                                                    "tags": [
                                                      {
                                                          "key": "type",
                                                          "operator": "=",
                                                          "value": "percent_bytes"
                                                      },
                                                      {
                                                          "condition": "AND",
                                                          "key": "type_instance",
                                                          "operator": "=",
                                                          "value": "free"
                                                      },
                                                      {
                                                          "condition": "AND",
                                                          "key": "instance",
                                                          "operator": "=",
                                                          "value": mountPoint
                                                      },
                                                      {
                                                          "condition": "AND",
                                                          "key": "host",
                                                          "operator": "=",
                                                          "value": server_host_name
                                                      }
                                                    ],
                                                    "groupBy": [
                                                      {
                                                          "type": "time",
                                                          "params": [
                                                            "$interval"
                                                          ]
                                                      },
                                                      {
                                                          "type": "fill",
                                                          "params": [
                                                            "null"
                                                          ]
                                                      }
                                                    ],
                                                    "select": [
                                                      [
                                                        {
                                                            "type": "field",
                                                            "params": [
                                                              "value"
                                                            ]
                                                        },
                                                        {
                                                            "type": "mean",
                                                            "params": []
                                                        }
                                                      ]
                                                    ],
                                                    "refId": "A",
                                                    "measurement": "df_value"
                                                },
                                                {
                                                    "policy": "default",
                                                    "dsType": "influxdb",
                                                    "resultFormat": "time_series",
                                                    "tags": [
                                                      {
                                                          "key": "type",
                                                          "operator": "=",
                                                          "value": "percent_bytes"
                                                      },
                                                      {
                                                          "condition": "AND",
                                                          "key": "type_instance",
                                                          "operator": "=",
                                                          "value": "reserved"
                                                      },
                                                      {
                                                          "condition": "AND",
                                                          "key": "instance",
                                                          "operator": "=",
                                                          "value": mountPoint
                                                      },
                                                      {
                                                          "condition": "AND",
                                                          "key": "host",
                                                          "operator": "=",
                                                          "value": server_host_name
                                                      }
                                                    ],
                                                    "groupBy": [
                                                      {
                                                          "type": "time",
                                                          "params": [
                                                            "$interval"
                                                          ]
                                                      },
                                                      {
                                                          "type": "fill",
                                                          "params": [
                                                            "null"
                                                          ]
                                                      }
                                                    ],
                                                    "select": [
                                                      [
                                                        {
                                                            "type": "field",
                                                            "params": [
                                                              "value"
                                                            ]
                                                        },
                                                        {
                                                            "type": "mean",
                                                            "params": []
                                                        }
                                                      ]
                                                    ],
                                                    "refId": "B",
                                                    "measurement": "df_value"
                                                },
                                                {
                                                    "policy": "default",
                                                    "dsType": "influxdb",
                                                    "resultFormat": "time_series",
                                                    "tags": [
                                                      {
                                                          "key": "type",
                                                          "operator": "=",
                                                          "value": "percent_bytes"
                                                      },
                                                      {
                                                          "condition": "AND",
                                                          "key": "type_instance",
                                                          "operator": "=",
                                                          "value": "used"
                                                      },
                                                      {
                                                          "condition": "AND",
                                                          "key": "instance",
                                                          "operator": "=",
                                                          "value": mountPoint
                                                      },
                                                      {
                                                          "condition": "AND",
                                                          "key": "host",
                                                          "operator": "=",
                                                          "value": server_host_name
                                                      }
                                                    ],
                                                    "groupBy": [
                                                      {
                                                          "type": "time",
                                                          "params": [
                                                            "$interval"
                                                          ]
                                                      },
                                                      {
                                                          "type": "fill",
                                                          "params": [
                                                            "null"
                                                          ]
                                                      }
                                                    ],
                                                    "select": [
                                                      [
                                                        {
                                                            "type": "field",
                                                            "params": [
                                                              "value"
                                                            ]
                                                        },
                                                        {
                                                            "type": "mean",
                                                            "params": []
                                                        }
                                                      ]
                                                    ],
                                                    "refId": "C",
                                                    "measurement": "df_value"
                                                }
                                              ],
                                              "datasource": "InfluxCollectD",
                                              "renderer": "flot",
                                              "yaxes": [
                                                {
                                                    "label": null,
                                                    "show": true,
                                                    "logBase": 1,
                                                    "min": null,
                                                    "max": null,
                                                    "format": "short"
                                                },
                                                {
                                                    "label": null,
                                                    "show": true,
                                                    "logBase": 1,
                                                    "min": null,
                                                    "max": null,
                                                    "format": "short"
                                                }
                                              ],
                                              "xaxis": {
                                                  "show": true
                                              },
                                              "grid": {
                                                  "threshold1": null,
                                                  "threshold2": null,
                                                  "threshold1Color": "rgba(216, 200, 27, 0.27)",
                                                  "threshold2Color": "rgba(234, 112, 112, 0.22)"
                                              },
                                              "lines": true,
                                              "fill": 1,
                                              "linewidth": 2,
                                              "points": false,
                                              "pointradius": 5,
                                              "bars": false,
                                              "stack": false,
                                              "percentage": false,
                                              "legend": {
                                                  "show": true,
                                                  "values": false,
                                                  "min": false,
                                                  "max": false,
                                                  "current": false,
                                                  "total": false,
                                                  "avg": false
                                              },
                                              "nullPointMode": "connected",
                                              "steppedLine": false,
                                              "tooltip": {
                                                  "value_type": "cumulative",
                                                  "shared": true,
                                                  "sort": 0,
                                                  "msResolution": true
                                              },
                                              "timeFrom": null,
                                              "timeShift": null,
                                              "aliasColors": {},
                                              "seriesOverrides": [],
                                              "links": []
                                          };
                                        
                                          dynamicChartPanels.push(newChartPanel);

                                      }); // end of mountPoints.forEach(....
                                       
                              }); // end of influxDatabaseService.getMetricInstances....

var returnDash = {
    "id": null,
    "title": "System Storage Mount Points:" + server_host_name,
    "tags": [],
    "style": "dark",
    "timezone": "browser",
    "editable": false,
    "hideControls": true,
    "sharedCrosshair": false,
    "rows": [
      {
          "collapse": false,
          "editable": true,
          "height": "250px",
          "panels": dynamicChartPanels,
          "title": "Row"
      }
    ],
    "time": {
        "from": "now-6h",
        "to": "now"
    },
    "timepicker": {
        "refresh_intervals": [
          "5s",
          "10s",
          "30s",
          "1m",
          "5m",
          "15m",
          "30m",
          "1h",
          "2h",
          "1d"
        ],
        "time_options": [
          "5m",
          "15m",
          "1h",
          "6h",
          "12h",
          "24h",
          "2d",
          "7d",
          "30d"
        ]
    },
    "templating": {
        "list": []
    },
    "annotations": {
        "list": []
    },
    "schemaVersion": 12,
    "version": 4,
    "links": [],
    "gnetId": null
};


return returnDash;