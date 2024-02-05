
curl -H "Content-Type: application/json" -X POST -d '{"email":"admin@tv.com","password":"admin"}' http://192.168.43.50:8000/api/login
{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC40My41MDo4MDAwL2FwaS9sb2dpbiIsImlhdCI6MTQ5ODA4ODY4MSwiZXhwIjoxNDk4MDkyMjgxLCJuYmYiOjE0OTgwODg2ODEsImp0aSI6IkdEcXd2Ukdpem43cmFnT0UiLCJzdWIiOjF9.vPRzN-ov21wjstPzh-DdaqMK_VUargtx3ONjvTTvaeI"}

curl -H "Accept: application/json" -H "Content-type: application/json" -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC40My41MDo4MDAwL2FwaS9sb2dpbiIsImlhdCI6MTQ5ODA4ODY4MSwiZXhwIjoxNDk4MDkyMjgxLCJuYmYiOjE0OTgwODg2ODEsImp0aSI6IkdEcXd2Ukdpem43cmFnT0UiLCJzdWIiOjF9.vPRzN-ov21wjstPzh-DdaqMK_VUargtx3ONjvTTvaeI" -X POST -d '{"time": "2016-01-31 10:59:59", "severity": "Error", "serial": "fock", "content": "fuck me", "id": "0" }' http://192.168.43.50:8000/api/tv/message/add?api_token=B9WlZFzccNzLwC5jHnbOO8pJRZTwZSlzqBW089FttHKSeGLVv4eQJdTuGBOr
{"uuid":3,"message":"Alert Added."}
