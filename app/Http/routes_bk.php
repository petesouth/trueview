<?php
use Illuminate\Support\Facades\Input;
use JonnyW\PhantomJs\Client;
use Illuminate\Routing\UrlGenerator;
Route::get('/img',function(){
    $url = Input::get('url');

    $client = Client::getInstance();
    $client->getEngine()->setPath('../bin/phantomjs');
    $client->isLazy();

    $request  = $client->getMessageFactory()->createCaptureRequest($url);
    $response = $client->getMessageFactory()->createResponse();

    $file = '../bin/file.jpg';
    
    //$request->setTimeout(5000); //wait web page loading
    $request->setOutputFile($file);
    $client->send($request, $response);

    rename('../bin/file.jpg', 'screenshots/file.jpg');
    echo url('/');;    
    echo '<img src="screenshots/file.jpg" />';
});


Route::group(['middleware' => 'web'], function () {
    Route::auth();
    Route::get('/', function () {
        return view('index');
    })->middleware('auth');

    //server api
    Route::get('/api/tv/server', 'tv\ServerController@index')->middleware('auth.basic');
    Route::get('/api/tv/server/{id}', 'tv\ServerController@show')->middleware('auth.basic');
    Route::get('/api/tv/{orgid}/server', 'tv\ServerController@org')->middleware('cors');
    Route::post('/api/tv/server/add', 'tv\ServerController@create')->middleware('auth.basic');
    Route::post('/api/tv/server/update', 'tv\ServerController@update')->middleware('auth.basic');
    Route::post('/api/tv/server/delete', 'tv\ServerController@destory')->middleware('auth.basic');

    //org api
    Route::get('/api/tv/org','tv\OrgController@index')->middleware('auth.basic');
    Route::post('/api/tv/org/delete', 'tv\OrgController@destory')->middleware('auth.basic');
    Route::get('/api/tv/org/{id}','tv\OrgController@show')->middleware('auth.basic');
    Route::post('/api/tv/org/update','tv\OrgController@update')->middleware('auth.basic');

    //config api 
    Route::get('/api/tv/config', 'tv\ConfigurationController@show_configInfo')->middleware('auth.basic'); 
    Route::post('/api/tv/config/update_threshold', 'tv\ConfigurationController@update_configInfo_threshold')->middleware('auth.basic');    
    Route::post('/api/tv/config/update_admin', 'tv\ConfigurationController@update_configInfo_admin')->middleware('auth.basic');

    //user api
    Route::get('/api/tv/user', function () {return Auth::user();})->middleware('auth.basic');
    Route::post('/api/tv/user/add', 'tv\ServerController@create')->middleware('auth.basic');
    Route::get('/api/tv/users', 'tv\UserController@index')->middleware('auth.basic');
    Route::get('/api/tv/user/{id}', 'tv\UserController@show')->middleware('auth.basic');
    Route::post('/api/tv/user/update', 'tv\UserController@update')->middleware('auth.basic');
    Route::post('/api/tv/user/delete', 'tv\UserController@destory')->middleware('auth.basic');

    //role api
    Route::get('/api/tv/role', 'tv\RoleController@index')->middleware('auth.basic');

    //message api
    Route::get('/api/tv/message/{orgId}', 'tv\MessageController@all_message')->middleware('auth.basic');
    Route::get('/api/tv/message/{orgId}/updated/', 'tv\MessageController@is_update')->middleware('auth.basic');
    Route::get('/api/tv/message/{orgId}/new', 'tv\MessageController@new_message')->middleware('auth.basic');
    Route::post('/api/tv/message/read', 'tv\MessageController@read_message')->middleware('auth.basic');

    //send email
    Route::post('/api/tv/mail/add','tv\MailController@create')->middleware('auth.basic');
    Route::get('/api/tv/mail','tv\MailController@index')->middleware('auth.basic');

    Route::get('/home', 'HomeController@index');
});

Route::group(['prefix' => 'api/v1', 'middleware' => 'api'], function() {
    Route::get('/user', function () {
        return Auth::guard('api')->user();
    });

    Route::get('/server', 'tv\ServerController@index');
    Route::get('/server/{id}', 'tv\ServerController@show');
    Route::get('/{orgid}/server', 'tv\ServerController@org')->middleware('cors');
    Route::post('/server/add', 'tv\ServerController@create');
    Route::post('/server/update', 'tv\ServerController@update');
    Route::post('/server/delete', 'tv\ServerController@destory');

    Route::get('/org','tv\OrgController@index');
    Route::post('/org/delete', 'tv\OrgController@destory');
    Route::get('/org/{id}','tv\OrgController@show');
    Route::post('/org/update','tv\OrgController@update');
    Route::post('/org/add','tv\OrgController@create');

    Route::get('/config', 'tv\ConfigurationController@show_configInfo');
    Route::post('/config/update_threshold', 'tv\ConfigurationController@update_configInfo_threshold');
    Route::post('/config/update_admin', 'tv\ConfigurationController@update_configInfo_admin');

    Route::post('/user/add', 'tv\ServerController@create');
    Route::get('/user', 'tv\UserController@index');
    Route::get('/user/{id}', 'tv\UserController@show');
    Route::post('/user/update', 'tv\UserController@update');
    Route::post('/user/delete', 'tv\UserController@destory');

    Route::get('/role', 'tv\RoleController@index');

    Route::get('/message/{orgId}', 'tv\MessageController@all_message');
    Route::get('/message/{orgId}/updated/', 'tv\MessageController@is_update');
    Route::get('/message/{orgId}/new', 'tv\MessageController@new_message');
    Route::post('/message/read', 'tv\MessageController@read_message');
    //using to insert messages/alerts
    Route::post('/message/add', 'tv\MessageController@add_message');
});
