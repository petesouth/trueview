1) run setupclient.sh  (gives you packages telegraf/collectd5

2) To default /usr/local/etc/collectd.conf  

add the settings in collectd.conf to the file.. Or replace them if already there.

3) same with /usr/local/etc/telegraf.conf

If file doens't excit..

     telegraf config > /usr/local/etc/telegraf.conf
     
Then add/modify the setting in resulting file with the ones in ./telegraf.conf (this directory).



restart collectd

service collectd restart


Re-start/start telegraf

telegraf -config /usr/local/etc/telegraf.conf


In the inlfux server in telegraf.conf and collectd.conf (write_graphite target server, and Network target server).. Should point to
a running/configured trueview server.


Log into trueview website

If your server is registered.. It'll already be under settings/server... Just push the register button...

If not..

add server.  Use same client_serial_id used in above steps.

push register.

Thats it... Shold start seeing data...  Depending on the telegraf.conf/collectd.conf time resolutiohs configuraiton (how often it sends).

