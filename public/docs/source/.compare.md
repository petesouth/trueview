---
title: API Reference

language_tabs:
- bash
- javascript

includes:

search: true

toc_footers:
- <a href='http://github.com/mpociot/documentarian'>Documentation Powered by Documentarian</a>
---
<!-- START_INFO -->
# Info

Welcome to the generated API reference.
<!-- END_INFO -->

#Alerts

All Request should add authorization Header as 
Authorization: Bearer {jwt_token}
<!-- START_0c56478ac7441beb1abdf1232b448c04 -->
## Get all alerts by orgid

> Example request:

```bash
curl "http://localhost/api/tv/message/{orgid}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/message/{orgid}",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[]
```

### HTTP Request
`GET api/tv/message/{orgid}`

`HEAD api/tv/message/{orgid}`


<!-- END_0c56478ac7441beb1abdf1232b448c04 -->
<!-- START_c4c52b488c0e9c7fa1a6f2f335e9b87c -->
## Add new alert

> Example request:

```bash
curl "http://localhost/api/tv/message/add" \
-H "Accept: application/json" \
    -d "id"="aliquid" \
    -d "content"="aliquid" \
    -d "serial"="aliquid" \
    -d "severity"="aliquid" \
    -d "time"="aliquid" \

```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/message/add",
    "method": "POST",
    "data": {
        "id": "aliquid",
        "content": "aliquid",
        "serial": "aliquid",
        "severity": "aliquid",
        "time": "aliquid"
},
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/message/add`

#### Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    id | string |  required  | 
    content | string |  required  | 
    serial | string |  required  | Valid server system_serial
    severity | string |  required  | Maximum: `20`
    time | string |  required  | 

<!-- END_c4c52b488c0e9c7fa1a6f2f335e9b87c -->
<!-- START_a221cc784254187f537054ca938640f1 -->
## Update alert

> Example request:

```bash
curl "http://localhost/api/tv/message/{uuid}/update" \
-H "Accept: application/json" \
    -d "severity"="doloremque" \
    -d "time"="doloremque" \

```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/message/{uuid}/update",
    "method": "PUT",
    "data": {
        "severity": "doloremque",
        "time": "doloremque"
},
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`PUT api/tv/message/{uuid}/update`

#### Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    severity | string |  required  | Maximum: `20`
    time | string |  required  | 

<!-- END_a221cc784254187f537054ca938640f1 -->
<!-- START_c553c6935c0ace31272ef678b32164d4 -->
## Delete alert

> Example request:

```bash
curl "http://localhost/api/tv/message/{uuid}/delete" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/message/{uuid}/delete",
    "method": "DELETE",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`DELETE api/tv/message/{uuid}/delete`


<!-- END_c553c6935c0ace31272ef678b32164d4 -->
#Users

All Request should add authorization Header as 
Authorization: Bearer {jwt_token}
<!-- START_83866f343566a2d74b8075e46ffb156b -->
## Get all users

> Example request:

```bash
curl "http://localhost/api/tv/users" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/users",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[
    {
        "id": 1,
        "name": "admin",
        "email": "admin@tv.com",
        "role_id": 1,
        "role": "TrueView Administrator"
    },
    {
        "id": 2,
        "name": "lola",
        "email": "lola@tv.com",
        "role_id": 1,
        "role": "TrueView Administrator"
    },
    {
        "id": 3,
        "name": "Viewer",
        "email": "viewer@tv.com",
        "role_id": 3,
        "role": "Viewer"
    }
]
```

### HTTP Request
`GET api/tv/users`

`HEAD api/tv/users`


<!-- END_83866f343566a2d74b8075e46ffb156b -->
<!-- START_da9a32f7875c793b1d35ff4f9eda2396 -->
## Get a single user by id

> Example request:

```bash
curl "http://localhost/api/tv/user/{userid}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/user/{userid}",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[
    {
        "id": 3,
        "name": "Viewer",
        "email": "viewer@tv.com",
        "company": null,
        "org_id": null,
        "role_id": 3,
        "role": "Viewer"
    }
]
```

### HTTP Request
`GET api/tv/user/{userid}`

`HEAD api/tv/user/{userid}`


<!-- END_da9a32f7875c793b1d35ff4f9eda2396 -->
<!-- START_574617d0295435ca8c87d9f177ca1758 -->
## Create new user

