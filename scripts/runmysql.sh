#/etc/rc.conf     
# add the following:   
#
# mysql_enable="YES"
# http://www.freebsdmadeeasy.com/tutorials/web-server/install-mysql-server-on-freebsd.php

sh /usr/local/etc/rc.d/mysql-server.sh start
