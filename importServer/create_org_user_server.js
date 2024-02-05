var request = require('request');
var jsonfile = require('jsonfile');
var stringify = require('stringify');

var file = 'data.json';
var base_url = "http://10.247.1.13";
var auth_url = base_url + '/api/login?email=admin@tv.com&password=admin';
var token = '';

request({
    url: auth_url,
    method: "POST",
    json: true,
},function(error, response, body){
    token = body['token'];
    getOrgs();
});

function getOrgs(){
    jsonfile.readFile(file, function(err, obj) {
        insertData(obj);
    });
};

function insertData(data){
    var org_url = base_url + '/api/tv/org/add';
    var server_url = base_url + '/api/tv/server/add';
    var user_url = base_url + '/api/tv/user/add';

    for(x in data){
        var item = data[x];
        /* create org */ 
        var arr_new_org = [];
        arr_new_org.push({
            "id": item["org_id"], 
            "name": item["customer"],
            "influx": item["influx"]
        });
        str_new_org = JSON.stringify(arr_new_org[0]);
        new_org = JSON.parse(str_new_org);

        request({
            headers: {'Authorization': 'Bearer ' + token},
            url: org_url,
            method: "POST",
            json: true,
            body: new_org,
        }, function (error, response, body){
            console.log("Add Org:", body);
            if(error) console.log(error, new_org);
        });  

        /* create user */
        var arr_new_user = [];
        arr_new_user.push({
            "name": "admin", 
            "email": item["contact_email"], 
            "password": item["contact_email"]+ Math.random(10), 
            "org_id": item["org_id"],
            "role_id": 2    //Administrator 
        });
        str_new_user = JSON.stringify(arr_new_user[0]);
        new_user = JSON.parse(str_new_user);

        request({
            headers: {'Authorization': 'Bearer ' + token},
            url: user_url,
            method: "POST",
            json: true,
            body: new_user,
        }, function (error, response, body){
            console.log("Add User:", body);
            if(error) console.log(error, new_org);
        }); 

        /* create server */
        var arr_new_server = [];
        arr_new_server.push({
            "system_serial": item["system_serial"], 
            "customer_id": item["org_id"],
            "model": item["model"],
            "hostname": item["hostname"],
            "ip": item["ip"],
            "config_name": item["config_name"],
            "wnty_expire": item["wnty_expire"]
        });
        str_new_server = JSON.stringify(arr_new_server[0]);
        new_server = JSON.parse(str_new_server);

        request({
            headers: {'Authorization': 'Bearer ' + token},
            url: server_url,
            method: "POST",
            json: true,
            body: new_server,
        }, function (error, response, body){
            console.log("Add Server", body);
            if(error) console.log(error, new_org);
        });
    }
}