> Example request:

```bash
curl "http://localhost/api/tv/user/add" \
-H "Accept: application/json" \
    -d "name"="id" \
    -d "email"="lawrence38@example.org" \
    -d "password"="id" \
    -d "role_id"="id" \
    -d "org_id"="id" \

```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/user/add",
    "method": "POST",
    "data": {
        "name": "id",
        "email": "lawrence38@example.org",
        "password": "id",
        "role_id": "id",
        "org_id": "id"
},
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/user/add`

#### Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    name | string |  required  | Maximum: `255`
    email | email |  required  | Maximum: `255`
    password | string |  required  | Minimum: `6`
    role_id | string |  optional  | 
    org_id | string |  required  | Valid org id

<!-- END_574617d0295435ca8c87d9f177ca1758 -->
<!-- START_9cf7ec7ab58f894af3175a6a2ae27286 -->
## Update user

> Example request:

```bash
curl "http://localhost/api/tv/user/update" \
-H "Accept: application/json" \
    -d "id"="fuga" \
    -d "name"="fuga" \
    -d "email"="bill87@example.net" \
    -d "org_id"="fuga" \

```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/user/update",
    "method": "POST",
    "data": {
        "id": "fuga",
        "name": "fuga",
        "email": "bill87@example.net",
        "org_id": "fuga"
},
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/user/update`

#### Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    id | string |  required  | Valid user id
    name | string |  required  | Maximum: `25`
    email | email |  required  | Maximum: `255`
    org_id | string |  required  | 

<!-- END_9cf7ec7ab58f894af3175a6a2ae27286 -->
<!-- START_754c29b778346687823494dc21e17fc7 -->
## Delete User

> Example request:

```bash
curl "http://localhost/api/tv/user/delete/{userid}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/user/delete/{userid}",
    "method": "DELETE",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`DELETE api/tv/user/delete/{userid}`


<!-- END_754c29b778346687823494dc21e17fc7 -->
#general
<!-- START_e8cae8c2451b7ffa2c0fab3b2525c115 -->
## Show tvConfig.json.

> Example request:

```bash
curl "http://localhost/api/tv/config" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/config",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[]
```

### HTTP Request
`GET api/tv/config`

`HEAD api/tv/config`


<!-- END_e8cae8c2451b7ffa2c0fab3b2525c115 -->
<!-- START_00a3d1dbb48ee44fcc47e7f6ae8b3e0b -->
## api/tv/config/update_threshold

> Example request:

```bash
curl "http://localhost/api/tv/config/update_threshold" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/config/update_threshold",
    "method": "POST",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/config/update_threshold`


<!-- END_00a3d1dbb48ee44fcc47e7f6ae8b3e0b -->
<!-- START_ae0be2985a982404f87dd71147e9ceda -->
## api/tv/config/update_admin

> Example request:

```bash
curl "http://localhost/api/tv/config/update_admin" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/config/update_admin",
    "method": "POST",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/config/update_admin`


<!-- END_ae0be2985a982404f87dd71147e9ceda -->
<!-- START_5ed05002b22fe00d2da65502ba1cf891 -->
## api/tv/role

> Example request:

```bash
curl "http://localhost/api/tv/role" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/role",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[
    {
        "id": 1,
        "title": "TrueView Administrator",
        "slug": "tvadmin"
    },
    {
        "id": 2,
        "title": "Administrator",
        "slug": "admin"
    },
    {
        "id": 3,
        "title": "Viewer",
        "slug": "viewer"
    }
]
```

### HTTP Request
`GET api/tv/role`

`HEAD api/tv/role`


<!-- END_5ed05002b22fe00d2da65502ba1cf891 -->
<!-- START_d688e3e39795738dd4093a844775f469 -->
## api/tv/rule/{orgid}

> Example request:

```bash
curl "http://localhost/api/tv/rule/{orgid}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/rule/{orgid}",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[]
```

### HTTP Request
`GET api/tv/rule/{orgid}`

`HEAD api/tv/rule/{orgid}`


<!-- END_d688e3e39795738dd4093a844775f469 -->
<!-- START_8d88ab681bccd0e979e555afda12a956 -->
## api/tv/rule/add

> Example request:

```bash
curl "http://localhost/api/tv/rule/add" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/rule/add",
    "method": "POST",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/rule/add`


<!-- END_8d88ab681bccd0e979e555afda12a956 -->
<!-- START_b9676e942a5c023e41c58d64d3e8b191 -->
## api/tv/rule/update

> Example request:

```bash
curl "http://localhost/api/tv/rule/update" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/rule/update",
    "method": "POST",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/rule/update`


<!-- END_b9676e942a5c023e41c58d64d3e8b191 -->
<!-- START_40fe56cb81b9c5e432830357c12ff025 -->
## api/tv/rule/delete

> Example request:

```bash
curl "http://localhost/api/tv/rule/delete" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/rule/delete",
    "method": "POST",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/rule/delete`


<!-- END_40fe56cb81b9c5e432830357c12ff025 -->
<!-- START_a6c37be964e223b2832bfd558cdf2b15 -->
## api/tv/mail/add

> Example request:

```bash
curl "http://localhost/api/tv/mail/add" \
-H "Accept: application/json" \
    -d "to"="fzulauf@example.org" \
    -d "from"="fzulauf@example.org" \

