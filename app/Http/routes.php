<?php

use Illuminate\Support\Facades\Input;
use JonnyW\PhantomJs\Client;
use Illuminate\Routing\UrlGenerator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;

Route::group(['middleware' => 'web'], function () {
    Route::auth();
    Route::get('/', function () {
        return view('index');
    });

    Route::get('/confirm_email/{confirmation_code}', function ($confirmation_code) {
        $valid = User::whereConfirmationCode($confirmation_code)->exists();
        if($valid){
            return view('auth.passwords.confirm', ['confirmation_code' => $confirmation_code]);
        }else{
            return redirect()->to('/login');
        }
    })->name("confirm");

});

Route::group(['prefix' => 'api'], function () {
	
	
	$this->post('login', 'Auth\AuthController@login');
    $this->get('logout', 'Auth\AuthController@logout');
    $this->post('register', 'Auth\AuthController@register');
    $this->post('reset','Auth\PasswordController@reset');

    $this->post('active', 'tv\UserController@confirm');

	$this->get('downloads/{file_name}', 'tv\DownloadsController@download');
	$this->get('/uploadfile','tv\UploadFileController@index');
	$this->post('/uploadfile','tv\UploadFileController@uploadFileApi');
	$this->post('/sendalert','tv\MessageController@add_v1');
	 
        
    Route::group(['middleware' => 'auth:api'], function () {
		
		Route::get('/tv/uploadfiles/{orgid}/{filetype}', 'tv\UploadFileController@listAll');
    		
		    //server api
        Route::get('/tv/server', 'tv\ServerController@index');
        Route::get('/tv/server/{serverid}', 'tv\ServerController@show');
        Route::get('/tv/server/org/{orgid}', 'tv\ServerController@org');
        Route::get('/tv/server/org/{orgid}/actived', 'tv\ServerController@actived');
        Route::get('/tv/server/org/{orgid}/registered', 'tv\ServerController@registered'); 
        Route::get('/tv/server/serial/{serialnumber}', 'tv\ServerController@showorg');
        Route::post('/tv/server/add', 'tv\ServerController@create');
        Route::post('/tv/server/update', 'tv\ServerController@update');
        Route::post('/tv/server/register', 'tv\ServerController@register');
        Route::delete('/tv/server/delete/{serverid}', 'tv\ServerController@destory');

        //org api
        Route::get('/tv/org','tv\OrgController@index');
        Route::get('/tv/org/{orgid}','tv\OrgController@showbyorgid');
        Route::get('/tv/org/id/{id}', 'tv\OrgController@showbyid');
        Route::get('/tv/org/name/{name}', 'tv\OrgController@showbyname');
        Route::post('/tv/org/add','tv\OrgController@create');
        Route::post('/tv/org/update','tv\OrgController@update');
        Route::delete('/tv/org/delete/{orgid}', 'tv\OrgController@destory');

        //config api 
        Route::get('/tv/config', 'tv\ConfigurationController@show_configInfo'); 
        Route::post('/tv/config/update_threshold', 'tv\ConfigurationController@update_configInfo_threshold');    
        Route::post('/tv/config/update_admin', 'tv\ConfigurationController@update_configInfo_admin');

        //user api
        Route::get('/tv/user', function () {return Auth::user();});
        Route::get('/tv/users', 'tv\UserController@index');
        Route::get('/tv/user/{userid}', 'tv\UserController@show');
        Route::post('/tv/user/add', 'tv\UserController@create');
        Route::post('/tv/user/update', 'tv\UserController@update');
        Route::delete('/tv/user/delete/{userid}', 'tv\UserController@destory');

        //role api
        Route::get('/tv/role', 'tv\RoleController@index');

        //message api
        Route::get('/tv/message/{orgid}', 'tv\MessageController@all_message');
        Route::get('/tv/message/{orgid}/updated', 'tv\MessageController@is_update');
        Route::get('/tv/message/{orgid}/new', 'tv\MessageController@new_message');
        Route::post('/tv/message/read', 'tv\MessageController@read_message');
        Route::post('/tv/message/add', 'tv\MessageController@add');
		Route::put('/tv/message/{uuid}/update', 'tv\MessageController@update');
        Route::delete('/tv/message/{uuid}/delete', 'tv\MessageController@destory');
       

        //alert rules api
        Route::get('/tv/rule/{orgid}', 'tv\RuleController@all');
        Route::post('/tv/rule/add', 'tv\RuleController@create');
        Route::post('/tv/rule/update', 'tv\RuleController@update');
        Route::post('/tv/rule/delete', 'tv\RuleController@destory');

        //send email
        Route::post('/tv/mail/add','tv\MailController@create');
        Route::get('/tv/mail','tv\MailController@index');
        Route::post('/tv/mail/verify', 'tv\MailController@verify');

        //tickets api
        Route::get('/tv/ticket', 'tv\TicketController@index');
        Route::get('/tv/ticket/{org_id}', 'tv\TicketController@show');
        Route::get('/tv/ticket/id/{ticket_id}', 'tv\TicketController@showbyid');

    });
});


/*
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
 */
