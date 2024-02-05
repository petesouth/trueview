pushd .

cd ..

service nsqd stop
service nsqlookupd stop

source ./scripts/runnsqlookupd.sh 0.0.0.0&
source ./scripts/runnsqd.sh 0.0.0.0&

influxd --config /usr/local/etc/influxd.conf&

service collectd restart

telegraf --config /usr/local/etc/telegraf.conf&

truevieweventserver /usr/local/etc/vm_all_publish_influx_runners.json&

php artisan serve --host 0.0.0.0& 

popd