```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/mail/add",
    "method": "POST",
    "data": {
        "to": "fzulauf@example.org",
        "from": "fzulauf@example.org"
},
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/mail/add`

#### Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    to | email |  required  | Maximum: `255`
    from | email |  required  | Maximum: `255`

<!-- END_a6c37be964e223b2832bfd558cdf2b15 -->
<!-- START_298766a13a3cb4cb66a94c1e17755f7c -->
## api/tv/mail

> Example request:

```bash
curl "http://localhost/api/tv/mail" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/mail",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
null
```

### HTTP Request
`GET api/tv/mail`

`HEAD api/tv/mail`


<!-- END_298766a13a3cb4cb66a94c1e17755f7c -->
#Orgs

All Request should add authorization Header as 
Authorization: Bearer {jwt_token}
<!-- START_f710b5ff76c973fb2ad7a8f605043e0e -->
## Get all orgs

> Example request:

```bash
curl "http://localhost/api/tv/org" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/org",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[
    {
        "id": "00001",
        "name": "ABC, Inc.",
        "influx": "trueview-demo.freehive.io"
    },
    {
        "id": "12345",
        "name": "iXsystems, Inc.",
        "influx": "trueview-demo.freehive.io"
    }
]
```

### HTTP Request
`GET api/tv/org`

`HEAD api/tv/org`


<!-- END_f710b5ff76c973fb2ad7a8f605043e0e -->
<!-- START_d548ffd112ba8b481858f2f13089ece4 -->
## Get a single org by orgId

> Example request:

```bash
curl "http://localhost/api/tv/org/{orgid}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/org/{orgid}",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[
    {
        "id": "00001",
        "name": "ABC, Inc.",
        "influx": "trueview-demo.freehive.io"
    }
]
```

### HTTP Request
`GET api/tv/org/{orgid}`

`HEAD api/tv/org/{orgid}`


<!-- END_d548ffd112ba8b481858f2f13089ece4 -->
<!-- START_80b7f0c3093316ffd0c6589601ff9057 -->
## Create a new org

> Example request:

```bash
curl "http://localhost/api/tv/org/add" \
-H "Accept: application/json" \
    -d "id"="dolorem" \
    -d "name"="dolorem" \
    -d "influx"="dolorem" \

```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/org/add",
    "method": "POST",
    "data": {
        "id": "dolorem",
        "name": "dolorem",
        "influx": "dolorem"
},
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/org/add`

#### Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    id | string |  required  | 
    name | string |  required  | 
    influx | string |  optional  | 

<!-- END_80b7f0c3093316ffd0c6589601ff9057 -->
<!-- START_287fd59efb066f230f3c4f7b84349760 -->
## Update org

> Example request:

```bash
curl "http://localhost/api/tv/org/update" \
-H "Accept: application/json" \
    -d "id"="omnis" \
    -d "name"="omnis" \
    -d "influx"="omnis" \

```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/org/update",
    "method": "POST",
    "data": {
        "id": "omnis",
        "name": "omnis",
        "influx": "omnis"
},
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/org/update`

#### Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    id | string |  required  | Valid org id
    name | string |  required  | 
    influx | string |  optional  | 

