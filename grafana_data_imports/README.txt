

cp ./global_dynamic_dash.js /usr/share/grafana/public/dashboards
cp server_host_dynamic_dash.js /usr/share/grafana/public/dashboards

Make sure

#################################### Anonymous Auth ##########################
[auth.anonymous]
# enable anonymous access
enabled = true

Is set in /usr/share/grafana/conf/defaults.ini


Reference  implentation on Ubuntu at: http://104.236.188.31:3000

admin/admin

Datasources defined in Grafana under global account:

InfluxCollectD
influx type
http://104.236.188.31:8086
collectd
user riemann pw: riemann_password

InfluxRiemann
influx type
http://104.236.188.31:8086
riemann
user riemann pw: riemann_password


to restart grafana..

sudo service grafana-server restart
sudo service grafana-server start
sudo service grafana-server stop
sudo service grafana-server status


CREATE DATABASE riemann

[12:20]  
CREATE USER riemann WITH PASSWORD 'riemann_password'

[12:21]  
GRANT ALL ON riemann TO riemann







