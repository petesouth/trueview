/* global _ */

/*
 *  =======>   IN LINUX THIS FILE LIVES IN   /usr/share/grafana/public/dashboards
 *  Then referenced like:
 *  http://104.236.188.31:3000/dashboard/script/server_host_dynamic_dash.js?server_host_name=facet_freehive_io
 *
 *   Where the ip address you see... 104.236.188.31.. Is an istance of grafana.
 *
 *
 *
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (in the ARGS variable)
 *
 * Return a dashboard object, or a function
 *
 * For async scripts, return a function, this function must take a single callback function as argument,
 * call this callback function with the dashboard object (look at scripted_async.js for an example)
 */

'use strict';

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// All url parameters are available via the ARGS object
var ARGS;

var server_host_name = 'Unknown';



if(!_.isUndefined(ARGS.server_host_name)) {
    server_host_name = ARGS.server_host_name;
}


$("<style type='text/css'> .panel-title { visibility: hidden; } </style>").appendTo("head");

var dashboard = {
    "id": 12,
    "title": server_host_name,
    "tags": [],
    "style": "dark",
    "timezone": "browser",
    "editable": true,
    "hideControls": true,
    "sharedCrosshair": false,
    "rows": [
      {
          "collapse": false,
          "editable": false,
          "height": "100px",
          "panels": [
            {
                "bgColor": null,
                "clockType": "24 hour",
                "countdownSettings": {
                    "endCountdownTime": "2016-07-22T04:40:00.000Z",
                    "endText": "00:00:00"
                },
                "dateSettings": {
                    "dateFormat": "YYYY-MM-DD",
                    "fontSize": "20px",
                    "fontWeight": "normal",
                    "showDate": false
                },
                "editable": false,
                "error": false,
                "height": "90px",
                "id": 16,
                "isNew": true,
                "links": [],
                "mode": "time",
                "offsetFromUtc": null,
                "offsetFromUtcMinutes": null,
                "span": 12,
                "timeSettings": {
                    "customFormat": "HH:mm:ss",
                    "fontSize": "60px",
                    "fontWeight": "normal"
                },
                "title": "HOST: " + server_host_name,
                "type": "grafana-clock-panel"
            }
          ],
          "title": "New row"
      },
      {
          "collapse": false,
          "editable": false,
          "height": "250px",
          "panels": [
            {
                "aliasColors": {},
                "cacheTimeout": null,
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "fontSize": "80%",
                "format": "short",
                "height": "359px",
                "id": 4,
                "interval": null,
                "isNew": true,
                "legend": {
                    "show": true,
                    "values": true
                },
                "legendType": "Under graph",
                "links": [],
                "maxDataPoints": 3,
                "nullPointMode": "connected",
                "pieType": "pie",
                "span": 3,
                "strokeWidth": 1,
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "df_value",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
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
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "df_value",
                      "policy": "default",
                      "refId": "B",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
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
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "df_value",
                      "policy": "default",
                      "refId": "C",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
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
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "title": "",
                "type": "grafana-piechart-panel",
                "valueName": "current"
            },
            {
                "circleMaxSize": "30",
                "circleMinSize": "21",
                "colors": [
                  "rgba(245, 54, 54, 0.9)",
                  "rgba(237, 129, 40, 0.89)",
                  "rgba(50, 172, 45, 0.97)"
                ],
                "datasource": null,
                "decimals": 0,
                "editable": false,
                "error": false,
                "esMetric": "Count",
                "height": "400px",
                "id": 5,
                "initialZoom": "2",
                "isNew": true,
                "jsonUrl": "https://github.com/grafana/worldmap-panel/blob/master/dist/data/states.json",
                "links": [],
                "locationData": "table",
                "mapCenter": "North America",
                "mapCenterLatitude": 40,
                "mapCenterLongitude": -100,
                "maxDataPoints": 1,
                "showLegend": true,
                "span": 9,
                "tableLabel": "",
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "uptime_value",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "uptime"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "thresholds": "0,10",
                "title": "",
                "transparent": false,
                "type": "grafana-worldmap-panel",
                "unitPlural": "",
                "unitSingle": "",
                "valueName": "total"
            }
          ],
          "title": "New row"
      },
      {
          "collapse": false,
          "editable": false,
          "height": "250px",
          "panels": [
            {
                "cacheTimeout": null,
                "colorBackground": false,
                "colorValue": false,
                "colors": [
                  "rgba(50, 172, 45, 0.97)",
                  "rgba(237, 129, 40, 0.89)",
                  "rgba(245, 54, 54, 0.9)"
                ],
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "format": "none",
                "gauge": {
                    "maxValue": 100,
                    "minValue": 0,
                    "show": true,
                    "thresholdLabels": false,
                    "thresholdMarkers": true
                },
                "height": "300px",
                "id": 1,
                "interval": null,
                "isNew": true,
                "links": [],
                "mappingType": 1,
                "mappingTypes": [
                  {
                      "name": "value to text",
                      "value": 1
                  },
                  {
                      "name": "range to text",
                      "value": 2
                  }
                ],
                "maxDataPoints": 100,
                "nullPointMode": "connected",
                "nullText": null,
                "postfix": "",
                "postfixFontSize": "50%",
                "prefix": "",
                "prefixFontSize": "50%",
                "rangeMaps": [
                  {
                      "from": "null",
                      "text": "N/A",
                      "to": "null"
                  }
                ],
                "span": 4,
                "sparkline": {
                    "fillColor": "rgba(31, 118, 189, 0.18)",
                    "full": false,
                    "lineColor": "rgb(31, 120, 193)",
                    "show": true
                },
                "targets": [
                  {
                      "policy": "default",
                      "dsType": "influxdb",
                      "resultFormat": "time_series",
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "<>",
                            "value": "idle"
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
                      "measurement": "cpu_value",
                      "query": "SELECT mean(\"value\") FROM \"cpu_value\" WHERE \"type\" = 'percent' AND \"type_instance\" <> 'idle' AND \"host\"='" + server_host_name + "' AND $timeFilter GROUP BY time($interval) fill(null)",
                      "rawQuery": true
                  }
                ],
                "thresholds": "50,80",
                "title": "",
                "type": "singlestat",
                "valueFontSize": "80%",
                "valueMaps": [
                  {
                      "op": "=",
                      "text": "N/A",
                      "value": "null"
                  }
                ],
                "valueName": "avg"
            },
            {
                "aliasColors": {},
                "cacheTimeout": null,
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "fontSize": "80%",
                "format": "short",
                "height": "260px",
                "id": 15,
                "interval": null,
                "isNew": true,
                "legend": {
                    "show": true,
                    "values": true
                },
                "legendType": "Under graph",
                "links": [],
                "maxDataPoints": 3,
                "nullPointMode": "connected",
                "pieType": "pie",
                "span": 4,
                "strokeWidth": 1,
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "load_longterm",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "load"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "relative"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "load_midterm",
                      "policy": "default",
                      "refId": "B",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "load"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "relative"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "load_shortterm",
                      "policy": "default",
                      "refId": "C",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "load"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "relative"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "title": "",
                "type": "grafana-piechart-panel",
                "valueName": "current"
            },
            {
                "cacheTimeout": null,
                "colorBackground": false,
                "colorValue": false,
                "colors": [
                  "rgba(50, 172, 45, 0.97)",
                  "rgba(237, 129, 40, 0.89)",
                  "rgba(245, 54, 54, 0.9)"
                ],
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "format": "none",
                "gauge": {
                    "maxValue": 100,
                    "minValue": 0,
                    "show": true,
                    "thresholdLabels": false,
                    "thresholdMarkers": true
                },
                "height": "300px",
                "id": 3,
                "interval": null,
                "isNew": true,
                "links": [],
                "mappingType": 1,
                "mappingTypes": [
                  {
                      "name": "value to text",
                      "value": 1
                  },
                  {
                      "name": "range to text",
                      "value": 2
                  }
                ],
                "maxDataPoints": 100,
                "nullPointMode": "connected",
                "nullText": null,
                "postfix": "",
                "postfixFontSize": "50%",
                "prefix": "",
                "prefixFontSize": "50%",
                "rangeMaps": [
                  {
                      "from": "null",
                      "text": "N/A",
                      "to": "null"
                  }
                ],
                "span": 4,
                "sparkline": {
                    "fillColor": "rgba(31, 118, 189, 0.18)",
                    "full": false,
                    "lineColor": "rgb(31, 120, 193)",
                    "show": true
                },
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "memory_value",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "<>",
                            "value": "inactive"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "thresholds": "50,80",
                "title": "",
                "type": "singlestat",
                "valueFontSize": "80%",
                "valueMaps": [
                  {
                      "op": "=",
                      "text": "N/A",
                      "value": "null"
                  }
                ],
                "valueName": "avg"
            }
          ],
          "title": "Row"
      },
      {
          "collapse": false,
          "editable": false,
          "height": "250px",
          "panels": [
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "fill": 1,
                "grid": {
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "id": 8,
                "isNew": true,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 2,
                "links": [],
                "nullPointMode": "connected",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "renderer": "flot",
                "seriesOverrides": [],
                "span": 9,
                "stack": false,
                "steppedLine": false,
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "load_longterm",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "load"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "relative"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "load_midterm",
                      "policy": "default",
                      "refId": "B",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "load"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "relative"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "load_shortterm",
                      "policy": "default",
                      "refId": "C",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "load"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "relative"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "timeFrom": null,
                "timeShift": null,
                "title": "",
                "tooltip": {
                    "msResolution": true,
                    "shared": true,
                    "sort": 0,
                    "value_type": "cumulative"
                },
                "type": "graph",
                "xaxis": {
                    "show": true
                },
                "yaxes": [
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  },
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  }
                ]
            },
            {
                "cacheTimeout": null,
                "colorBackground": false,
                "colorValue": false,
                "colors": [
                  "rgba(245, 54, 54, 0.9)",
                  "rgba(237, 129, 40, 0.89)",
                  "rgba(50, 172, 45, 0.97)"
                ],
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "format": "none",
                "gauge": {
                    "maxValue": 100,
                    "minValue": 0,
                    "show": false,
                    "thresholdLabels": false,
                    "thresholdMarkers": true
                },
                "id": 13,
                "interval": null,
                "isNew": true,
                "links": [],
                "mappingType": 1,
                "mappingTypes": [
                  {
                      "name": "value to text",
                      "value": 1
                  },
                  {
                      "name": "range to text",
                      "value": 2
                  }
                ],
                "maxDataPoints": 100,
                "nullPointMode": "connected",
                "nullText": null,
                "postfix": "",
                "postfixFontSize": "50%",
                "prefix": "",
                "prefixFontSize": "50%",
                "rangeMaps": [
                  {
                      "from": "null",
                      "text": "N/A",
                      "to": "null"
                  }
                ],
                "span": 3,
                "sparkline": {
                    "fillColor": "rgba(31, 118, 189, 0.18)",
                    "full": false,
                    "lineColor": "rgb(31, 120, 193)",
                    "show": false
                },
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "tcpconns_value",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "tcp_connections"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "LISTEN"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "thresholds": "",
                "title": "",
                "type": "singlestat",
                "valueFontSize": "80%",
                "valueMaps": [
                  {
                      "op": "=",
                      "text": "N/A",
                      "value": "null"
                  }
                ],
                "valueName": "avg"
            }
          ],
          "title": "New row"
      },
      {
          "collapse": false,
          "editable": false,
          "height": "250px",
          "panels": [
            {
                "columns": [],
                "datasource": null,
                "editable": false,
                "error": false,
                "fontSize": "100%",
                "height": "200px",
                "id": 6,
                "isNew": true,
                "links": [],
                "pageSize": null,
                "scroll": true,
                "showHeader": true,
                "sort": {
                    "col": 0,
                    "desc": true
                },
                "span": 12,
                "styles": [
                  {
                      "dateFormat": "YYYY-MM-DD HH:mm:ss",
                      "pattern": "Time",
                      "type": "date"
                  },
                  {
                      "colorMode": null,
                      "colors": [
                        "rgba(245, 54, 54, 0.9)",
                        "rgba(237, 129, 40, 0.89)",
                        "rgba(50, 172, 45, 0.97)"
                      ],
                      "decimals": 2,
                      "pattern": "/.*/",
                      "thresholds": [],
                      "type": "number",
                      "unit": "short"
                  }
                ],
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "processes_user",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "ps_cputime"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "title": "",
                "transform": "timeseries_to_columns",
                "type": "table"
            }
          ],
          "title": "New row"
      },
      {
          "collapse": false,
          "editable": false,
          "height": "250px",
          "panels": [
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "fill": 1,
                "grid": {
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "height": "",
                "id": 7,
                "isNew": true,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 2,
                "links": [],
                "nullPointMode": "connected",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "renderer": "flot",
                "seriesOverrides": [],
                "span": 12,
                "stack": false,
                "steppedLine": false,
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "df_value",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
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
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "df_value",
                      "policy": "default",
                      "refId": "B",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
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
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "df_value",
                      "policy": "default",
                      "refId": "C",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
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
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "timeFrom": null,
                "timeShift": null,
                "title": "",
                "tooltip": {
                    "msResolution": true,
                    "shared": true,
                    "sort": 0,
                    "value_type": "cumulative"
                },
                "type": "graph",
                "xaxis": {
                    "show": true
                },
                "yaxes": [
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  },
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  }
                ]
            },
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "fill": 1,
                "grid": {
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "height": "",
                "id": 14,
                "isNew": true,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 2,
                "links": [],
                "nullPointMode": "connected",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "renderer": "flot",
                "seriesOverrides": [],
                "span": 12,
                "stack": false,
                "steppedLine": false,
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "df_value",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "df_complex"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "free"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "df_value",
                      "policy": "default",
                      "refId": "B",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "df_complex"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "reserved"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "df_value",
                      "policy": "default",
                      "refId": "C",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "df_complex"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "used"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "timeFrom": null,
                "timeShift": null,
                "title": "",
                "tooltip": {
                    "msResolution": true,
                    "shared": true,
                    "sort": 0,
                    "value_type": "cumulative"
                },
                "type": "graph",
                "xaxis": {
                    "show": true
                },
                "yaxes": [
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  },
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  }
                ]
            }
          ],
          "title": "New row"
      },
      {
          "collapse": false,
          "editable": false,
          "height": "250px",
          "panels": [
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "fill": 1,
                "grid": {
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "id": 9,
                "isNew": true,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 2,
                "links": [],
                "nullPointMode": "connected",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "renderer": "flot",
                "seriesOverrides": [],
                "span": 12,
                "stack": false,
                "steppedLine": false,
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "cpu_value",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "idle"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "cpu_value",
                      "policy": "default",
                      "refId": "B",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "interrupt"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "cpu_value",
                      "policy": "default",
                      "refId": "C",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "nice"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "cpu_value",
                      "policy": "default",
                      "refId": "D",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "system"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "cpu_value",
                      "policy": "default",
                      "refId": "E",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "user"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "timeFrom": null,
                "timeShift": null,
                "title": "",
                "tooltip": {
                    "msResolution": true,
                    "shared": true,
                    "sort": 0,
                    "value_type": "cumulative"
                },
                "type": "graph",
                "xaxis": {
                    "show": true
                },
                "yaxes": [
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  },
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  }
                ]
            }
          ],
          "title": "New row"
      },
      {
          "collapse": false,
          "editable": false,
          "height": "250px",
          "panels": [
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "InfluxCollectD",
                "editable": false,
                "error": false,
                "fill": 1,
                "grid": {
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "id": 10,
                "isNew": true,
                "legend": {
                    "avg": false,
                    "current": false,
                    "max": false,
                    "min": false,
                    "show": true,
                    "total": false,
                    "values": false
                },
                "lines": true,
                "linewidth": 2,
                "links": [],
                "nullPointMode": "connected",
                "percentage": false,
                "pointradius": 5,
                "points": false,
                "renderer": "flot",
                "seriesOverrides": [],
                "span": 12,
                "stack": false,
                "steppedLine": false,
                "targets": [
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "memory_value",
                      "policy": "default",
                      "refId": "A",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "active"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "memory_value",
                      "policy": "default",
                      "refId": "B",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "cache"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "memory_value",
                      "policy": "default",
                      "refId": "C",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "free"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "memory_value",
                      "policy": "default",
                      "refId": "D",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "inactive"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  },
                  {
                      "dsType": "influxdb",
                      "groupBy": [
                        {
                            "params": [
                              "$interval"
                            ],
                            "type": "time"
                        },
                        {
                            "params": [
                              "null"
                            ],
                            "type": "fill"
                        }
                      ],
                      "measurement": "memory_value",
                      "policy": "default",
                      "refId": "E",
                      "resultFormat": "time_series",
                      "select": [
                        [
                          {
                              "params": [
                                "value"
                              ],
                              "type": "field"
                          },
                          {
                              "params": [],
                              "type": "mean"
                          }
                        ]
                      ],
                      "tags": [
                        {
                            "key": "type",
                            "operator": "=",
                            "value": "percent"
                        },
                        {
                            "condition": "AND",
                            "key": "type_instance",
                            "operator": "=",
                            "value": "wired"
                        },
                        {
                            "condition": "AND",
                            "key": "host",
                            "operator": "=",
                            "value": server_host_name
                        }
                      ]
                  }
                ],
                "timeFrom": null,
                "timeShift": null,
                "title": "",
                "tooltip": {
                    "msResolution": true,
                    "shared": true,
                    "sort": 0,
                    "value_type": "cumulative"
                },
                "type": "graph",
                "xaxis": {
                    "show": true
                },
                "yaxes": [
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  },
                  {
                      "format": "short",
                      "label": null,
                      "logBase": 1,
                      "max": null,
                      "min": null,
                      "show": true
                  }
                ]
            }
          ],
          "title": "New row"
      },
      {
          "collapse": false,
          "editable": true,
          "height": "250px",
          "panels": [
            {
                "columns": [],
                "datasource": "elasticsearch",
                "editable": true,
                "error": false,
                "fontSize": "100%",
                "id": 17,
                "isNew": true,
                "links": [],
                "pageSize": null,
                "scroll": true,
                "showHeader": true,
                "sort": {
                    "col": 0,
                    "desc": true
                },
                "span": 12,
                "styles": [
                  {
                      "dateFormat": "YYYY-MM-DD HH:mm:ss",
                      "pattern": "Time",
                      "type": "date"
                  },
                  {
                      "colorMode": null,
                      "colors": [
                        "rgba(245, 54, 54, 0.9)",
                        "rgba(237, 129, 40, 0.89)",
                        "rgba(50, 172, 45, 0.97)"
                      ],
                      "decimals": 2,
                      "pattern": "/.*/",
                      "thresholds": [],
                      "type": "number",
                      "unit": "short"
                  }
                ],
                "targets": [
                  {
                      "bucketAggs": [
                        {
                            "field": "@timestamp",
                            "id": "2",
                            "settings": {
                                "interval": "auto",
                                "min_doc_count": 0,
                                "trimEdges": 0
                            },
                            "type": "date_histogram"
                        }
                      ],
                      "dsType": "elasticsearch",
                      "metrics": [
                        {
                            "field": "syslog_severity_code",
                            "id": "1",
                            "meta": {},
                            "settings": {},
                            "type": "sum"
                        }
                      ],
                      "refId": "A",
                      "timeField": "@timestamp"
                  }
                ],
                "title": "",
                "transform": "timeseries_to_columns",
                "type": "table"
            }
          ],
          "title": "New row"
      },
      {
          "collapse": false,
          "editable": true,
          "height": "250px",
          "panels": [],
          "title": "New row"
      }
    ],
    "time": {
        "from": "now/w",
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
    "version": 38,
    "links": [],
    "gnetId": null
};




return dashboard;