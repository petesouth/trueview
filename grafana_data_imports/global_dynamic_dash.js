﻿
'use strict';

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

// All url parameters are available via the ARGS object
var ARGS;

var org_name = 'Unknown';
var true_view_url = 'Unknown';



$("<style type='text/css'> .panel-title { visibility: hidden; } </style>").appendTo("head");
if(!_.isUndefined(ARGS.true_view_url)) {
    true_view_url = ARGS.true_view_url;
}

if(!_.isUndefined(ARGS.org_name)) {
    org_name = ARGS.org_name;
}

var trueViewOrgServerAPIUrl = true_view_url + "/api/tv/" + org_name + "/server";
console.log("trueViewOrgServerAPIUrl", trueViewOrgServerAPIUrl);

var trueViewServers = $.ajax({
    url: trueViewOrgServerAPIUrl,
    type: "GET",
    dataType: "JSON",
    async: false
}).responseJSON;


console.log(trueViewServers);

var regEx = "/";

for( var i = 0; i < trueViewServers.length; ++ i ) {
    regEx += trueViewServers[i].system_serial;
    if( i < ( trueViewServers.length - 1) ) {
        regEx += "|"
    }
}

regEx += "/";

console.log("regEx: ", regEx );

var organizationFilterData = {
    "condition": "AND",
    "key": "host",
    "operator": "=~",
    "value": regEx
};

var dashboard = {
    "title": "Global Dash",
    "tags": [],
    "style": "dark",
    "timezone": "browser",
    "editable": true,
    "hideControls": true,
    "sharedCrosshair": false,
    "rows": [
      {
          "collapse": false,
          "editable": true,
          "height": "250px",
          "panels": [
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "InfluxCollectD",
                "editable": true,
                "error": false,
                "fill": 1,
                "grid": {
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "id": 1,
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
                            "operator": "<>",
                            "value": "idle"
                        }, organizationFilterData
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
                            "operator": "<>",
                            "value": "inactive"
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
          "title": "Row"
      },
      {
          "collapse": false,
          "editable": true,
          "height": "250px",
          "panels": [
            {
                "aliasColors": {},
                "bars": false,
                "datasource": "InfluxCollectD",
                "editable": true,
                "error": false,
                "fill": 1,
                "grid": {
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "id": 2,
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
                            "operator": "<>",
                            "value": "free"
                        }, organizationFilterData
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
                      "measurement": "disk_read",
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
                      "tags": [organizationFilterData]
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
                      "measurement": "disk_write",
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
                      "tags": [organizationFilterData]
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
                "aliasColors": {},
                "bars": false,
                "datasource": "InfluxCollectD",
                "editable": true,
                "error": false,
                "fill": 1,
                "grid": {
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "id": 3,
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
                        }, organizationFilterData
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
                        }, organizationFilterData
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
                      "tags": [organizationFilterData]
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
                      "measurement": "tcpconns_value",
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
                      "tags": [organizationFilterData]
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
                "aliasColors": {},
                "bars": false,
                "datasource": null,
                "editable": true,
                "error": false,
                "fill": 1,
                "grid": {
                    "threshold1": null,
                    "threshold1Color": "rgba(216, 200, 27, 0.27)",
                    "threshold2": null,
                    "threshold2Color": "rgba(234, 112, 112, 0.22)"
                },
                "id": 4,
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
                            "field": "value",
                            "id": "1",
                            "meta": {},
                            "settings": {},
                            "type": "max"
                        }
                      ],
                      "query": "@metric:logins.count",
                      "refId": "A",
                      "timeField": "@timestamp"
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
                "columns": [
                  {
                      "text": "@timestamp",
                      "value": "@timestamp"
                  },
                  {
                      "text": "type",
                      "value": "type"
                  },
                  {
                      "text": "syslog_severity",
                      "value": "syslog_severity"
                  },
                  {
                      "text": "@source_host",
                      "value": "@source_host"
                  },
                  {
                      "text": "message",
                      "value": "message"
                  },
                  {
                      "text": "host",
                      "value": "host"
                  }
                ],
                "datasource": "elasticsearch",
                "editable": true,
                "error": false,
                "fontSize": "100%",
                "id": 5,
                "isNew": true,
                "links": [],
                "pageSize": null,
                "scroll": true,
                "showHeader": false,
                "sort": {
                    "col": 1,
                    "desc": false
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
                      "bucketAggs": [],
                      "dsType": "elasticsearch",
                      "metrics": [
                        {
                            "field": "select field",
                            "id": "1",
                            "meta": {},
                            "settings": {},
                            "type": "raw_document"
                        }
                      ],
                      "refId": "A",
                      "timeField": "@timestamp"
                  }
                ],
                "title": "",
                "transform": "json",
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
        "to": "now/w"
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
    "version": 33,
    "links": [],
    "gnetId": null
};




return dashboard;