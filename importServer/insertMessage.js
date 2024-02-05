var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'tvdb'
});

connection.connect();


connection.end();

var request = require('request');

var username = 'admin@tv.com',
    password = 'admin',
    url = 'http://' + username + ':' + password + '@10.247.1.166/api/message/add';
var msg = '{"id":"8","email":"admin'+ orgId+'@trueview.com","company":"'+ orgName +'","password":"admin"}';
msg = JSON.parse(msg);

request({
    url: url,
    method: "POST",
    json: true,
    body: new_users,
}, function (error, response, body){
    if(error) console.log(error, new_users);
});		