<!-- END_287fd59efb066f230f3c4f7b84349760 -->
<!-- START_30e64a0b9e86881cda92c683ae0d1063 -->
## Delete org

> Example request:

```bash
curl "http://localhost/api/tv/org/delete/{orgid}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/org/delete/{orgid}",
    "method": "DELETE",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`DELETE api/tv/org/delete/{orgid}`


<!-- END_30e64a0b9e86881cda92c683ae0d1063 -->
#Servers

All Request should add authorization Header as 
Authorization: Bearer {jwt_token}
<!-- START_ac0cbf72a292bd65e6bbeffdff02a6e7 -->
## Get all servers

> Example request:

```bash
curl "http://localhost/api/tv/server" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/server",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[
    {
        "id": 6,
        "system_serial": "A1-00006",
        "model": "trueview-demo2_local",
        "hostname": "trueview-demo2_local",
        "ip": "trueview-demo2_local",
        "customer_id": "00001",
        "config_name": "trueview-demo2_local",
        "wnty_expire": "2019-12-31",
        "actived": 1,
        "company": "ABC, Inc."
    },
    {
        "id": 1,
        "system_serial": "A1-00001",
        "model": "stinger-freehive_local",
        "hostname": "6e7f5be6-5859-11e6-a878-6794d019a181",
        "ip": "10.0.0.2",
        "customer_id": "12345",
        "config_name": "stinger-freehive_local",
        "wnty_expire": "2017-12-31",
        "actived": 1,
        "company": "iXsystems, Inc."
    },
    {
        "id": 2,
        "system_serial": "A1-00003",
        "model": "j4play-4319",
        "hostname": "j4play-4319",
        "ip": "10.248.1.7",
        "customer_id": "12345",
        "config_name": "j4play-4319",
        "wnty_expire": "2018-12-31",
        "actived": 0,
        "company": "iXsystems, Inc."
    },
    {
        "id": 3,
        "system_serial": "A1-37677",
        "model": "james-freenas",
        "hostname": "freenas_hailsatin_com",
        "ip": "10.0.0.42",
        "customer_id": "12345",
        "config_name": "",
        "wnty_expire": "2020-12-31",
        "actived": 0,
        "company": "iXsystems, Inc."
    },
    {
        "id": 4,
        "system_serial": "A1-00000",
        "model": "ixqa1-nodeb.ad01",
        "hostname": "ixqa1-nodeb.ad01.tn.ixsystems.com",
        "ip": "10.1.1.1",
        "customer_id": "12345",
        "config_name": "",
        "wnty_expire": "0000-00-00",
        "actived": 0,
        "company": "iXsystems, Inc."
    },
    {
        "id": 5,
        "system_serial": "A1-00005",
        "model": "trueview-demo_local",
        "hostname": "trueview-demo_local",
        "ip": "trueview-demo_local",
        "customer_id": "12345",
        "config_name": "trueview-demo_local",
        "wnty_expire": "2019-12-31",
        "actived": 1,
        "company": "iXsystems, Inc."
    }
]
```

### HTTP Request
`GET api/tv/server`

`HEAD api/tv/server`


<!-- END_ac0cbf72a292bd65e6bbeffdff02a6e7 -->
<!-- START_3cc6841be9973f48574330c989b095fc -->
## Get a single server by server id

> Example request:

```bash
curl "http://localhost/api/tv/server/{serverid}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/server/{serverid}",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[
    {
        "id": 6,
        "system_serial": "A1-00006",
        "model": "trueview-demo2_local",
        "hostname": "trueview-demo2_local",
        "ip": "trueview-demo2_local",
        "customer_id": "00001",
        "config_name": "trueview-demo2_local",
        "wnty_expire": "2019-12-31",
        "actived": 1,
        "org_id": "00001",
        "company": "ABC, Inc."
    }
]
```

### HTTP Request
`GET api/tv/server/{serverid}`

`HEAD api/tv/server/{serverid}`


<!-- END_3cc6841be9973f48574330c989b095fc -->
<!-- START_d1a02aea427feff511cb2989fc17b02a -->
## Get all servers by orgId

> Example request:

```bash
curl "http://localhost/api/tv/server/org/{orgid}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/server/org/{orgid}",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[
    {
        "id": 6,
        "system_serial": "A1-00006",
        "model": "trueview-demo2_local",
        "hostname": "trueview-demo2_local",
        "ip": "trueview-demo2_local",
        "customer_id": "00001",
        "config_name": "trueview-demo2_local",
        "wnty_expire": "2019-12-31",
        "actived": 1
    }
]
```

### HTTP Request
`GET api/tv/server/org/{orgid}`

`HEAD api/tv/server/org/{orgid}`


<!-- END_d1a02aea427feff511cb2989fc17b02a -->
<!-- START_e4baef8799b212870a484fed5428727a -->
## Get all actived servers by orgId

> Example request:

```bash
curl "http://localhost/api/tv/server/org/{orgid}/actived" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/server/org/{orgid}/actived",
    "method": "GET",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```

> Example response:

```json
[
    {
        "id": 6,
        "system_serial": "A1-00006",
        "model": "trueview-demo2_local",
        "hostname": "trueview-demo2_local",
        "ip": "trueview-demo2_local",
        "customer_id": "00001",
        "config_name": "trueview-demo2_local",
        "wnty_expire": "2019-12-31",
        "actived": 1
    }
]
```

### HTTP Request
`GET api/tv/server/org/{orgid}/actived`

`HEAD api/tv/server/org/{orgid}/actived`


<!-- END_e4baef8799b212870a484fed5428727a -->
<!-- START_f12e2d65069560f2eca263aa32dd200f -->
## Create a new server

> Example request:

```bash
curl "http://localhost/api/tv/server/add" \
-H "Accept: application/json" \
    -d "system_serial"="in" \
    -d "model"="in" \
    -d "hostname"="in" \
    -d "ip"="in" \
    -d "customer_id"="in" \
    -d "config_name"="in" \
    -d "wnty_expire"="1988-11-04" \
    -d "actived"="1" \

