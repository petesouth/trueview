export ASSUME_ALWAYS_YES=yes


echo "======= Needed TRUEVIEW Pkgs"

pkg install sudo
pkg install gdbm
pkg install sqlite3


pkg install python
pkg install go
pkg install rsync
pkg install influxdb
pkg install telegraf
pkg install mysql57-server
pkg install mysql57-client
pkg install collectd5
pkg install elasticsearch2
pkg install grafana3
pkg install git
pkg install consul
pkg install npm
pkg install rrdtool
pkg install kibana3
pkg install redis
pkg install automake
pkg install bash
pkg install bash-completion
pkg install libtool
pkg install postgresql95-server
pkg install postgresql95-client
pkg install gettext
pkg install autoconf
pkg install automake
pkg install automake-wrapper

pkg install glib
pkg install pkgconf
pkg install dialog4ports
pkg install nomad
pkg install statsd
pkg install elk
pkg install apache24
pkg install nginx

pkg install wget
pkg install curl

pkg install tmate
pkg install consul-alerts
pkg install nsq

echo "========Setting up php and composer for trueview-----"

pkg install php71-phar
pkg install php71
pkg install php71-hash
pkg install php71-ctype
pkg install php71-filter
pkg install php71-json
pkg install php71-openssl
pkg install php71-mbstring
pkg install php71-tokenizer
pkg install php71-extensions
pkg install php71-pdo_mysql
pkg install php71-curl


wget https://getcomposer.org/composer.phar
chmod +x ./composer.phar
mv ./composer.phar /usr/local/bin


echo "==============finished pkg isntall"


echo "using composer to install global laravel runtime libraries"
composer.phar global require "laravel/installer"