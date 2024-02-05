<?php

namespace App\Http\Controllers\tv;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Mail;
use App\Http\Requests\MailRequest;

use Illuminate\Support\Facades\Input;
use Illuminate\Routing\UrlGenerator;
use JonnyW\PhantomJs\Client;

class MailController extends Controller
{

    public function index(){
        $data = array(
            'name' => "Learning Laravel",
        );

        Mail::send('mail', $data, function ($message) {

            $message->from('yourEmail@domain.com', 'Learning Laravel');

            $message->to('lola@ixsystems.com')->subject('Learning Laravel test email');

        });

        return "Your email has been sent successfully";
    }

    public function caputure_img($chart_url){
        $client = Client::getInstance();
        $client->getEngine()->setPath('../bin/phantomjs');
        $client->isLazy();

        //delay page render
        //$delay = 5;
        $url = url('/').$chart_url;
        $caputure_request  = $client->getMessageFactory()->createCaptureRequest($url);
        //$request->setDelay($delay);
        $caputure_response = $client->getMessageFactory()->createResponse();

        $file = '../bin/file.jpg';

        $caputure_request->setOutputFile($file);
        $client->send($caputure_request, $caputure_response);

        rename('../bin/file.jpg', 'screenshots/file.jpg');
    }

    public function create(MailRequest $request)
    {
        //caputure screenshot if send nofity email
        if($request['type'] == 'notify'){
            $this->caputure_img($request['chart_url']);
        }
        //send email with the embed screenshot
        $email_view = 'email.'.$request['type'];
        $chart_url = $request['chart_url'];
        $current_url = url('/').'/#'.$request['current_url'];
        $to = $request['to'];
        $from = $request['from'];
        $subject = $request['subject'];

        $data = array(
            'content' => $request['content'],
            'screenshot' => url('/').'/screenshots/file.jpg',
            'current_url'=> $current_url,
        );

        Mail::send($email_view, $data, function ($message) use ($to,$from,$subject){
            $message->from($from, 'TrueView');
            $message->to($to)->subject($subject);
        });
        return "Your email has been sent successfully".url()->current();

    }

    public function verify($user)
    {
        $email_view = 'email.verification';
        $to = $user['email'];
        $from = 'trueview@trueview.com';
        $subject = 'Please confirm your email';

        $data = array(
            'name' => "Learning Laravel",
            'confirmation_code' => $user['confirmation_code']
        );

        Mail::send($email_view, $data, function ($message) use ($to,$from,$subject){
            $message->from($from, 'TrueView');
            $message->to($to)->subject($subject);
        });
        
        return "Your email has been sent successfully".url()->current();
    }
}