```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/server/add",
    "method": "POST",
    "data": {
        "system_serial": "in",
        "model": "in",
        "hostname": "in",
        "ip": "in",
        "customer_id": "in",
        "config_name": "in",
        "wnty_expire": "1988-11-04",
        "actived": true
},
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/server/add`

#### Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    system_serial | string |  required  | 
    model | string |  optional  | 
    hostname | string |  optional  | 
    ip | string |  optional  | 
    customer_id | string |  required  | 
    config_name | string |  optional  | 
    wnty_expire | date |  optional  | 
    actived | boolean |  optional  | 

<!-- END_f12e2d65069560f2eca263aa32dd200f -->
<!-- START_a8170daceee70c1d2f064242364867d8 -->
## Update a server

> Example request:

```bash
curl "http://localhost/api/tv/server/update" \
-H "Accept: application/json" \
    -d "id"="earum" \
    -d "system_serial"="earum" \
    -d "model"="earum" \
    -d "hostname"="earum" \
    -d "ip"="earum" \
    -d "customer_id"="earum" \
    -d "config_name"="earum" \
    -d "wnty_expire"="2014-05-25" \
    -d "actived"="1" \

```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/server/update",
    "method": "POST",
    "data": {
        "id": "earum",
        "system_serial": "earum",
        "model": "earum",
        "hostname": "earum",
        "ip": "earum",
        "customer_id": "earum",
        "config_name": "earum",
        "wnty_expire": "2014-05-25",
        "actived": true
},
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`POST api/tv/server/update`

#### Parameters

Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    id | string |  required  | Valid server id
    system_serial | string |  required  | 
    model | string |  optional  | 
    hostname | string |  optional  | 
    ip | string |  optional  | 
    customer_id | string |  required  | Valid org id
    config_name | string |  optional  | 
    wnty_expire | date |  optional  | 
    actived | boolean |  optional  | 

<!-- END_a8170daceee70c1d2f064242364867d8 -->
<!-- START_7a7189e308af97e8bb8268599a4fa6b5 -->
## Delete a server

> Example request:

```bash
curl "http://localhost/api/tv/server/delete/{serverid}" \
-H "Accept: application/json"
```

```javascript
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost/api/tv/server/delete/{serverid}",
    "method": "DELETE",
    "headers": {
        "accept": "application/json"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);
});
```


### HTTP Request
`DELETE api/tv/server/delete/{serverid}`


<!-- END_7a7189e308af97e8bb8268599a4fa6b5 -->
