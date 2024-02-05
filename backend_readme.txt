1) ELK Stack.   (Elastic search setup for LogStash Incomming).  Kabana not needed.. In this case.

* https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elk-stack-on-ubuntu-14-04


Mysql.   (TrueView database.  Username password for trueview.)

2) PHP >= 5.5.9
   OpenSSL PHP Extension
   PDO PHP Extension
   Mbstring PHP Extension
   Tokenizer PHP Extension

http://php.net/manual/en/install.unix.openbsd.php


3) Graphite 

https://www.flagword.net/2014/01/installing-and-configuring-graphite-with-collectd-on-freebsd/

4) InfluxDB   Using the pkg.    $ sudo pkg install influxdb

https://docs.influxdata.com/influxdb/v0.13/introduction/installation/

5) Riemann Server setup to stream into Installed influx

http://acidwords.com/posts/2016-02-28-installing-grafana-riemann-and-influxdb.html
  
6) https://github.com/AcalephStorage/consul-alerts

7) Grafana http://docs.grafana.org/installation/debian/   Or the BSD port ;)

This link is to

source/grafana_data_imports/README.txt  (currently origin/develop)

https://bitbucket.org/ix-specops/trueview/src/e2ee6caba478a935341997d4ccd2dd0343fc4138/grafana_data_imports/README.txt?at=develop&fileviewer=file-view-default

8) LaRavel/Composer.  https://laravel.com/docs/5.2

Then the true view app itself.

In the root of src/README.txt