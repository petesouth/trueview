
Elasticsearch Cluster/API Panel: http://trueview-demo.freehive.io:9200/_plugin/kopf

[5:23]  
Kibana: http://trueview-demo.freehive.io:5601


var client = new $.es.Client({
  hosts: 'trueview-demo.freehive.io:9200'
});


client.ping({
  requestTimeout: 30000,

  // undocumented params are appended to the query string
  hello: "elasticsearch"
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }


client.search({
  index: 'twitter',
  type: 'tweets',
  body: {
    query: {
      match: {
        body: 'elasticsearch'
      }
    }
  }
}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});




  sample Json from collectd_db

  {
  "_index": "%{[@metadata][beat]}-2016.09.01",
  "_type": "%{[@metadata][type]}",
  "_id": "AVbm9Iwa4kgmH5bUim7w",
  "_score": null,
  "_source": {
    "host": "stinger_freehive_io",
    "@timestamp": "2016-09-01T18:13:11.558Z",
    "plugin": "df",
    "plugin_instance": "zroot_vm_ubuntu-vm2@fc72fa15",
    "collectd_type": "percent_bytes",
    "type_instance": "used",
    "value": 0.24134144186973572,
    "@version": "1"
  },
  "fields": {
    "@timestamp": [
      1472753591558
    ]
  },
  "sort": [
    1472753591558
  ]
}



Example Query from Kibana board.

---- BEGIN ----

[
  "host"
]

{
  "index": "*",
  "query": {
    "query_string": {
      "analyze_wildcard": true,
      "query": "*"
    }
  },
  "filter": [
    {
      "$state": {
        "store": "appState"
      },
      "meta": {
        "alias": null,
        "disabled": false,
        "index": "*",
        "key": "host",
        "negate": false,
        "value": "stinger_freehive_io"
      },
      "query": {
        "match": {
          "host": {
            "query": "stinger_freehive_io",
            "type": "phrase"
          }
        }
      }
    },
    {
      "$state": {
        "store": "appState"
      },
      "meta": {
        "alias": null,
        "disabled": false,
        "index": "*",
        "key": "collectd_type",
        "negate": false,
        "value": "percent_bytes"
      },
      "query": {
        "match": {
          "collectd_type": {
            "query": "percent_bytes",
            "type": "phrase"
          }
        }
      }
    },
    {
      "$state": {
        "store": "appState"
      },
      "meta": {
        "alias": null,
        "disabled": false,
        "index": "*",
        "key": "plugin",
        "negate": false,
        "value": "df"
      },
      "query": {
        "match": {
          "plugin": {
            "query": "df",
            "type": "phrase"
          }
        }
      }
    },
    {
      "$state": {
        "store": "appState"
      },
      "meta": {
        "alias": null,
        "disabled": false,
        "index": "*",
        "key": "type_instance",
        "negate": false,
        "value": "free"
      },
      "query": {
        "match": {
          "type_instance": {
            "query": "free",
            "type": "phrase"
          }
        }
      }
    }
  ],
  "highlight": {
    "pre_tags": [
      "@kibana-highlighted-field@"
    ],
    "post_tags": [
      "@/kibana-highlighted-field@"
    ],
    "fields": {
      "*": {}
    },
    "require_field_match": false,
    "fragment_size": 2147483647
  }
}

[
  "@timestamp",
  "desc"
]



var client = new $.es.Client({
  hosts: 'trueview-demo.freehive.io:9200'
});

client.search( {
  "size": 50, 
  "query": {
    "query_string": {
      "analyze_wildcard": true,
      "query":  {
        "match": {
          "host": {
            "query": "stinger_freehive_io",
            "type": "phrase"
          }
        }
      }
    }
  },filter: {
          and: [
            {
              term: { plugin: "df" }
            },
            {
              term: { collectd_type: "percent_bytes" }
            },
            {
              term: { type_instance: "free" }
            },
			{
			  term: { plugin_instance: "zroot_vm_ubuntu-vm2@fc72fa15" }
			}
          ]
    }
}).then(function (resp) {
  console.log("resp", resp);
}, function (error) {
  console.trace(error.message);
});



---- END ----

