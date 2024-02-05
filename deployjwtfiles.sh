composer install
composer update

php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret


echo mv ./vendor/laravel/framework/src/Illuminate/Foundation/Auth/AuthenticatesUsers.php ./vendor/laravel/framework/src/Illuminate/Foundation/Auth/AuthenticatesUsers.bak
mv ./vendor/laravel/framework/src/Illuminate/Foundation/Auth/AuthenticatesUsers.php ./vendor/laravel/framework/src/Illuminate/Foundation/Auth/AuthenticatesUsers.bak

echo mv ./vendor/laravel/framework/src/Illuminate/Foundation/Auth/User.php ./vendor/laravel/framework/src/Illuminate/Foundation/Auth/User.bak
mv ./vendor/laravel/framework/src/Illuminate/Foundation/Auth/User.php ./vendor/laravel/framework/src/Illuminate/Foundation/Auth/User.bak


echo cp ./jwt-files/* ./vendor/laravel/framework/src/Illuminate/Foundation/Auth
cp ./jwt-files/* ./vendor/laravel/framework/src/Illuminate/Foundation/Auth

echo listing ./vendor/laravel/framework/src/Illuminate/Foundation/Auth
ls -all ./vendor/laravel/framework/src/Illuminate/Foundation/Auth

echo running php artisan cache:clear
php artisan cache:clear

echo running php artisan migrate:refresh
php artisan migrate:refresh

echo running php artisan migrate
php artisan migrate

echo running php artisan db:seed
php artisan db:seed
