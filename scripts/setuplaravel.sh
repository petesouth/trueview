export ASSUME_ALWAYS_YES=yes



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
#pkg install php71-curl

pushd .
cd /usr/ports/ftp/php71-curl
make install
popd


wget https://getcomposer.org/composer.phar
chmod +x ./composer.phar
mv ./composer.phar /usr/local/bin


echo "==============finished pkg isntall"


echo "using composer to install global laravel runtime libraries"
composer.phar global require "laravel/installer"