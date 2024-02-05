<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Auth;

class PasswordController extends Controller
{
    use ResetsPasswords;

    /*
     * override password reset
     */
    public function reset(Request $request)
    {
        $this->validate(
            $request,
            $this->getResetValidationRules(),
            $this->getResetValidationMessages(),
            $this->getResetValidationCustomAttributes()
        );

        $credentials = $this->getResetCredentials($request);

        $broker = $this->getBroker();

        $response = Password::broker($broker)->reset($credentials, function ($user, $password) {
            $this->resetPassword($user, $password);
        });

        /* generate jwt */
        $credentials_jwt = [
            'email' => $request['email'],
            'password' => $request['password'],
        ];
        $token = Auth::guard($this->getGuard())->attempt($credentials_jwt);

        switch ($response) {
        case Password::PASSWORD_RESET:
            return $this->getResetSuccessResponse($token,$response);
        default:
            return $this->getResetFailureResponse($request, $response);
        }
    }
    /* override function getResetSuccessResponse on ResetPasswords.php */
    protected function getResetSuccessResponse($token, $response)
    {
        return response()->json(['token' => $token]);;
    }
    /* override function getResetFailureResponse on ResetPasswords.php */
    protected function getResetFailureResponse(Request $request, $response)
    {
        return response()->json(['email' => trans($response)]);
    }



    /**
     * Create a new password controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     *    Send a reset link to the given user.
     *    
     *     @param  EmailPasswordLinkRequest  $request
     *     @param  Illuminate\View\Factory $view
     *     @return Response
     */
    public function postEmail(
        EmailPasswordLinkRequest $request,
        Factory $view)
    {
        $view->composer('emails.auth.password', function($view) {
            $view->with([
                'title'   => trans('front/password.email-title'),
                'intro'   => trans('front/password.email-intro'),
                'link'    => trans('front/password.email-link'),
                'expire'  => trans('front/password.email-expire'),
                'minutes' => trans('front/password.minutes'),
            ]);
        });

        $response = Password::sendResetLink($request->only('email'), function (Message $message) {
            $message->subject(trans('front/password.reset'));
        });

        switch ($response) {
        case Password::RESET_LINK_SENT:
            return redirect()->back()->with('status', trans($response));

        case Password::INVALID_USER:
            return redirect()->back()->with('error', trans($response));
        }
    }

    /**
     *     Reset the given user's password.
     *     
     *     @param  ResetPasswordRequest  $request
     *     @return Response
     */
    public function postReset(ResetPasswordRequest $request)
    {
        $credentials = $request->only(
            'email', 'password', 'password_confirmation', 'token'
        );

        $response = Password::reset($credentials, function($user, $password) {
            $this->resetPassword($user, $password);
        });

        switch ($response) {
        case Password::PASSWORD_RESET:
            return redirect()->to('/')->with('ok', trans('passwords.reset'));

        default:
            return redirect()->back()
                ->with('error', trans($response))
                ->withInput($request->only('email'));
        }
    }
}
